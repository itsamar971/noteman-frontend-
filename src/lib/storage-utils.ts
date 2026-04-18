import { apiRequest } from "./queryClient";
import { supabase } from "./supabase";

/**
 * Utility functions for handling file uploads through Supabase Storage
 */

/**
 * Upload a file to Supabase Storage and record metadata
 * @param file The file object or base64 (converting base64 to Blob if needed)
 * @param fileName The name of the file
 * @param contentType The MIME type of the file
 * @returns A promise that resolves to the resource ID
 */
export async function uploadFile(
  fileData: File | Blob, 
  fileName: string,
  contentType: string,
  metadata: {
    title: string;
    semester: string;
    branch: string;
    subject: string;
    category: string;
    resourceType?: string;
    author?: string;
    pages?: number;
    uploadedBy?: string;
  }
): Promise<number> {
  try {
    // 1. Upload file to our backend (which handles Supabase)
    const formData = new FormData();
    formData.append("file", fileData, fileName);

    const isProd = import.meta.env.PROD;
    const API_URL = isProd ? "" : (import.meta.env.VITE_API_URL || "");
    const uploadResponse = await fetch(`${API_URL}/api/resources/upload`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!uploadResponse.ok) {
      let errorDetail = "Failed to upload file to storage";
      try {
        const errorData = await uploadResponse.json();
        if (errorData.details) {
          errorDetail = `Upload failed: ${errorData.details}`;
        }
      } catch (e) {
        // ignore parse error and use default
      }
      throw new Error(errorDetail);
    }

    const uploadResult = await uploadResponse.json();

    // 2. Save metadata to DB
    const response = await apiRequest('POST', '/api/resources', {
      fileUrl: uploadResult.fileUrl,
      storagePath: uploadResult.storagePath,
      fileName: uploadResult.fileName,
      fileType: uploadResult.fileType,
      fileSize: uploadResult.fileSize,
      ...metadata
    });

    if (!response.ok) {
      // Note: Backend might need a cleanup route for failed DB insertions
      throw new Error('Failed to save metadata to database');
    }

    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error("Error in upload process:", error);
    throw error;
  }
}

/**
 * Delete a resource from both storage and database
 * @param id The ID of the resource
 * @param storagePath The path in Supabase Storage
 */
export async function deleteResource(id: number, storagePath?: string): Promise<void> {
  try {
    // 1. Delete from database
    const response = await apiRequest('DELETE', `/api/resources/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to delete metadata from database');
    }

    // 2. Delete from Supabase Storage if path provided
    if (storagePath) {
      const { error } = await supabase.storage
        .from('notes')
        .remove([storagePath]);
      
      if (error) {
        console.warn("Deleted from DB but failed to delete from Storage:", error);
      }
    }
  } catch (error) {
    console.error("Error deleting resource:", error);
    throw error;
  }
}
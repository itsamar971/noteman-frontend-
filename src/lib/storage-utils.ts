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
  fileData: string | File | Blob, 
  fileName: string,
  contentType: string,
  metadata: {
    title: string;
    semester: string;
    branch: string;
    subject: string;
    category: string;
    author?: string;
    pages?: number;
    uploadedBy?: string;
  }
): Promise<number> {
  try {
    let finalFile: Blob | File;
    
    // If it's a base64 string, convert to Blob
    if (typeof fileData === 'string' && fileData.includes('base64,')) {
      const resp = await fetch(fileData);
      finalFile = await resp.blob();
    } else if (typeof fileData === 'string') {
      // Assuming it's a raw base64 string without data prefix
      const byteCharacters = atob(fileData);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      finalFile = new Blob([byteArray], { type: contentType });
    } else {
      finalFile = fileData;
    }

    // 1. Upload to Supabase Storage
    const fileExt = fileName.split('.').pop();
    const filePath = `${metadata.branch}/${metadata.semester}/${Date.now()}.${fileExt}`;
    
    // Ensure bucket exists (or try to create it if permitted)
    try {
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(b => b.name === 'resources');
      
      if (!bucketExists) {
        console.warn("Storage bucket 'resources' not found. Attempting to create...");
        await supabase.storage.createBucket('resources', { public: true });
      }
    } catch (e) {
      console.error("Error ensuring storage bucket:", e);
    }

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('resources')
      .upload(filePath, finalFile, {
        contentType,
        upsert: true
      });

    if (uploadError) throw uploadError;

    // 2. Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from('resources')
      .getPublicUrl(filePath);

    // 3. Save metadata to DB (via our API or Supabase direct)
    // For now, we still use our API but with the URL instead of file data
    const response = await fetch('/api/resources', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileUrl: publicUrl,
        storagePath: filePath,
        fileName,
        fileType: contentType,
        fileSize: finalFile.size,
        ...metadata
      }),
    });

    if (!response.ok) {
      // Rollback storage upload if DB fails
      await supabase.storage.from('resources').remove([filePath]);
      throw new Error('Failed to save metadata to database');
    }

    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error("Error in Supabase migration upload:", error);
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
    const response = await fetch(`/api/resources/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete metadata from database');
    }

    // 2. Delete from Supabase Storage if path provided
    if (storagePath) {
      const { error } = await supabase.storage
        .from('resources')
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
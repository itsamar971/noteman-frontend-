import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceId?: number;
  title?: string;
  fileUrl?: string; // New prop for direct URLs
}

export default function PdfViewerModal({ 
  isOpen, 
  onClose,
  resourceId,
  title = "PDF Viewer",
  fileUrl
}: PdfViewerModalProps) {
  const { toast } = useToast();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      if (fileUrl) {
        setPdfUrl(fileUrl);
        setLoading(false);
      } else if (resourceId) {
        // If we need to fetch the resource by ID
        fetch(`/api/resources/${resourceId}`)
          .then(response => {
            if (!response.ok) {
              throw new Error("Failed to fetch PDF data");
            }
            return response.json();
          })
          .then(data => {
            // Use the fileUrl from the response
            setPdfUrl(data.fileUrl);
          })
          .catch(error => {
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive",
            });
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    } else {
      // Clean up when modal closes
      setPdfUrl(null);
    }
  }, [isOpen, resourceId, fileUrl, toast]);

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `${title.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="flex-grow p-4 overflow-auto h-[60vh]">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : pdfUrl ? (
            <iframe
              src={pdfUrl}
              className="w-full h-full border-0"
              title={title}
            />
          ) : (
            <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full">
              <Eye className="h-12 w-12 mb-4" />
              <p>No PDF data available</p>
            </div>
          )}
        </div>
        
        <DialogFooter className="border-t p-4">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            onClick={handleDownload}
            disabled={!pdfUrl}
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useNavigation } from "@/hooks/useNavigation";
import { semesters, branches } from "@shared/schema";
import { uploadFile } from "@/lib/storage-utils";
import { 
  FileUp, 
  Book, 
  FileText, 
  User, 
  GraduationCap, 
  Network, 
  BookOpen,
  X,
  Loader2,
  CloudUpload,
  Zap
} from "lucide-react";

interface AddPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  semester?: string;
  branch?: string;
  subject?: string;
}

export default function AddPdfModal({ 
  isOpen, 
  onClose,
  semester = "",
  branch = "",
  subject = ""
}: AddPdfModalProps) {
  const { toast } = useToast();
  const { subjects, setCurrentNavigationState, getFilteredSubjects } = useNavigation();
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"exam" | "textbook">("exam");
  const [selectedSemester, setSelectedSemester] = useState(semester);
  const [selectedBranch, setSelectedBranch] = useState(branch);
  const [selectedSubject, setSelectedSubject] = useState(subject);
  const [availableSubjects, setAvailableSubjects] = useState<string[]>(subjects);
  const [resourceType, setResourceType] = useState<string>("not-specified");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Update navigation state when semester or branch changes
  useEffect(() => {
    if (selectedSemester && selectedBranch) {
      setCurrentNavigationState(
        selectedSemester as any,
        selectedBranch as any
      );
      // Get the filtered subjects based on semester and branch
      setAvailableSubjects(getFilteredSubjects());
    }
  }, [selectedSemester, selectedBranch, setCurrentNavigationState, getFilteredSubjects]);

  const resetForm = () => {
    setTitle("");
    setType("exam");
    setSelectedSemester(semester);
    setSelectedBranch(branch);
    setSelectedSubject(subject);
    setResourceType("not-specified");
    setAuthor("");
    setFile(null);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "Missing file",
        description: "Please select a PDF file to upload",
        variant: "destructive",
      });
      return;
    }

    if (!selectedSemester || !selectedBranch || !selectedSubject) {
      toast({
        title: "Missing information",
        description: "Please select semester, branch, and subject",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const resourceId = await uploadFile(
        file,
        file.name,
        file.type,
        {
          title,
          semester: selectedSemester,
           branch: selectedBranch,
          subject: selectedSubject,
          category: type,
          resourceType: type === "exam" ? resourceType : "not-specified",
          author: type === "textbook" ? author : "",
          pages: 0,
        }
      );

      if (resourceId) {
        toast({
          title: "Upload successful",
          description: `${type === "exam" ? "Exam PDF" : "Textbook"} has been uploaded successfully`,
        });
        
        // Invalidate queries to refresh the resource lists
        queryClient.invalidateQueries({ queryKey: ["/api/resources"] });
        
        resetForm();
        onClose();
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error.message || "An unexpected error occurred during upload",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl p-0 border-0 rounded-[2.5rem] shadow-2xl bg-zinc-950 overflow-hidden ring-1 ring-white/10">
        <DialogHeader className="bg-brand-gradient text-white p-6 md:p-8 space-y-1 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white opacity-10 blur-3xl rounded-full" />
          
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 relative z-10"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white backdrop-blur-xl border border-white/20 shadow-xl">
              <FileUp className="w-6 h-6" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-black uppercase tracking-tighter">Add Resource</DialogTitle>
              <DialogDescription className="text-white/70 text-[10px] font-bold uppercase tracking-widest">
                Node System • JNTUH R22
              </DialogDescription>
            </div>
          </motion.div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="flex flex-col bg-zinc-950">
          <div className="p-6 pt-4 space-y-4">
            
            {/* Title Input */}
            <div className="space-y-1.5 focus-within:translate-x-1 transition-transform">
              <Label htmlFor="title" className="eyebrow px-1">
                <FileText className="w-2.5 h-2.5" />
                Resource Title
              </Label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Mid-term Examination 2022"
                className="input-dfesta w-full h-11"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
              {/* Type Select */}
              <div className="space-y-1.5">
                <Label htmlFor="type" className="eyebrow px-1">
                  <Book className="w-2.5 h-2.5" />
                  Classification
                </Label>
                <Select
                  value={type}
                  onValueChange={(value) => setType(value as "exam" | "textbook")}
                >
                  <SelectTrigger id="type" className="input-dfesta w-full border-zinc-800 bg-zinc-900/50 h-11 text-xs uppercase font-bold">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl bg-zinc-900 border-zinc-800 text-white shadow-2xl">
                    <SelectItem value="exam">PDF Node</SelectItem>
                    <SelectItem value="textbook">Textbook Reference</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Resource Type (Conditional for Exams) */}
              <AnimatePresence>
                {type === "exam" && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-1.5"
                  >
                    <Label htmlFor="resourceType" className="eyebrow px-1">
                      <Zap className="w-2.5 h-2.5" />
                      Revision Kit Type
                    </Label>
                    <Select
                      value={resourceType}
                      onValueChange={setResourceType}
                    >
                      <SelectTrigger id="resourceType" className="input-dfesta w-full border-zinc-800 bg-zinc-900/50 h-11 text-xs uppercase font-bold">
                        <SelectValue placeholder="Resource Type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl bg-zinc-900 border-zinc-800 text-white shadow-2xl">
                        <SelectItem value="not-specified">Standard PDF</SelectItem>
                        <SelectItem value="formulas">📘 Formula Sheet</SelectItem>
                        <SelectItem value="important-questions">🧠 Important QA</SelectItem>
                        <SelectItem value="cheatsheets">⚡ Cheat Sheet</SelectItem>
                        <SelectItem value="practice">🧪 Rapid Practice</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Semester Select */}
              <div className="space-y-1.5">
                <Label htmlFor="semester" className="eyebrow px-1">
                  <GraduationCap className="w-2.5 h-2.5" />
                  Academic Semester
                </Label>
                <Select
                  value={selectedSemester}
                  onValueChange={setSelectedSemester}
                >
                  <SelectTrigger id="semester" className="input-dfesta w-full border-zinc-800 bg-zinc-900/50 h-11 text-xs uppercase font-bold">
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl bg-zinc-900 border-zinc-800 text-white shadow-2xl">
                    {semesters.map((sem) => (
                      <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Branch Select */}
              <div className="space-y-1.5">
                <Label htmlFor="branch" className="eyebrow px-1">
                  <Network className="w-2.5 h-2.5" />
                  Faculty Branch
                </Label>
                <Select
                  value={selectedBranch}
                  onValueChange={setSelectedBranch}
                >
                  <SelectTrigger id="branch" className="input-dfesta w-full border-zinc-800 bg-zinc-900/50 h-11 text-xs uppercase font-bold">
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl bg-zinc-900 border-zinc-800 text-white shadow-2xl">
                    {branches.map((branch) => (
                      <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subject Select */}
              <div className="space-y-1.5">
                <Label htmlFor="subject" className="eyebrow px-1">
                  <BookOpen className="w-2.5 h-2.5" />
                  Module Subject
                </Label>
                <Select
                  value={selectedSubject}
                  onValueChange={setSelectedSubject}
                >
                  <SelectTrigger id="subject" className="input-dfesta w-full border-zinc-800 bg-zinc-900/50 h-11 text-xs uppercase font-bold">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl bg-zinc-900 border-zinc-800 text-white shadow-2xl max-h-[220px]">
                    {availableSubjects.map((sub) => (
                      <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Author (conditional - now stays in line if visible) */}
            <AnimatePresence>
              {type === "textbook" && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1.5"
                >
                  <Label htmlFor="author" className="eyebrow px-1">
                    <User className="w-2.5 h-2.5" />
                    Author Identity
                  </Label>
                  <input
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g., J. Smith"
                    className="input-dfesta w-full h-11 border-zinc-800 bg-zinc-900/50"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Upload Area - Condensed */}
            <div className="space-y-2">
              <Label className="eyebrow px-1">
                <CloudUpload className="w-2.5 h-2.5" />
                Binary Data Injection
              </Label>
              <div 
                className={`group relative overflow-hidden transition-all duration-300 border border-dashed rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer
                  ${dragActive ? "border-indigo-500 bg-indigo-500/5" : "border-zinc-800 hover:border-indigo-500/50 hover:bg-zinc-900"}
                  ${file ? "bg-emerald-500/5 border-emerald-500/30" : ""}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                {file ? (
                  <div className="flex items-center gap-3 animate-in zoom-in-95 w-full">
                    <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="font-bold text-emerald-400 truncate text-xs">{file.name}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                        Secure Ready • {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button 
                      type="button"
                      className="text-zinc-500 hover:text-white transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <CloudUpload className="w-6 h-6 text-indigo-500/40 group-hover:scale-110 transition-all" />
                    <div className="text-center">
                      <p className="font-bold text-zinc-400 text-[10px] uppercase tracking-widest">Select PDF Vector Data</p>
                    </div>
                  </>
                )}
                
                <input id="file-upload" type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
              </div>
            </div>
          </div>
          
          <div className="p-6 pt-0 flex flex-row items-center gap-3 justify-end bg-zinc-950 pb-8">
            <button
              type="button"
              onClick={() => { resetForm(); onClose(); }}
              className="btn-primary h-11 border border-white/5 bg-zinc-900 text-white px-6 font-black uppercase tracking-widest text-[9px] hover:bg-zinc-800"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || !file}
              className={`btn-brand h-11 px-8 rounded-xl flex items-center justify-center gap-2 transition-all text-[10px]
                ${isUploading ? "opacity-50 cursor-not-allowed" : "hover:scale-105 shadow-lg shadow-indigo-500/10"}`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  UPLOADING...
                </>
              ) : (
                <>
                  <FileUp className="w-3.5 h-3.5" />
                  INITIALIZE SAVE
                </>
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import { createContext, useContext, useState, ReactNode } from "react";
import { useLocation } from "wouter";
import { 
  Semester, 
  Branch, 
  Subject, 
  semesters, 
  branches, 
  subjects,
  subjectsByBranchAndSemester
} from "@shared/schema";

// Navigation context type definition
export interface NavigationContextType {
  currentSemester: Semester | null;
  currentBranch: Branch | null;
  currentSubject: Subject | null;
  navigateToHome: () => void;
  navigateToBranch: (branch: Branch) => void;
  navigateToSemester: (semester: Semester) => void;
  navigateToSubject: (subject: Subject) => void;
  resetNavigation: () => void;
  setCurrentNavigationState: (semester?: Semester, branch?: Branch, subject?: Subject) => void;
  semesters: typeof semesters;
  branches: typeof branches;
  subjects: string[];
  getFilteredSubjects: () => string[];
}

const NavigationContext = createContext<NavigationContextType | null>(null);

interface NavigationProviderProps {
  children: ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [, setLocation] = useLocation();
  const [currentSemester, setCurrentSemester] = useState<Semester | null>(null);
  const [currentBranch, setCurrentBranch] = useState<Branch | null>(null);
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);

  const navigateToHome = () => {
    setCurrentSemester(null);
    setCurrentBranch(null);
    setCurrentSubject(null);
    setLocation("/");
  };

  const navigateToBranch = (branch: Branch) => {
    setCurrentBranch(branch);
    setCurrentSemester(null);
    setCurrentSubject(null);
    setLocation(`/branch/${encodeURIComponent(branch)}`);
  };

  const navigateToSemester = (semester: Semester) => {
    if (!currentBranch) return;
    setCurrentSemester(semester);
    setCurrentSubject(null);
    setLocation(`/branch/${encodeURIComponent(currentBranch)}/semester/${encodeURIComponent(semester)}`);
  };

  const navigateToSubject = (subject: Subject) => {
    if (!currentSemester || !currentBranch) return;
    setCurrentSubject(subject);
    setLocation(`/branch/${encodeURIComponent(currentBranch)}/semester/${encodeURIComponent(currentSemester)}/subject/${encodeURIComponent(subject)}`);
  };

  const resetNavigation = () => {
    setCurrentSemester(null);
    setCurrentBranch(null);
    setCurrentSubject(null);
  };

  const setCurrentNavigationState = (semester?: Semester, branch?: Branch, subject?: Subject) => {
    if (branch !== undefined) setCurrentBranch(branch);
    if (semester !== undefined) setCurrentSemester(semester);
    if (subject !== undefined) setCurrentSubject(subject);
  };

  const getFilteredSubjects = () => {
    if (!currentSemester || !currentBranch) {
      return subjects;
    }

    const branchData = subjectsByBranchAndSemester[currentBranch];
    if (branchData && branchData[currentSemester]) {
      return branchData[currentSemester];
    }

    return subjects;
  };

  const value: NavigationContextType = {
    currentSemester,
    currentBranch,
    currentSubject,
    navigateToHome,
    navigateToBranch,
    navigateToSemester,
    navigateToSubject,
    resetNavigation,
    setCurrentNavigationState,
    semesters,
    branches,
    subjects,
    getFilteredSubjects
  };

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useNavigation(): NavigationContextType {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
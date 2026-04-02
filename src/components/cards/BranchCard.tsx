import { Branch } from "@shared/schema";
import { Card } from "@/components/ui/card";

interface BranchCardProps {
  branch: Branch;
  description: string;
  onClick: (branch: Branch) => void;
}

export default function BranchCard({ branch, description, onClick }: BranchCardProps) {
  return (
    <Card 
      className="bg-white rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-3px] transition-all duration-300 p-6 cursor-pointer border-2 border-transparent hover:border-primary/20"
      onClick={() => onClick(branch)}
    >
      <h3 className="text-lg font-medium text-primary-600 group-hover:text-primary">{branch}</h3>
      <p className="text-gray-500 mt-2">{description}</p>
    </Card>
  );
}

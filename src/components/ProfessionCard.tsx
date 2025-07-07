
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ProfessionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ProfessionCard = ({ icon: Icon, title, description }: ProfessionCardProps) => {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-primary/10 rounded-full">
            <Icon className="w-8 h-8 text-primary" />
          </div>
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ProfessionCard;

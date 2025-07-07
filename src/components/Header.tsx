
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Hammer } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <Hammer className="w-6 h-6 text-primary" />
          <span>OrçaFácil</span>
        </Link>
        <nav>
          <Button asChild>
            <Link to="/criar-orcamento">Criar Orçamento</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

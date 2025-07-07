
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProfessionCard from "@/components/ProfessionCard";
import { Hammer, Wrench, FilePen, Settings } from "lucide-react";

const professions = [
  { icon: Hammer, title: "Pedreiros", description: "Construção e reformas em alvenaria." },
  { icon: Wrench, title: "Encanadores", description: "Instalações e reparos hidráulicos." },
  { icon: Settings, title: "Eletricistas", description: "Soluções elétricas seguras e eficientes." },
  { icon: FilePen, title: "Gesseiros / Drywall", description: "Acabamentos e estruturas em gesso." },
];

const Index = () => {
  return (
    <div className="flex flex-col items-center">
      <section className="text-center py-20 sm:py-32 w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Crie orçamentos profissionais em minutos.
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A ferramenta ideal para autônomos e pequenos empreendedores da construção civil. Organize seus serviços e impressione seus clientes.
        </p>
        <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
          <Link to="/criar-orcamento">Começar Agora</Link>
        </Button>
      </section>

      <section className="w-full max-w-6xl py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Para todos os profissionais</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {professions.map((prof) => (
            <ProfessionCard key={prof.title} {...prof} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;

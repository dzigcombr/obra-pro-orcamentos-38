
const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} OrçaFácil. Todos os direitos reservados.</p>
        <p className="mt-1">Feito para facilitar a vida do profissional da construção.</p>
      </div>
    </footer>
  );
};

export default Footer;

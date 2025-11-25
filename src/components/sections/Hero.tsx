import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export const Hero = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary">
      <div className="container mx-auto px-4 py-20 text-center animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
          Vrhunske cijene otkupa automobila — 
          <br />
          <span className="text-primary">trenutna isplata i bez brige!</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Otkupljujemo sva vozila, u svakom stanju, brzo i pošteno. 
          Dolazimo na vašu lokaciju bilo gdje u Hrvatskoj i plaćamo odmah nakon pregleda.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            onClick={scrollToContact}
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6"
          >
            Zatražite ponudu
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <a href="tel:+385912345678">
              <Phone className="mr-2 h-5 w-5" />
              Nazovite odmah
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
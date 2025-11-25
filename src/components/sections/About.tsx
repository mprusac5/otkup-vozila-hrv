import { Building2, Shield, Users } from "lucide-react";

export const About = () => {
  return (
    <section className="py-20 bg-background" id="about">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          O nama
        </h2>
        <div className="space-y-6 text-lg text-muted-foreground">
          <p className="text-center text-xl">
            Smo <span className="font-semibold text-foreground">zagrebačka tvrtka s dugogodišnjim iskustvom</span> u automobilskoj industriji.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
            <div className="text-center">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold text-foreground mb-2">Zagreb</h3>
              <p className="text-sm">Sjedište u Zagrebu</p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold text-foreground mb-2">Pouzdanost</h3>
              <p className="text-sm">Dugogodišnje iskustvo</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold text-foreground mb-2">Zadovoljni klijenti</h3>
              <p className="text-sm">Stotine uspješnih transakcija</p>
            </div>
          </div>

          <p>
            Poslujemo <span className="font-semibold text-foreground">diljem cijele Hrvatske</span> i nudimo 
            brz, pošten i transparentan otkup vozila.
          </p>

          <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
            <h3 className="text-xl font-semibold mb-3 text-foreground">Naša misija</h3>
            <p>
              Predani smo pružanju vlasnicima vozila <span className="font-semibold">najbržeg, najjednostavnijeg 
              i najsigurnijeg načina prodaje automobila</span>. Svakom klijentu pristupamo individualno, 
              nudimo poštene cijene i preuzimamo svu dokumentaciju kako se vi ne biste morali ni o čemu brinuti.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
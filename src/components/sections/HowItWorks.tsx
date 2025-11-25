import { Phone, Search, Banknote } from "lucide-react";

const steps = [
  {
    icon: Phone,
    title: "Kontaktirajte nas",
    description: "Nazovite, pošaljite WhatsApp, Viber ili ispunite online formu."
  },
  {
    icon: Search,
    title: "Brza procjena i dolazak",
    description: "Dajemo inicijalnu ponudu, dolazimo na vašu lokaciju i pregledavamo vozilo."
  },
  {
    icon: Banknote,
    title: "Isplata i dokumentacija",
    description: "Trenutna isplata gotovinom, potpisivanje ugovora i mi rješavamo svu dokumentaciju (prijenos, odjava, porez 5%)."
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-20 bg-secondary" id="how-it-works">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          Kako funkcionira?
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Cijeli proces može biti završen za <span className="font-semibold text-primary">30–60 minuta</span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-primary rounded-full flex items-center justify-center">
                  <step.icon className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm -mt-8 ml-8">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
import { Phone, Search, Banknote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  {
    icon: Phone,
    title: "Kontaktirajte nas",
    description: "Nazovite, pošaljite WhatsApp, Viber ili ispunite online formu.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Search,
    title: "Brza procjena i dolazak",
    description: "Dajemo inicijalnu ponudu, dolazimo na Vašu lokaciju i pregledavamo vozilo.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Banknote,
    title: "Isplata i dokumentacija",
    description: "Trenutna isplata gotovinom, potpisivanje ugovora i mi rješavamo svu dokumentaciju.",
    gradient: "from-orange-500 to-red-500"
  }
];

export const HowItWorks = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  
  return (
    <section 
      ref={elementRef}
      id="how-it-works" 
      className={`py-12 sm:py-16 md:py-20 lg:py-24 bg-secondary relative overflow-hidden transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-6 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Kako funkcionira?
          </h2>
        </div>
        
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <div className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-accent to-orange-500 rounded-full">
            <p className="text-white font-bold text-base sm:text-lg">
              ⚡ Brza i efikasna usluga
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 sm:gap-6 md:gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Connection line - hidden on mobile */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-1 bg-gradient-to-r from-primary/30 to-transparent" />
              )}
              
              <div className="relative bg-background rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-primary/20">
                <div className="relative mb-2 sm:mb-4 md:mb-6">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 mx-auto bg-gradient-to-br ${step.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg`}>
                    <step.icon className="h-6 w-6 sm:h-8 sm:w-8 md:h-12 md:w-12 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-7 sm:h-7 md:w-10 md:h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm md:text-lg shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xs sm:text-base md:text-2xl font-bold mb-1 sm:mb-2 md:mb-4 text-foreground text-center leading-tight">
                  {step.title}
                </h3>
                <p className="text-[10px] sm:text-xs md:text-base text-muted-foreground leading-relaxed text-center hidden sm:block">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
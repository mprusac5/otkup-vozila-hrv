import { Banknote, Car, FileText, MapPin, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Banknote,
    title: "Trenutna isplata gotovinom",
    description: "Plaćamo odmah nakon pregleda vozila, bez čekanja"
  },
  {
    icon: Car,
    title: "Otkupljujemo sva vozila",
    description: "Nova, stara, oštećena ili neispravna — otkupljujemo sve"
  },
  {
    icon: FileText,
    title: "Riješena sva dokumentacija",
    description: "Mi se brinemo o svim papirima — bez skrivenih troškova"
  },
  {
    icon: MapPin,
    title: "Dolazimo na vašu adresu",
    description: "Bilo gdje u Hrvatskoj, besplatan dolazak"
  },
  {
    icon: CheckCircle,
    title: "Poštena i transparentna procjena",
    description: "Fer cijene bez skrivenih naknada ili iznuđivanja"
  }
];

export const Benefits = () => {
  return (
    <section className="py-20 bg-background" id="benefits">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Zašto odabrati nas?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="border-border hover:shadow-lg transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <benefit.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
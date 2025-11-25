import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marko",
    location: "Zagreb",
    text: "Prodao sam auto u roku od jednog dana. Došli su, pregledali vozilo i odmah platili. Izvrsna usluga!",
    rating: 5
  },
  {
    name: "Ivan",
    location: "Varaždin",
    text: "Brzo, jednostavno i potpuno bez muke. Najbolja ponuda koju sam dobio.",
    rating: 5
  },
  {
    name: "Ana",
    location: "Karlovac",
    text: "Otkupili su moje neispravno vozilo koje nisam mogla prodati mjesecima. Oni su se pobrinuli za sve.",
    rating: 5
  },
  {
    name: "Tomislav",
    location: "Split",
    text: "Profesionalan pristup, fer cijena i brza transakcija. Preporučujem svima!",
    rating: 5
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-secondary" id="testimonials">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Što kažu naši klijenti
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="border-border animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="font-semibold text-foreground">
                  {testimonial.name}
                  <span className="text-muted-foreground font-normal text-sm ml-2">
                    {testimonial.location}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Ime mora imati najmanje 2 znaka").max(100, "Ime može imati najviše 100 znakova"),
  email: z.string().trim().email("Neispravna email adresa"),
  phone: z.string().trim().min(6, "Broj telefona mora imati najmanje 6 znamenki"),
  car_make_model: z.string().trim().min(2, "Unesite marku i model"),
  year: z.string().trim().min(4, "Unesite godinu (npr. 2020)"),
  mileage: z.string().trim().min(1, "Unesite kilometražu"),
});

export const Contact = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    const formValues = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      car_make_model: formData.get("car_make_model") as string,
      year: formData.get("year") as string,
      mileage: formData.get("mileage") as string,
    };

    const validation = contactSchema.safeParse(formValues);
    
    if (!validation.success) {
      const newErrors: Record<string, string> = {};
      validation.error.issues.forEach(err => {
        if (err.path[0]) {
          newErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(newErrors);
      toast({
        variant: "destructive",
        title: "Greška u formi",
        description: "Molimo ispravite označena polja prije slanja.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone,
          car_make_model: formValues.car_make_model,
          year: formValues.year,
          mileage: formValues.mileage,
          fuel_type: formData.get("fuel_type") as string || undefined,
          transmission: formData.get("transmission") as string || undefined,
          engine_size: formData.get("engine_size") as string || undefined,
          engine_power: formData.get("engine_power") as string || undefined,
          additional_info: formData.get("additional_info") as string || undefined,
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: "✅ Poruka uspješno poslana!",
        description: "Primili ste potvrdu na vašu email adresu. Javit ćemo vam se uskoro.",
        className: "bg-green-50 border-green-200",
      });
      (e.target as HTMLFormElement).reset();
      setErrors({});
    } catch (error) {
      console.error("Form error:", error);
      toast({
        variant: "destructive",
        title: "❌ Greška pri slanju",
        description: "Molimo pokušajte ponovno ili nas nazovite direktno.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      ref={elementRef}
      id="contact" 
      className={`py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-secondary to-background relative overflow-hidden transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-foreground">
            Kontaktirajte nas
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Zatražite besplatnu procjenu i dobijte ponudu u roku od 24 sata
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <div className="bg-background p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl border border-border animate-slide-in-left">
            <h3 className="text-2xl font-bold mb-6 text-foreground">
              Zatražite besplatnu ponudu
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Input
                  name="name"
                  placeholder="Ime i prezime *"
                  required
                  className={`w-full h-12 text-base ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email adresa *"
                  required
                  className={`w-full h-12 text-base ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Broj telefona *"
                  required
                  className={`w-full h-12 text-base ${errors.phone ? "border-red-500" : ""}`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    name="car_make_model"
                    placeholder="Marka i model *"
                    required
                    className={`w-full h-12 text-base ${errors.car_make_model ? "border-red-500" : ""}`}
                  />
                  {errors.car_make_model && <p className="text-red-500 text-sm mt-1">{errors.car_make_model}</p>}
                </div>
                <div>
                  <Input
                    name="year"
                    placeholder="Godina proizvodnje *"
                    required
                    className={`w-full h-12 text-base ${errors.year ? "border-red-500" : ""}`}
                  />
                  {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
                </div>
              </div>
              
              <div>
                <Input
                  name="mileage"
                  placeholder="Kilometraža *"
                  required
                  className={`w-full h-12 text-base ${errors.mileage ? "border-red-500" : ""}`}
                />
                {errors.mileage && <p className="text-red-500 text-sm mt-1">{errors.mileage}</p>}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select name="fuel_type">
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Vrsta goriva" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dizel">Dizel</SelectItem>
                    <SelectItem value="benzin">Benzin</SelectItem>
                    <SelectItem value="plin">Plin</SelectItem>
                    <SelectItem value="cng">CNG</SelectItem>
                    <SelectItem value="hibrid">Hibrid</SelectItem>
                    <SelectItem value="elektro">Elektro</SelectItem>
                  </SelectContent>
                </Select>
                <Select name="transmission">
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Vrsta mjenjača" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manuelni">Manuelni</SelectItem>
                    <SelectItem value="automatik">Automatik</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  name="engine_size"
                  placeholder="Kubikaža (npr. 1.6, 2.0)"
                  className="h-12 text-base"
                />
                <Input
                  name="engine_power"
                  placeholder="Snaga motora (kW)"
                  className="h-12 text-base"
                />
              </div>
              
              <div>
                <Textarea
                  name="additional_info"
                  placeholder="Stanje vozila / Dodatne informacije"
                  rows={4}
                  className="w-full text-base"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-500/90 text-white text-base sm:text-lg py-6 sm:py-7 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
              >
                {isSubmitting ? "Šalje se..." : "Pošaljite upit"}
                <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8 animate-slide-in-right">
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-background rounded-2xl shadow-lg hover-lift">
                <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2 text-lg">Telefon</h4>
                  <a 
                    href="tel:+385915594259" 
                    className="text-primary hover:underline text-lg font-semibold"
                  >
                    +385 91 559 4259
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">Dostupni 24/7</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-background rounded-2xl shadow-lg hover-lift">
                <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2 text-lg">Email</h4>
                  <a 
                    href="mailto:otkupvozilagt@gmail.com" 
                    className="text-primary hover:underline break-all"
                  >
                    otkupvozilagt@gmail.com
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">Odgovor u roku 24h</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-background rounded-2xl shadow-lg hover-lift">
                <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2 text-lg">Lokacija</h4>
                  <p className="text-foreground font-semibold">Zagreb, Hrvatska</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Poslujemo diljem cijele Hrvatske
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <a 
              href="https://www.google.com/maps/place/Zagreb,+Croatia/@45.8150108,15.8776752,12z" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block rounded-2xl overflow-hidden shadow-2xl h-80 border-2 border-border hover:border-primary/50 transition-colors cursor-pointer"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89828.98710280832!2d15.87767!3d45.81501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d692c902b1f1%3A0x301a4f68c6c9fc0!2sZagreb%2C%20Croatia!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, pointerEvents: 'none' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Zagreb Location"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

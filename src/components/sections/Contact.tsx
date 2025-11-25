import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin } from "lucide-react";

export const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      // Using Web3Forms for form submission (free service, no backend needed)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Poruka poslana!",
          description: "Javit ćemo vam se u najkraćem roku.",
        });
        e.currentTarget.reset();
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Greška",
        description: "Molimo pokušajte ponovno ili nas nazovite.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-secondary" id="contact">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Kontaktirajte nas
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-background p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              Zatražite besplatnu ponudu
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Web3Forms access key - replace with your own */}
              <input 
                type="hidden" 
                name="access_key" 
                value="YOUR_WEB3FORMS_ACCESS_KEY" 
              />
              <input 
                type="hidden" 
                name="subject" 
                value="Nova upit - Otkup automobila" 
              />
              <input 
                type="hidden" 
                name="from_name" 
                value="Otkup Automobila Website" 
              />
              
              <div>
                <Input
                  name="name"
                  placeholder="Ime i prezime"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email adresa"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Broj telefona"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <Input
                  name="car_make_model"
                  placeholder="Marka i model vozila"
                  required
                  className="w-full"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="year"
                  placeholder="Godina"
                  required
                />
                <Input
                  name="mileage"
                  placeholder="Kilometraža"
                  required
                />
              </div>
              
              <div>
                <Textarea
                  name="message"
                  placeholder="Stanje vozila / Dodatne informacije"
                  rows={4}
                  className="w-full"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6"
              >
                {isSubmitting ? "Šalje se..." : "Pošaljite upit"}
              </Button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Telefon</h4>
                  <a 
                    href="tel:+385912345678" 
                    className="text-primary hover:underline text-lg"
                  >
                    +385 91 234 5678
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email</h4>
                  <a 
                    href="mailto:marinprusac5@gmail.com" 
                    className="text-primary hover:underline"
                  >
                    marinprusac5@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Lokacija</h4>
                  <p className="text-muted-foreground">Zagreb, Hrvatska</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Poslujemo diljem cijele Hrvatske
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-lg overflow-hidden shadow-lg h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89828.98710280832!2d15.87767!3d45.81501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d692c902b1f1%3A0x301a4f68c6c9fc0!2sZagreb%2C%20Croatia!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Zagreb Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
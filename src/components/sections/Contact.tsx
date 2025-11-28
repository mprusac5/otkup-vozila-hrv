import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().min(6, "Phone number must be at least 6 digits"),
  car_make_model: z.string().trim().min(2, "Please enter make and model"),
  year: z.string().trim().min(4, "Please enter year (e.g. 2020)"),
  mileage: z.string().trim().min(1, "Please enter mileage"),
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
    
    // Validate form data
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
        title: "❌ Form Error",
        description: "Please correct the marked fields before submitting.",
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "✅ Message sent successfully!",
          description: "We've received your inquiry. We'll contact you within 24 hours.",
          className: "bg-green-50 border-green-200",
        });
        e.currentTarget.reset();
        setErrors({});
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "❌ Error sending message",
        description: "Please try again or call us directly.",
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
            Contact Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Request a free valuation and get an offer within 24 hours
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <div className="bg-background p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl border border-border animate-slide-in-left">
            <h3 className="text-2xl font-bold mb-6 text-foreground">
              🚗 Request Your Free Quote
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input 
                type="hidden" 
                name="access_key" 
                value="991ed36e-6b60-4bb8-acee-1e8dd0eecd30" 
              />
              <input 
                type="hidden" 
                name="subject" 
                value="🚗 New Car Purchase Inquiry" 
              />
              <input 
                type="hidden" 
                name="from_name" 
                value="Otkup Automobila Website" 
              />
              
              <div>
                <Input
                  name="name"
                  placeholder="Full Name *"
                  required
                  className={`w-full h-12 text-base ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address *"
                  required
                  className={`w-full h-12 text-base ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number *"
                  required
                  className={`w-full h-12 text-base ${errors.phone ? "border-red-500" : ""}`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              
              <div className="border-t pt-5 mt-5">
                <h4 className="text-lg font-semibold mb-4 text-foreground">🚘 Vehicle Information</h4>
                
                <div>
                  <Input
                    name="car_make_model"
                    placeholder="Make & Model (e.g. Volkswagen Golf) *"
                    required
                    className={`w-full h-12 text-base ${errors.car_make_model ? "border-red-500" : ""}`}
                  />
                  {errors.car_make_model && <p className="text-red-500 text-sm mt-1">{errors.car_make_model}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    name="year"
                    placeholder="Year *"
                    required
                    className={`h-12 text-base ${errors.year ? "border-red-500" : ""}`}
                  />
                  {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
                </div>
                <div>
                  <Input
                    name="mileage"
                    placeholder="Mileage (km) *"
                    required
                    className={`h-12 text-base ${errors.mileage ? "border-red-500" : ""}`}
                  />
                  {errors.mileage && <p className="text-red-500 text-sm mt-1">{errors.mileage}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select name="fuel_type">
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="⛽ Fuel Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="gasoline">Gasoline</SelectItem>
                    <SelectItem value="lpg">LPG/CNG</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                  </SelectContent>
                </Select>
                <Select name="transmission">
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="⚙️ Transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="automatic">Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  name="engine_size"
                  placeholder="Engine Size (L, e.g. 1.6)"
                  className="h-12 text-base"
                />
                <Input
                  name="engine_power"
                  placeholder="Engine Power (kW)"
                  className="h-12 text-base"
                />
              </div>
              
              <div>
                <Textarea
                  name="message"
                  placeholder="💬 Additional Information (condition, service history, number of owners...)"
                  rows={4}
                  className="w-full text-base"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-500/90 text-white text-base sm:text-lg py-6 sm:py-7 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
              >
                {isSubmitting ? "Sending..." : "💰 Get Your Offer Now"}
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
                  <h4 className="font-bold text-foreground mb-2 text-lg">📞 Phone</h4>
                  <a 
                    href="tel:+385912345678" 
                    className="text-primary hover:underline text-lg font-semibold"
                  >
                    +385 91 234 5678
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">Available 24/7</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-background rounded-2xl shadow-lg hover-lift">
                <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2 text-lg">📧 Email</h4>
                  <a 
                    href="mailto:marinprusac5@gmail.com" 
                    className="text-primary hover:underline break-all"
                  >
                    marinprusac5@gmail.com
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">Response within 24h</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-background rounded-2xl shadow-lg hover-lift">
                <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2 text-lg">📍 Location</h4>
                  <p className="text-foreground font-semibold">Zagreb, Croatia</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    We operate throughout Croatia
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

import { Link } from "react-router-dom";

export const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Otkup Automobila</h3>
            <p className="text-background/80 mb-4">
              Brz, pošten i siguran otkup vozila diljem Hrvatske.
            </p>
            <div className="space-y-2 text-sm">
              <p>📞 +385 91 234 5678</p>
              <p>📧 marinprusac5@gmail.com</p>
              <p>📍 Zagreb, Hrvatska</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Brzi linkovi</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("benefits")}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Zašto mi?
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Kako funkcionira
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Usluge
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Kontakt
                </button>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Politika privatnosti
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-xl font-bold mb-4">Područja poslovanja</h3>
            <p className="text-background/80 text-sm">
              Zagreb, Varaždin, Čakovec, Karlovac, Rijeka, Zadar, Split, 
              Osijek, Pula, Dubrovnik i svi drugi gradovi diljem Hrvatske
            </p>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-sm text-background/70">
          <p>© 2024 Otkup Automobila. Sva prava pridržana.</p>
        </div>
      </div>
    </footer>
  );
};
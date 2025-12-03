import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Natrag na početnu
        </Button>

        <h1 className="text-4xl font-bold mb-8 text-foreground">
          Politika privatnosti
        </h1>

        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              1. Prikupljanje podataka
            </h2>
            <p>
              Prikupljamo osobne podatke koje nam dobrovoljno dostavljate putem 
              kontakt forme na našoj web stranici, uključujući: ime, email adresu, 
              broj telefona i informacije o vozilu koje želite prodati.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              2. Uporaba podataka
            </h2>
            <p>
              Vaše osobne podatke koristimo isključivo u svrhu:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Kontaktiranja u vezi s vašim upitom za otkup vozila</li>
              <li>Davanja ponude za otkup vozila</li>
              <li>Organizacije pregleda i otkupa vozila</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              3. Zaštita podataka
            </h2>
            <p>
              Poduzimamo sve potrebne tehničke i organizacijske mjere kako bismo 
              zaštitili vaše osobne podatke od neovlaštenog pristupa, gubitka ili zlouporabe.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              4. Dijeljenje podataka
            </h2>
            <p>
              Vaše osobne podatke ne prodajemo, ne iznajmljujemo niti dijelimo s 
              trećim stranama osim ako to nije potrebno za pružanje naših usluga 
              ili ako to zakon zahtijeva.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              5. Vaša prava
            </h2>
            <p>
              Imate pravo na pristup, ispravak ili brisanje svojih osobnih podataka. 
              Za ostvarivanje svojih prava možete nas kontaktirati putem email adrese 
              otkupvozilagt@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              6. Kolačići (Cookies)
            </h2>
            <p>
              Naša web stranica može koristiti kolačiće kako bi poboljšala korisničko 
              iskustvo. Možete postaviti svoj preglednik da odbije kolačiće, ali to 
              može utjecati na funkcionalnost stranice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              7. Kontakt
            </h2>
            <p>
              Za sva pitanja vezana uz ovu politiku privatnosti možete nas kontaktirati na:
            </p>
            <ul className="list-none space-y-1">
              <li>📧 Email: otkupvozilagt@gmail.com</li>
              <li>📞 Telefon: +385 91 559 4259</li>
            </ul>
          </section>

          <p className="text-sm text-muted-foreground mt-8">
            Posljednje ažuriranje: {new Date().toLocaleDateString('hr-HR')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
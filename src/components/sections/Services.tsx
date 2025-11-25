export const Services = () => {
  return (
    <section className="py-20 bg-background" id="services">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Otkup automobila u Hrvatskoj
        </h2>
        <div className="prose prose-lg max-w-none">
          <div className="space-y-6 text-muted-foreground">
            <p className="text-lg">
              Nudimo <span className="font-semibold text-foreground">profesionalan otkup svih vrsta putničkih vozila</span> diljem Hrvatske. 
              Bez obzira na marku, godinu proizvodnje, kilometražu ili stanje vašeg automobila — mi smo tu za vas.
            </p>
            
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Otkupljujemo:</h3>
              <ul className="space-y-2">
                <li>✅ Sve marke i modele vozila</li>
                <li>✅ Nova i rabljena vozila</li>
                <li>✅ Registrirana i neregistrirana vozila</li>
                <li>✅ Oštećena, pokvarena ili neispravna vozila</li>
                <li>✅ Totalno oštećena vozila</li>
              </ul>
            </div>

            <p>
              Nudimo <span className="font-semibold text-foreground">besplatnu procjenu</span> i preuzimamo sve troškove 
              dokumentacije, uključujući prijenos vlasništva i porez na promet (5%).
            </p>

            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Poslujemo diljem Hrvatske</h3>
              <p className="mb-2">
                Naša usluga dostupna je u svim većim gradovima i regijama:
              </p>
              <p className="text-sm">
                Zagreb, Varaždin, Čakovec, Karlovac, Rijeka, Zadar, Split, Osijek, Pula, Dubrovnik i drugi gradovi.
              </p>
            </div>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-foreground">
              Zašto prodati automobil nama umjesto privatnoj osobi?
            </h3>
            <ul className="space-y-3">
              <li>🚫 <strong>Bez čekanja</strong> — isplata odmah</li>
              <li>🚫 <strong>Bez cjenkanja</strong> — fer ponuda bez nagovaranja</li>
              <li>🚫 <strong>Bez nepouzdanih kupaca</strong> — profesionalna transakcija</li>
              <li>🚫 <strong>Bez troškova oglašavanja</strong> — mi dolazimo do vas</li>
              <li>✅ <strong>Bez stresa</strong> — brz, siguran i jednostavan proces</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
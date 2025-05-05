const boutiques = [
    { nom: "Adidas", image: "/images/boutiques/adidas.png" },
    { nom: "L'Oréal", image: "/images/boutiques/loreal.avif" },
    { nom: "Taurus", image: "/images/boutiques/taurus.jpg" },
    { nom: "Douxnid", image: "/images/boutiques/douxnid.jpeg" },
    { nom: "DeFacto", image: "/images/boutiques/defacto.jpg" },
    { nom: "Nivea", image: "/images/boutiques/nivea.jpg" },
    { nom: "Xiaomi", image: "/images/boutiques/xiaomi.jpg" },
    { nom: "A3 Home", image: "/images/boutiques/a3home.jpeg" },
    { nom: "Logitech", image: "/images/boutiques/logitech.webp" },
    { nom: "Groupe SEB", image: "/images/boutiques/seb.jpeg" },
    { nom: "Siera", image: "/images/boutiques/siera.jpg" },
    { nom: "Voir Plus", image: "/images/boutiques/voirplus.png" },
  ];
  
  export default function BoutiquesOfficielles() {
    return (
      <section className="bg-[#62d4f9] py-10 px-4">
        <h2 className="text-center text-2xl font-bold text-white mb-6">
          Découvrez nos boutiques officielles
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {boutiques.map((b, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden shadow group cursor-pointer transform transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={b.image}
                alt={b.nom}
                className="w-full h-32 object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <span className="text-white font-bold text-base text-center px-2">
                  {b.nom}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
const categories = [
    { nom: "Maison & cuisine", image: "/images/categories/maison.jpg" },
    { nom: "Beauté & Santé", image: "/images/categories/beaute.avif" },
    { nom: "TV & High Tech", image: "/images/categories/tv.jpg" },
    { nom: "Téléphonie", image: "/images/categories/telephone.jpg" },
    { nom: "Mode homme", image: "/images/categories/mode-homme.webp" },
    { nom: "Mode femme", image: "/images/categories/mode-femme.webp" },
    { nom: "Électroménager", image: "/images/categories/electromenager.jpg" },
    { nom: "Informatique", image: "/images/categories/informatique.jpg" },
    { nom: "Sport", image: "/images/categories/sport.jpg.avif" },
    { nom: "Jeux vidéos & Consoles", image: "/images/categories/jeux.jpg" },
    { nom: "Mode enfants", image: "/images/categories/enfants.jpg" },
    { nom: "Livres & Romans", image: "/images/categories/livres.jpg" },
  ];
  
  export default function NosCategories() {
    return (
      <section className="bg-[#62d4f9] py-10 px-4">
        <h2 className="text-center text-2xl font-bold text-white mb-6">Nos catégories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden shadow group cursor-pointer transform transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={cat.image}
                alt={cat.nom}
                className="w-full h-32 object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-base text-center px-2">
                  {cat.nom}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
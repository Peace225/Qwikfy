const climatiseurs = [
    {
      name: "Samsung Climatiseur Mural",
      price: "4,799.00 Euro",
      oldPrice: "6,499.00 Euro",
      discount: "-26%",
      img: "/images/clim/samsung.webp",
    },
    {
      name: "Unio Climatiseur 12000 BTU",
      price: "3,700.00 Euro",
      oldPrice: "",
      discount: "",
      img: "/images/clim/unio.jpg.webp",
    },
    {
      name: "Taurus AC 293 KT Mobile",
      price: "3,699.00 Euro",
      oldPrice: "5,999.00 Euro",
      discount: "-38%",
      img: "/images/clim/taurus.webp",
    },
    {
      name: "TCL Climatiseur Mural 9000 BTU",
      price: "3,455.00 Euro",
      oldPrice: "4,290.00 Euro",
      discount: "-18%",
      img: "/images/clim/tcl.jpg",
    },
    {
      name: "Infinition Climatiseur Split",
      price: "4,190.00 Euro",
      oldPrice: "4,990.00 Euro",
      discount: "-16%",
      img: "/images/clim/infinition.webp",
    },
    {
      name: "LG Climatiseur DUALCOOL",
      price: "4,991.00 Euro",
      oldPrice: "6,750.00 Euro",
      discount: "-26%",
      img: "/images/clim/lg.jpg",
    },
  ];
  
  export default function ClimatisationVentilateurs() {
    return (
      <section className="bg-lime-200 py-6 px-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Climatisation et ventilateurs | Jusqu'à -27%</h2>
          <button className="text-sm text-gray-700 hover:underline">Voir plus &rarr;</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {climatiseurs.map((item, i) => (
            <div key={i} className="text-sm bg-white p-2 rounded shadow hover:shadow-md transition">
              <div className="relative">
                <img src={item.img} alt={item.name} className="w-full h-32 object-contain" />
                {item.discount && (
                  <span className="absolute top-1 right-1 bg-orange-100 text-orange-700 text-xs px-1 py-0.5 rounded">
                    {item.discount}
                  </span>
                )}
              </div>
              <h3 className="font-medium mt-1 line-clamp-2">{item.name}</h3>
              <p className="font-bold">{item.price}</p>
              {item.oldPrice && (
                <p className="text-xs line-through text-gray-400">{item.oldPrice}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }
  
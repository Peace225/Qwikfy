const produitsMode = [
    {
      name: "Adidas Chaussure Litecourt",
      price: "525.00 Euro",
      oldPrice: "860.00 Euro",
      discount: "-39%",
      img: "/images/mode/litecourt.avif",
    },
    {
      name: "Koton Chemise Blanc Popeline",
      price: "249.00 Euro",
      oldPrice: "329.00 Euro",
      discount: "-24%",
      img: "/images/mode/chemisier.webp",
    },
    {
      name: "Defacto Chemisiers à manches",
      price: "169.00 Euro",
      oldPrice: "",
      discount: "",
      img: "/images/mode/pantalon.jpeg",
    },
    {
      name: "UGG Cozetta Curly Black",
      price: "699.00 Euro",
      oldPrice: "1,750.00 Euro",
      discount: "-60%",
      img: "/images/mode/2.webp",
    },
    {
      name: "Koton Pantalon Noir Femme",
      price: "319.00 Dhs - 449.00 Euro",
      oldPrice: "",
      discount: "-29%",
      img: "/images/mode/ugg.jpg",
    },
    {
      name: "Defacto Jupe mi-longue",
      price: "219.00 Euro",
      oldPrice: "449.00 Euro",
      discount: "-51%",
      img: "/images/mode/jupe.jpg",
    },
  ];
  
  export default function Mode() {
    return (
      <section className="bg-lime-100 py-6 px-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Mode | Jusqu'à -75%</h2>
          <button className="text-sm text-gray-700 hover:underline">Voir plus &rarr;</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {produitsMode.map((item, i) => (
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
  
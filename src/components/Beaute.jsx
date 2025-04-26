const produitsBeaute = [
    {
      name: "NIVEA Gommage aux éclats de riz x2",
      price: "127.00 Euro",
      oldPrice: "167.00 Euro",
      discount: "-24%",
      img: "/images/beaute/gommage.jpg",
    },
    {
      name: "NIVEA Gel Nettoyant Purifiant x2",
      price: "98.00 Euro",
      oldPrice: "167.00 Euro",
      discount: "-41%",
      img: "/images/beaute/gel.webp",
    },
    {
      name: "NIVEA Démaquillant yeux x2",
      price: "103.50 Euro",
      oldPrice: "145.00 Euro",
      discount: "-29%",
      img: "/images/beaute/demaquillant.jpg",
    },
    {
      name: "REVOLUTION BEAUTY Miracle Cream",
      price: "59.00 Euro",
      oldPrice: "135.00 Euro",
      discount: "-56%",
      img: "/images/beaute/miracle.webp",
    },
    {
      name: "Garnier Color Naturals - Châtain",
      price: "43.00 Euro",
      oldPrice: "47.50 Euro",
      discount: "-9%",
      img: "/images/beaute/garnier.jpeg",
    },
    {
      name: "Labello Baume à Lèvres Fraise",
      price: "35.00 Euro",
      oldPrice: "38.00 Euro",
      discount: "-8%",
      img: "/images/beaute/labello.jpg",
    },
  ];
  
  export default function Beaute() {
    return (
      <section className="bg-lime-100 py-6 px-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Beauté | Jusqu'à -65%</h2>
          <button className="text-sm text-gray-700 hover:underline">Voir plus &rarr;</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {produitsBeaute.map((item, i) => (
            <div key={i} className="text-sm bg-white p-2 rounded shadow hover:shadow-md transition">
              <div className="relative">
                <img src={item.img} alt={item.name} className="w-full h-32 object-contain" />
                <span className="absolute top-1 right-1 bg-orange-100 text-orange-700 text-xs px-1 py-0.5 rounded">
                  {item.discount}
                </span>
              </div>
              <h3 className="font-medium mt-1 line-clamp-2">{item.name}</h3>
              <p className="font-bold">{item.price}</p>
              <p className="text-xs line-through text-gray-400">{item.oldPrice}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
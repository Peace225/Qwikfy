const produitsTech = [
    {
      name: "SG SETUP GAMER R3 32G DDR4",
      price: "5,252.15 Euro",
      oldPrice: "6,563.94 Euro",
      discount: "-20%",
      img: "/images/tech/setup.webp",
    },
    {
      name: "XIAOMI Redmi Buds 6 Plus",
      price: "109.00 Euro",
      oldPrice: "174.00 Euro",
      discount: "-37%",
      img: "/images/tech/buds.jpg",
    },
    {
      name: "XIAOMI WiFi Range Extender",
      price: "95.00 Euro",
      oldPrice: "119.00 Euro",
      discount: "-20%",
      img: "/images/tech/range-extender.jpg",
    },
    {
      name: "Echolink 32 Smart TV Frame",
      price: "1,151.00 Euro",
      oldPrice: "1,505.00 Euro",
      discount: "-24%",
      img: "/images/tech/echolink-tv.jpg",
    },
    {
      name: "XIAOMI Redmi Note 14",
      price: "1,999.00 Euro",
      oldPrice: "3,198.00 Euro",
      discount: "-37%",
      img: "/images/tech/redmi-note14.png",
    },
    {
      name: "Samsung Adaptateur secteur",
      price: "129.00 Euro",
      oldPrice: "215.00 Euro",
      discount: "-40%",
      img: "/images/tech/adaptateur.jpg",
    },
  ];
  
  export default function Tech() {
    return (
      <section className="bg-lime-100 py-6 px-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Tech | Jusqu'à 80%</h2>
          <button className="text-sm text-gray-700 hover:underline">Voir plus &rarr;</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {produitsTech.map((item, i) => (
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
  
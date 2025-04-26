const produitsDestockage = [
    {
      name: "Washer Machine à laver 8kg",
      price: "2,732.00 Euro",
      oldPrice: "4,170.00 Euro",
      discount: "-34%",
      img: "/images/destockage/washer.jpeg",
    },
    {
      name: "Siera Machine à laver 9kg",
      price: "3,087.00 Euro",
      oldPrice: "4,711.00 Euro",
      discount: "-34%",
      img: "/images/destockage/siera.webp",
    },
    {
      name: "REVO Galaxy Récepteur",
      price: "95.00 Euro",
      oldPrice: "145.00 Euro",
      discount: "-34%",
      img: "/images/destockage/revo.jpeg",
    },
    {
      name: "Daiko Congélateur vertical",
      price: "1,762.00 Euro",
      oldPrice: "2,689.00 Euro",
      discount: "-34%",
      img: "/images/destockage/congelateur.jpg",
    },
    {
      name: "XIAOMI Redmi Watch 5",
      price: "329.00 Euro",
      oldPrice: "501.00 Euro",
      discount: "-34%",
      img: "/images/destockage/redmiwatch.webp",
    },
    {
      name: "Daiko Presse-agrumes",
      price: "105.00 Euro",
      oldPrice: "159.00 Euro",
      discount: "-34%",
      img: "/images/destockage/presse.webp",
    },
  ];
  
  export default function Destockage() {
    return (
      <section className="bg-lime-100 py-6 px-4 mt-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Déstockage</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {produitsDestockage.map((item, i) => (
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
  
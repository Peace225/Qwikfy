const produitsInfinix = [
    {
      name: "Infinix SMART 8 X6525",
      price: "899.00 Euro",
      oldPrice: "999.00 Euro",
      discount: "-10%",
      img: "/images/infinix/smart8.webp",
    },
    {
      name: "Infinix HOT 50 X6882",
      price: "1,780.00 Euro",
      oldPrice: "1,999.00 Euro",
      discount: "-11%",
      img: "/images/infinix/hot50.jpg",
    },
    {
      name: "Infinix SMART 9 X6532",
      price: "970.00 Euro",
      oldPrice: "1,129.00 Euro",
      discount: "-14%",
      img: "/images/infinix/smart9.jpg",
    },
    {
      name: "Infinix HOT 50i X6531",
      price: "1,540.00 Euro",
      oldPrice: "1,799.00 Euro",
      discount: "-14%",
      img: "/images/infinix/hot50i.jpg",
    },
    {
      name: "Infinix Note 40 – 6.78″",
      price: "2,800.00 Euro",
      oldPrice: "4,200.00 Euro",
      discount: "-33%",
      img: "/images/infinix/note40.jpg",
    },
    {
      name: "Infinix HOT 50i X6531 (Noir)",
      price: "1,540.00 Euro",
      oldPrice: "1,799.00 Euro",
      discount: "-14%",
      img: "/images/infinix/hot50i-black.webp",
    },
  ];
  
  export default function InfinixBoutique() {
    return (
      <section className="bg-lime-100 py-6 px-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Infinix | Boutique Officielle</h2>
          <button className="text-sm text-gray-700 hover:underline">Voir plus &rarr;</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {produitsInfinix.map((item, i) => (
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
  
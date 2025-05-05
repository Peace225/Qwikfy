import { useState } from "react";
import CheckoutPopup from "./CheckoutPopup"; // ✅ N'oublie d'importer ton Popup

const produitsMaison = [
  {
    name: "Kitea Set MANHATTAN – 4 places",
    price: "2,599.00 Euro",
    oldPrice: "4,199.00 Euro",
    discount: "-38%",
    img: "/images/maison/kitea-set.png",
  },
  {
    name: "Kenz Bouilloire Electrique",
    price: "89.00 Euro",
    oldPrice: "199.00 Euro",
    discount: "-55%",
    img: "/images/maison/bouilloire.jpg",
  },
  {
    name: "Kitea Chaise FRESH - Gris",
    price: "359.00 Euro",
    oldPrice: "499.00 Euro",
    discount: "-28%",
    img: "/images/maison/chaise.jpg",
  },
  {
    name: "XIAOMI Aspirateur Mi Vacuum",
    price: "2,399.00 Euro",
    oldPrice: "2,999.00 Euro",
    discount: "-20%",
    img: "/images/maison/aspirateur.jpg",
  },
  {
    name: "Dansmamaison.ma LAA Sofa Set",
    price: "5,681.00 Euro",
    oldPrice: "10,000.00 Euro",
    discount: "-43%",
    img: "/images/maison/sofa.webp",
  },
  {
    name: "Kenz Hachoir électrique 3L",
    price: "189.00 Euro",
    oldPrice: "399.00 Euro",
    discount: "-53%",
    img: "/images/maison/hachoir.jpg",
  },
];

export default function MaisonElectromenager() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <section className="bg-[#62d4f9] py-6 px-4 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">Maison & électroménagers | Jusqu'à -80%</h2>
        <button className="text-sm text-white hover:underline">Voir plus &rarr;</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {produitsMaison.map((item, i) => (
          <div
            key={i}
            className="text-sm bg-white p-2 rounded shadow hover:shadow-md transition cursor-pointer"
            onClick={() => setSelectedProduct(item)} // ✅ Ouvre le popup au clic
          >
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

      {/* 🔥 Afficher le Popup si un produit est sélectionné */}
      {selectedProduct && (
        <CheckoutPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}

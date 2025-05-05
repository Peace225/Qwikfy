import { useState } from "react";
import CheckoutPopup from "./CheckoutPopup"; // 🔥 à importer (assure-toi que le fichier existe bien)

const topDeals = [
  {
    name: "Four électrique Royal FEB 36",
    price: "599.00 Euro",
    oldPrice: "799.00 Euro",
    discount: "-25%",
    img: "/images/topdeals/four.jpg",
  },
  {
    name: "Tajine 30cm GRANITE",
    price: "144.00 Euro",
    oldPrice: "210.00 Euro",
    discount: "-31%",
    img: "/images/topdeals/tajine.jpg",
  },
  {
    name: "Égouttoir Vaisselle",
    price: "316.00 Euro",
    oldPrice: "550.00 Euro",
    discount: "-43%",
    img: "/images/topdeals/egouttoir.webp",
  },
  {
    name: "Lot de 6 bocaux en verre",
    price: "87.00 Euro",
    oldPrice: "139.00 Euro",
    discount: "-37%",
    img: "/images/topdeals/bocaux.webp",
  },
  {
    name: "Montre Tactile Oraimo HD",
    price: "328.00 Euro",
    oldPrice: "450.00 Euro",
    discount: "-27%",
    img: "/images/topdeals/montre.jpg",
  },
  {
    name: "Hamac en coton multicolore",
    price: "96.00 Euro",
    oldPrice: "109.00 Euro",
    discount: "-12%",
    img: "/images/topdeals/hamacs.webp",
  },
  {
    name: "Sèche-cheveux professionnel 3000W",
    price: "195.00 Euro",
    oldPrice: "299.00 Euro",
    discount: "-35%",
    img: "/images/topdeals/seche-cheveux.webp",
  },
  {
    name: "Machine à café portable USB",
    price: "199.00 Euro",
    oldPrice: "289.00 Euro",
    discount: "-31%",
    img: "/images/topdeals/cafe-grain.png",
  },
  {
    name: "Balance électronique cuisine",
    price: "79.00 Euro",
    oldPrice: "110.00 Euro",
    discount: "-28%",
    img: "/images/topdeals/balance.jpg",
  },
  {
    name: "Brosse lissante chauffante",
    price: "149.00 Euro",
    oldPrice: "239.00 Euro",
    discount: "-38%",
    img: "/images/topdeals/brosse.jpg",
  },
];

export default function TopDeals() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <section className="bg-[#62d4f9] py-6 px-4">
      <h2 className="text-xl font-bold mb-4 text-white">Top deals :</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {topDeals.map((deal, index) => (
          <div
            key={index}
            onClick={() => setSelectedProduct(deal)}
            className="cursor-pointer bg-white rounded shadow-sm p-2 hover:shadow-md transition"
          >
            <div className="relative">
              <img
                src={deal.img}
                alt={deal.name}
                className="h-28 w-full object-contain"
              />
              <span className="absolute top-1 right-1 bg-orange-500 text-white text-xs px-1 py-0.5 rounded">
                {deal.discount}
              </span>
            </div>
            <h3 className="text-sm mt-2 font-semibold truncate">{deal.name}</h3>
            <p className="text-sm font-bold text-gray-800">{deal.price}</p>
            <p className="text-xs line-through text-gray-400">{deal.oldPrice}</p>
          </div>
        ))}
      </div>

      {/* ✅ Popup Checkout affiché au clic */}
      {selectedProduct && (
        <CheckoutPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}

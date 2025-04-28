import { useState } from "react";
import CheckoutPopup from "../components/CheckoutPopup"; // 🔥 import du Popup

const produitsAdidas = [
  {
    name: "Adidas Claquette Eezay",
    price: "119.00 Euro",
    oldPrice: "300.00 Euro",
    discount: "-60%",
    img: "/images/adidas/claquette.webp",
  },
  {
    name: "Adidas Chaussure Litecourt",
    price: "495.00 Euro",
    oldPrice: "810.00 Euro",
    discount: "-39%",
    img: "/images/adidas/Litecourt.avif",
  },
  {
    name: "Adidas Chaussure Lite Rose",
    price: "385.00 Euro",
    oldPrice: "630.00 Euro",
    discount: "-39%",
    img: "/images/adidas/lite-rose.jpg",
  },
  {
    name: "Adidas Chaussure Tensas",
    price: "329.00 Euro",
    oldPrice: "540.00 Euro",
    discount: "-39%",
    img: "/images/adidas/tensas.jpg",
  },
  {
    name: "Adidas Chaussure Response",
    price: "635.00 Euro",
    oldPrice: "1,040.00 Euro",
    discount: "-39%",
    img: "/images/adidas/response.jpg",
  },
  {
    name: "Adidas Chaussure Zero",
    price: "459.00 Euro",
    oldPrice: "860.00 Euro",
    discount: "-47%",
    img: "/images/adidas/zero.webp",
  },
];

export default function AdidasBoutique() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <section className="bg-lime-100 py-6 px-4 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Adidas | Boutique officielle</h2>
        <button className="text-sm text-gray-700 hover:underline">Voir plus &rarr;</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {produitsAdidas.map((item, i) => (
          <div
            key={i}
            className="text-sm bg-white p-2 rounded shadow hover:shadow-md transition cursor-pointer"
            onClick={() => setSelectedProduct(item)}
          >
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

      {/* Popup Checkout */}
      {selectedProduct && (
        <CheckoutPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}

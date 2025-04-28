import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function Mode() {
  const produitsMode = [
    { name: "Adidas Chaussure Litecourt", price: "525.00 Euro", oldPrice: "860.00 Euro", discount: "-39%", img: "/images/mode/litecourt.avif" },
    { name: "Koton Chemise Blanc Popeline", price: "249.00 Euro", oldPrice: "329.00 Euro", discount: "-24%", img: "/images/mode/chemisier.webp" },
    { name: "Defacto Chemisiers à manches", price: "169.00 Euro", oldPrice: "", discount: "", img: "/images/mode/pantalon.jpeg" },
    { name: "UGG Cozetta Curly Black", price: "699.00 Euro", oldPrice: "1,750.00 Euro", discount: "-60%", img: "/images/mode/2.webp" },
    { name: "Koton Pantalon Noir Femme", price: "319.00 Euro", oldPrice: "449.00 Euro", discount: "-29%", img: "/images/mode/ugg.jpg" },
    { name: "Defacto Jupe mi-longue", price: "219.00 Euro", oldPrice: "449.00 Euro", discount: "-51%", img: "/images/mode/jupe.jpg" },
  ];

  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    closeModal();
    showToastMessage();
  };

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowCheckout(true);
  };

  const closeCheckout = () => {
    setShowCheckout(false);
  };

  const showToastMessage = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <section className="bg-lime-100 py-6 px-4 mt-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Mode | Jusqu'à -75%</h2>
        <button className="text-sm text-gray-700 hover:underline">Voir plus &rarr;</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {produitsMode.map((item, i) => (
          <div
            key={i}
            className="text-sm bg-white p-2 rounded shadow hover:shadow-md transition cursor-pointer"
            onClick={() => handleProductClick(item)}
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

      {/* Popup Produit */}
      <AnimatePresence>
        {selectedProduct && !showCheckout && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-t-2xl shadow-xl p-6 w-full max-w-md z-50"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="relative">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl"
                >
                  &times;
                </button>
              </div>

              <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-40 object-contain mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{selectedProduct.name}</h3>
              <p className="text-green-600 font-bold text-lg mb-2">{selectedProduct.price}</p>
              {selectedProduct.oldPrice && (
                <p className="text-xs text-gray-400 line-through mb-4">{selectedProduct.oldPrice}</p>
              )}

              <div className="flex flex-col gap-3 mt-6">
                <button
                  onClick={() => handleBuyNow(selectedProduct)}
                  className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded"
                >
                  Acheter maintenant
                </button>
                <button
                  onClick={() => handleAddToCart(selectedProduct)}
                  className="w-full px-4 py-2 border border-green-600 text-green-600 hover:bg-green-50 font-semibold rounded"
                >
                  Ajouter au Panier
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Popup Checkout */}
      <AnimatePresence>
        {showCheckout && selectedProduct && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              onClick={closeCheckout}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 rounded-t-2xl shadow-lg p-6 w-full max-w-md z-50"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-bold text-green-600 mb-4">Checkout</h3>
                <img src={selectedProduct.img} alt={selectedProduct.name} className="w-32 h-32 object-contain mb-4" />
                <p className="text-lg font-bold">{selectedProduct.name}</p>
                <p className="text-green-500 font-semibold my-2">{selectedProduct.price}</p>
                <button
                  className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold"
                  onClick={() => alert("Paiement simulé 🎉")}
                >
                  Valider et Payer
                </button>
                <button
                  className="mt-4 text-sm text-gray-500 hover:underline"
                  onClick={closeCheckout}
                >
                  Annuler
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast confirmation */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg z-50"
          >
            ✅ Produit ajouté au panier !
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function CheckoutPopup({ product, onClose }) {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-md"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Bouton fermer */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            <X size={24} />
          </button>

          {/* Image */}
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-48 object-contain mb-6"
          />

          {/* Infos produit */}
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{product.name}</h2>
          <p className="text-lg font-bold text-green-600 mb-1">{product.price}</p>
          {product.oldPrice && (
            <p className="text-sm text-gray-400 line-through mb-4">{product.oldPrice}</p>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => alert("Achat immédiat 🚀")}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
            >
              Acheter Maintenant
            </button>
            <button
              onClick={() => alert("Ajouté au panier 🛒")}
              className="w-full border border-green-600 text-green-600 hover:bg-green-50 font-semibold py-2 rounded-md transition"
            >
              Ajouter au Panier
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

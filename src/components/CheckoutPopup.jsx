import { motion } from "framer-motion";

export default function CheckoutPopup({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-md text-center"
      >
        {/* Bouton Fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl"
        >
          ✖
        </button>

        {/* Image Produit */}
        <img
          src={product.img}
          alt={product.name}
          className="h-48 w-auto object-contain mx-auto mb-6"
        />

        {/* Infos Produit */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {product.name}
        </h2>
        <p className="text-lg font-semibold text-green-600">{product.price}</p>
        {product.oldPrice && (
          <p className="text-sm text-gray-400 line-through mb-4">{product.oldPrice}</p>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={() => alert("Rediriger vers le paiement...")}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full shadow transition-all"
          >
            Acheter Maintenant
          </button>

          <button
            onClick={() => alert("Ajouté au panier 🛒")}
            className="w-full border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-gray-800 font-semibold py-3 rounded-full transition-all"
          >
            Ajouter au Panier
          </button>
        </div>
      </motion.div>
    </div>
  );
}

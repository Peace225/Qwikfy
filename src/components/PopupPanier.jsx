import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function PopupPanier({ isOpen, onClose, cartItems = [] }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.25 }}
        className="fixed top-20 right-4 z-50 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">Mon Panier</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Contenu */}
        <div className="max-h-60 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center mt-4">Votre panier est vide.</p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item, index) => (
                <li key={index} className="flex items-center gap-4">
                  <img src={item.image} alt={item.nom} className="w-12 h-12 rounded object-cover" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.nom}</h3>
                    <p className="text-xs text-gray-500">{item.prix} FCFA</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
          <Link
            to="/panier"
            onClick={onClose}
            className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md"
          >
            Voir mon panier
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

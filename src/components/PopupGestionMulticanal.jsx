import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PopupGestionMulticanal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onClose();
    }, 15000);
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 w-full max-w-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-lg rounded-lg z-50"
        >
          <div className="p-4">
            <h2 className="text-lg font-bold text-green-700 mb-1">
              🛒 Gestion Multi-Canaux
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Synchronisez vos ventes et inventaires sur plusieurs plateformes : Shopify, WooCommerce, Amazon, et plus encore.
              Qwikfy facilite la gestion centralisée de votre activité e-commerce.
            </p>
          </div>
          <div className="flex justify-end p-2">
            <button
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-red-500"
            >
              Fermer
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { motion, AnimatePresence } from "framer-motion";

export default function PopupMarketing({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-28 left-4 w-full max-w-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 z-40"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-green-600">🎯 Marketing & Publicité</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-red-600 text-sm">✖️</button>
          </div>
          <ul className="text-sm text-gray-700 dark:text-gray-200 space-y-1 list-disc list-inside">
            <li>Campagnes Facebook, Google & TikTok Ads</li>
            <li>Email marketing & automatisation</li>
            <li>Retargeting multi-plateformes</li>
            <li>Analyse des performances en temps réel</li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

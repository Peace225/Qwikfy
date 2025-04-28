import { useState } from "react";
import { PlusCircle, Package, Home, LogOut, Store, SunMoon, ChevronLeft, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; 
import Automisation from "../pages/Automatisation"; // Ton composant Automisation

export default function SidebarDashboard({ user, darkMode, setDarkMode, handleLogout, navigate, setShowCreate, setShowAddProduit, menuOpen, setMenuOpen }) {
  const [hoverTruck, setHoverTruck] = useState(false);
  const [showAutomatisation, setShowAutomatisation] = useState(false);

  return (
    <>
      {/* Overlay Mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed z-40 inset-y-0 left-0 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:block w-64 bg-white dark:bg-gray-800 p-6 border-r shadow-sm transition-transform duration-300 ease-in-out
        `}
        aria-label="Menu latéral"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-600">Qwikfy</h1>
          <button
            onClick={() => setMenuOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-4 text-gray-700 dark:text-gray-200 text-sm">
          <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 hover:text-green-600">
            <PlusCircle size={18} /> Créer une boutique
          </button>
          <button onClick={() => setShowAddProduit(true)} className="flex items-center gap-2 hover:text-green-600">
            <Store size={18} /> Ajouter un produit
          </button>
          <button onClick={() => navigate("/mes-produits")} className="flex items-center gap-2 hover:text-green-600">
            <Package size={18} /> Mes produits
          </button>

          {/* Automatisation */}
          <button
            onClick={() => setShowAutomatisation(true)}
            onMouseEnter={() => setHoverTruck(true)}
            onMouseLeave={() => setHoverTruck(false)}
            className="flex items-center gap-2 hover:text-green-600"
          >
            <motion.div
              animate={hoverTruck ? { x: 5 } : { x: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Truck size={18} />
            </motion.div>
            Automatisation
          </button>

          <button onClick={() => navigate("/")} className="flex items-center gap-2 hover:text-green-600">
            <Home size={18} /> Retour à l'accueil
          </button>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:underline">
            <LogOut size={18} /> Déconnexion
          </button>
          <button onClick={() => setDarkMode(!darkMode)} className="flex items-center gap-2 text-xs text-gray-400 mt-4">
            <SunMoon size={14} /> Mode {darkMode ? "Clair" : "Sombre"}
          </button>
        </nav>
      </aside>

      {/* Popup Automatisation amélioré */}
      <AnimatePresence>
        {showAutomatisation && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <div className="relative bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-5xl overflow-y-auto max-h-[90vh]">
              {/* Bouton Fermer */}
              <button
                onClick={() => setShowAutomatisation(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              >
                ✖
              </button>

              {/* 👉 Ici ton composant Automisation.jsx */}
              <Automisation />

              {/* 🔥 BONUS BOUTON AJOUT ALIEXPRESS */}
              <div className="flex justify-center mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => alert("Fonction Ajouter AliExpress en développement... 🚀")}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-all shadow"
                >
                  + Ajouter AliExpress
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

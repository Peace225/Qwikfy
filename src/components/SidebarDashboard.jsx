import { useState } from "react";
import { PlusCircle, Package, Home, LogOut, Store, SunMoon, ChevronLeft, Truck, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; 
import Automatisation from "../pages/Automatisation";
import Formation from "../pages/Formation";
import ChoixThemePopup from "../components/ChoixThemePopup";


export default function SidebarDashboard({ user, darkMode, setDarkMode, handleLogout, navigate, setShowCreate, setShowAddProduit, menuOpen, setMenuOpen }) {
  const [hoverTruck, setHoverTruck] = useState(false);
  const [hoverBook, setHoverBook] = useState(false);

  const [showAutomatisation, setShowAutomatisation] = useState(false);
  const [showFormation, setShowFormation] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);

  return (
    <>
      {/* Overlay Mobile */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 md:hidden" onClick={() => setMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed z-40 inset-y-0 left-0 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:block w-64 bg-white dark:bg-gray-800 p-6 border-r shadow-sm transition-transform duration-300 ease-in-out`} aria-label="Menu latéral">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-600">Qwikfy</h1>
          <button onClick={() => setMenuOpen(false)} className="md:hidden text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
            <ChevronLeft size={24} />
          </button>
        </div>

        {/* Menu principal */}
        <nav className="flex flex-col gap-4 text-gray-700 dark:text-gray-200 text-sm">
          <button onClick={() => setShowThemeSelector(true)} className="flex items-center gap-2 hover:text-green-600">
            <PlusCircle size={18} /> Créer une boutique
          </button>

          <button onClick={() => setShowAddProduit(true)} className="flex items-center gap-2 hover:text-green-600">
            <Store size={18} /> Ajouter un produit
          </button>

          <button onClick={() => navigate("/mes-produits")} className="flex items-center gap-2 hover:text-green-600">
            <Package size={18} /> Mes produits
          </button>

          <button onClick={() => setShowAutomatisation(true)} onMouseEnter={() => setHoverTruck(true)} onMouseLeave={() => setHoverTruck(false)} className="flex items-center gap-2 hover:text-green-600">
            <motion.div animate={hoverTruck ? { x: 5 } : { x: 0 }} transition={{ type: "spring", stiffness: 300 }}>
              <Truck size={18} />
            </motion.div>
            Automatisation
          </button>

          <button onClick={() => setShowFormation(true)} onMouseEnter={() => setHoverBook(true)} onMouseLeave={() => setHoverBook(false)} className="flex items-center gap-2 hover:text-green-600">
            <motion.div animate={hoverBook ? { x: 5 } : { x: 0 }} transition={{ type: "spring", stiffness: 300 }}>
              <BookOpen size={18} />
            </motion.div>
            Formation E-commerce
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

      {/* ------------------------ Popups ------------------------ */}
        <AnimatePresence>
          {showThemeSelector && (
            <ChoixThemePopup
              onClose={(confirmed) => {
                setShowThemeSelector(false);
                if (confirmed) {
                  setShowCreate(true);
                  console.log("Thème choisi :", selectedTheme);
                }
              }}
              onSelectTheme={(themeName) => setSelectedTheme(themeName)}
              selectedTheme={selectedTheme}
            />
          )}
        </AnimatePresence>


      {/* Popup Automatisation */}
      <AnimatePresence>
        {showAutomatisation && (
          <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="relative bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-5xl overflow-y-auto max-h-[90vh]">
              <button onClick={() => setShowAutomatisation(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
                ✖
              </button>
              <Automatisation />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup Formation */}
      <AnimatePresence>
        {showFormation && (
          <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="relative bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-4xl overflow-y-auto max-h-[90vh]">
              <button onClick={() => setShowFormation(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
                ✖
              </button>
              <Formation />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

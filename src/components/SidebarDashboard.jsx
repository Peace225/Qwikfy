import { PlusCircle, Package, Home, LogOut, Store, SunMoon, ChevronLeft } from "lucide-react";

export default function SidebarDashboard({ user, darkMode, setDarkMode, handleLogout, navigate, setShowCreate, setShowAddProduit, menuOpen, setMenuOpen }) {
  return (
    <>
      {/* Overlay Mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      <aside
        className={`
          fixed z-40 inset-y-0 left-0 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:block w-64 bg-white dark:bg-gray-800 p-6 border-r shadow-sm transition-transform duration-300 ease-in-out
        `}
        aria-label="Menu latéral"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl text-green-600 font-bold">Qwikfy</h1>

          {/* Bouton Réduire pour mobile uniquement */}
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
    </>
  );
}

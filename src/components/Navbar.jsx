import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  UserRound,
  ShoppingCart,
  HelpCircle,
  Home,
  LayoutDashboard,
  Store,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CategorySidebar from "./CategorySidebar";
import PopupPanier from "./PopupPanier"; // adapte le chemin selon ton projet




const categories = [
  "Toutes", "Téléphones", "TV & HIGH TECH", "Informatique",
  "Maison, cuisine & bureau", "Électroménager", "Vêtements & Chaussures",
  "Beauté & Santé", "Jeux vidéos & Consoles", "Bricolage", "Sports & Loisirs",
  "Bébé & Jouets", "Autres catégories"
];
const cartItems = [
  { nom: "Produit 1", prix: 8500, image: "https://via.placeholder.com/80" },
  { nom: "Produit 2", prix: 12900, image: "https://via.placeholder.com/80" },
];



export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false); // 🔥 déplacer ici
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(3); // 🔥 Exemple : il y a 3 articles
  const [isPopupPanierOpen, setIsPopupPanierOpen] = useState(false);



  useEffect(() => {
    let timeoutId;
  
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 10);
      }, 100); // attend 100ms max avant de recalculer
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  


  return (
    <header className={`${isScrolled ? "bg-white/90 shadow-md backdrop-blur-md" : "bg-white"} border-b sticky top-0 z-50 transition-all`}>
      {/* Top mobile navbar */}
      <div className="flex items-center justify-between px-4 py-2 md:hidden">
        {/* Menu burger */}
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
        </button>

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-900 flex items-center gap-1">
          <ShoppingCart className="w-6 h-6 text-green-500" />
          QWIKFY
        </Link>

        {/* Icônes à droite */}
        <div className="flex gap-4 items-center">
          <Link to="/login">
            <UserRound className="w-5 h-5 text-gray-700" />
          </Link>
          <Link to="/panier">
            <ShoppingCart className="w-5 h-5 text-gray-700" />
          </Link>
        </div>
      </div>

      {/* Barre de recherche mobile */}
      <div className="md:hidden px-4 pb-3">
      <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim()) {
              navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
              setMenuOpen(false); // ferme le menu burger après recherche
            }
          }}
          className="flex items-center border rounded-full px-3 py-2 shadow-sm"
       >
      <Search className="w-5 h-5 text-gray-400 mr-2" />
      <input
        type="text"
        placeholder="Cherchez sur Qwikfy"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-grow outline-none text-sm"
      />
      </form>

      </div>

      {/* Menu mobile déroulant */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white px-4 pb-4 space-y-3 text-sm border-t"
          >
            <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-700 hover:text-green-600">
              <Home className="w-4 h-4" /> Accueil
            </Link>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-700 hover:text-green-600">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
            
            <Link to="/login" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-700 hover:text-green-600">
              <UserRound className="w-4 h-4" /> Se connecter
            </Link>

            <button
            onClick={() => setIsPopupPanierOpen(true)}
            className="relative flex items-center gap-1 text-gray-700 hover:text-green-600"
            >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
            Panier
            </button>

            {/* Menu des catégories mobile */}
            
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop version */}
      <div className="hidden md:flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-green-500" />
          QWIKFY
        </Link>

        {/* Barre de recherche desktop */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim()) {
              navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            }
          }}
          className="flex flex-grow max-w-xl ml-4"
        >
            <div className="flex w-full border rounded-md overflow-hidden shadow-sm">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow px-4 py-2 outline-none"
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2"
              >
                Rechercher
              </button>
            </div>
        </form>


        {/* Liens avec icônes */}
        <div className="flex gap-5 text-sm ml-4 items-center">
          <Link to="/" className="flex items-center gap-1 text-gray-700 hover:text-green-600">
            <Home className="w-4 h-4" /> Accueil
          </Link>
          <Link to="/dashboard" className="flex items-center gap-1 text-gray-700 hover:text-green-600">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          
          <Link to="/login" className="flex items-center gap-1 text-gray-700 hover:text-green-600">
            <UserRound className="w-4 h-4" /> Se connecter
          </Link>
          <button
            onClick={() => setIsPopupPanierOpen(true)}
            className="relative flex items-center gap-1 text-gray-700 hover:text-green-600"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
            Panier
          </button>



        </div>
      </div>
      <PopupPanier
        isOpen={isPopupPanierOpen}
        onClose={() => setIsPopupPanierOpen(false)}
        cartItems={cartItems}
      />

    </header>
    
  );
}

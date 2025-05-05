import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, UserRound, ShoppingCart, Home, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CategorySidebar from "./CategorySidebar";
import PopupPanier from "./PopupPanier";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import ToastNotification from "./ToastNotification"; // 🔥 Ajouté

const categories = [
  "Toutes", "Téléphones", "TV & HIGH TECH", "Informatique",
  "Maison, cuisine & bureau", "Électroménager", "Vêtements & Chaussures",
  "Beauté & Santé", "Jeux vidéos & Consoles", "Bricolage", "Sports & Loisirs",
  "Bébé & Jouets", "Autres catégories"
];

export default function Navbar() {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPopupPanierOpen, setIsPopupPanierOpen] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 10);
      }, 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setMenuOpen(false);
    }
  };

  const handleOpenCart = () => {
    setIsPopupPanierOpen(true);
    setAnimateCart(true);
    setTimeout(() => setAnimateCart(false), 300); // Animation rapide
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Toast visible 3s
  };

  return (
    <header className={`${isScrolled ? "bg-white/90 shadow-md backdrop-blur-md" : "bg-white"} border-b sticky top-0 z-50 transition-all`}>
      
      {/* Mobile Navbar */}
      <nav className="flex items-center justify-between px-4 py-2 md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
        </button>
        <Link to="/" className="text-xl font-bold text-gray-900 flex items-center gap-1">
        <img src="/image/logo-qwikfy.png" alt="logo" className="w-9 h-9 object-contain" />
          QWIKFY
        </Link>
        <div className="flex gap-4 items-center">
          <Link to={user ? "/dashboard" : "/login"}>
            <UserRound className="w-5 h-5 text-gray-700" />
          </Link>
          <button onClick={handleOpenCart}>
            <div className="relative">
              <ShoppingCart className={`w-5 h-5 text-gray-700 ${animateCart ? "animate-bounce" : ""}`} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </nav>

      {/* Barre de recherche mobile */}
      <section className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="flex items-center border rounded-full px-3 py-2 shadow-sm">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Cherchez sur Qwikfy"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow outline-none text-sm"
          />
        </form>
      </section>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white px-4 pb-4 space-y-3 text-sm border-t"
          >
            <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
              <Home className="w-4 h-4" /> Accueil
            </Link>
            {user && (
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
            )}
            <Link to={user ? "/dashboard" : "/login"} onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
              <UserRound className="w-4 h-4" /> {user ? "Mon compte" : "Se connecter"}
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Desktop Navbar */}
      <nav className="hidden md:flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <img src="/image/logo-qwikfy.png" alt="logo" className="w-9 h-9 object-contain" />
          QWIKFY
        </Link>
        <form onSubmit={handleSearch} className="flex flex-grow max-w-xl ml-4">
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
        <div className="flex gap-5 text-sm ml-4 items-center">
          <Link to="/" className="flex items-center gap-1">
            <Home className="w-4 h-4" /> Accueil
          </Link>
          {user && (
            <Link to="/dashboard" className="flex items-center gap-1">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
          )}
          <Link to={user ? "/dashboard" : "/login"} className="flex items-center gap-1">
            <UserRound className="w-4 h-4" /> {user ? "Mon compte" : "Se connecter"}
          </Link>
          <button onClick={handleOpenCart}>
            <div className="relative">
              <ShoppingCart className={`w-5 h-5 ${animateCart ? "animate-bounce" : ""}`} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </nav>

      {/* Popup Panier */}
      <PopupPanier
        isOpen={isPopupPanierOpen}
        onClose={() => setIsPopupPanierOpen(false)}
      />

      {/* Toast Notification */}
      <ToastNotification message="Produit ajouté au panier !" isVisible={showToast} />
    </header>
  );
}

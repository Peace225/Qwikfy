import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Boutique from "./pages/Boutique";
import Accueil from "./pages/Accueil";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { CategorieProvider } from "./context/CategorieContext";
import { CartProvider } from "./context/CartContext"; // 🔥 Importe ton CartProvider
import CategorySidebar from "./components/CategorySidebar";
import Search from "./pages/Search";
import AdminAjouterProduit from "./pages/AdminAjouterProduit";
import PaymentSuccess from "./pages/PaymentSuccess";
import Checkout from "./pages/Checkout";
import Automatisation from "./pages/Automatisation"; // 🔥 Importe la page en haut
import MultiCanaux from "./pages/MultiCanaux"; // 🔥

export default function App() {
  const categories = [
    "Toutes",
    "Téléphones",
    "TV & HIGH TECH",
    "Informatique",
    "Maison, cuisine & bureau",
    "Électroménager",
    "Vêtements & Chaussures",
    "Beauté & Santé",
    "Jeux vidéos & Consoles",
    "Bricolage",
    "Sports & Loisirs",
    "Bébé & Jouets",
    "Autres catégories",
  ];

  return (
    <CartProvider> {/* 🔥 Tout ton projet est enveloppé par CartProvider */}
      <CategorieProvider>
        <Router>
          <Navbar />
          <CategorySidebar categories={categories} mode="horizontal" />

          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<Search />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminAjouterProduit />
                </ProtectedRoute>
              } 
            />
            <Route
              path="/boutique"
              element={
                <ProtectedRoute>
                  <Boutique />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/automatisation" 
              element={
                <ProtectedRoute>
                  <Automatisation />
                </ProtectedRoute>
              } 
            />
            <Route
              path="/multi-canaux"
              element={
                <ProtectedRoute>
                  <MultiCanaux />
                </ProtectedRoute>
              }
            />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/checkout" element={<Checkout />} />

            <Route
              path="*"
              element={
                <div className="flex items-center justify-center h-screen text-center text-gray-600">
                  <div>
                    <h1 className="text-3xl font-bold">404 - Page introuvable</h1>
                    <p className="mt-2">
                      La page demandée n'existe pas. <br />
                      <a href="/" className="text-blue-600 underline">Retour à l'accueil</a>
                    </p>
                  </div>
                </div>
              }
            />
          </Routes>
        </Router>
      </CategorieProvider>
    </CartProvider>
  );
}

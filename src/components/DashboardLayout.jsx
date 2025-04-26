import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { LayoutDashboard, Store, PlusCircle, LogOut, Menu } from "lucide-react";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="md:w-64 w-full md:h-auto h-auto bg-white border-r shadow-sm p-4 md:p-6 space-y-6">
        <div className="flex justify-between items-center md:block">
          <h1 className="text-2xl font-bold text-blue-600">Qwikfy</h1>
          <button
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Ouvrir/fermer le menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {(mobileMenuOpen || window.innerWidth >= 768) && (
          <nav className="space-y-3 text-sm mt-4 md:mt-0" aria-label="Menu principal">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
            >
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </Link>
            <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
              <PlusCircle className="w-5 h-5" /> Créer une boutique
            </button>
            <Link
              to="/boutique"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
            >
              <Store className="w-5 h-5" /> Mes boutiques
            </Link>
          </nav>
        )}
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-4 md:p-6" role="main">
        {/* Header utilisateur */}
        <header className="flex justify-end items-center mb-6" aria-label="Barre utilisateur">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:underline flex items-center gap-1"
              aria-label="Se déconnecter"
            >
              <LogOut className="w-4 h-4" /> Déconnexion
            </button>
          </div>
        </header>

        {/* Contenu injecté */}
        <section>{children}</section>
      </main>
    </div>
  );
}

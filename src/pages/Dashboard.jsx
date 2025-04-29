import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth, db, storage } from "../utils/firebaseConfig";
import { signOut, updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import dayjs from "dayjs";

// Components
import SidebarDashboard from "../components/SidebarDashboard";
import HeaderDashboard from "../components/HeaderDashboard";
import BoutiqueChart from "../components/BoutiqueChart";
import ListeBoutiques from "../components/ListeBoutiques";
import ListeProduitsUtilisateur from "../components/ListeProduitsUtilisateur";
import CreateBoutiqueModal from "../components/CreateBoutiqueModal";
import EditBoutiqueModal from "../components/EditBoutiqueModal";
import SuccessToast from "../components/SuccessToast";
import AdminAjouterProduit from "../pages/AdminAjouterProduit";
import AdvancedKpi from "../components/AdvancedKpi";
import GestionMultiCanaux from "../components/GestionMultiCanaux";
import ListeVentes from "../components/ListeVentes";

import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [boutiquesCount, setBoutiquesCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [boutiquesList, setBoutiquesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [showAddProduit, setShowAddProduit] = useState(false);
  const [editingBoutique, setEditingBoutique] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const [selectedTheme, setSelectedTheme] = useState(null); // 🔥 nouveau

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [boutiqueSnap, userSnap] = await Promise.all([
        getDocs(query(collection(db, "boutiques"), where("userId", "==", user.uid))),
        getDocs(collection(db, "users")),
      ]);

      const boutiques = boutiqueSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setBoutiquesCount(boutiqueSnap.size);
      setBoutiquesList(boutiques);
      setUsersCount(userSnap.size);

      const countByMonth = {};
      boutiques.forEach(b => {
        const date = b.createdAt?.toDate?.() || new Date();
        const mois = dayjs(date).format("MMM YYYY");
        countByMonth[mois] = (countByMonth[mois] || 0) + 1;
      });

      const chartArray = Object.entries(countByMonth)
        .map(([mois, count]) => ({ mois, count }))
        .sort((a, b) => dayjs(a.mois, "MMM YYYY").unix() - dayjs(b.mois, "MMM YYYY").unix());

      setChartData(chartArray);
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    try {
      const storageRef = ref(storage, `avatars/${user.uid}_${Date.now()}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);

      await updateProfile(auth.currentUser, { photoURL });
      await auth.currentUser.reload();
      setUser({ ...auth.currentUser });

      setSuccessMessage("✅ Photo de profil mise à jour !");
    } catch (error) {
      console.error("Erreur upload photo:", error);
      alert("Erreur lors de la mise à jour de la photo de profil.");
    }
  };

  const handleDeleteBoutique = async (boutique) => {
    if (!confirm(`Supprimer la boutique "${boutique.nom}" ?`)) return;

    try {
      await deleteDoc(doc(db, "boutiques", boutique.id));
      setSuccessMessage("🗑️ Boutique supprimée avec succès !");
      fetchData();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Erreur lors de la suppression de la boutique.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const filteredBoutiques = boutiquesList.filter(b =>
    b.nom?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        <svg className="animate-spin h-8 w-8 text-blue-500" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard | Qwikfy</title>
        <meta name="description" content="Gérez vos boutiques, suivez vos ventes et développez votre activité e-commerce avec Qwikfy." />
        <meta name="keywords" content="Qwikfy, e-commerce, tableau de bord, boutique en ligne, gestion de produit" />
        <meta name="author" content="Qwikfy" />
        <link rel="canonical" href="https://www.qwikfy.com/dashboard" />
      </Helmet>

      <main className={`flex min-h-screen ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100"}`}>
        <SidebarDashboard
          user={user}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          handleLogout={handleLogout}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          setShowCreate={setShowCreate}
          setShowAddProduit={setShowAddProduit}
          navigate={navigate}
          setSelectedTheme={setSelectedTheme} // 🔥
          selectedTheme={selectedTheme} // 🔥
        />

        <section className="flex-1 px-4 py-6 md:p-8">
          <HeaderDashboard
            user={user}
            handleUploadPhoto={handleUploadPhoto}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          {/* KPIs principaux */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
            <KpiCard title="Nombre de vos boutiques" value={boutiquesCount} color="blue" />
            <KpiCard title="Utilisateurs enregistrés" value={usersCount} color="green" />
          </div>

          {/* Analyse avancée & gestion multi-canaux */}
          <AdvancedKpi />
          <GestionMultiCanaux />

          {/* Graphique et liste */}
          <BoutiqueChart data={chartData} />
          <ListeBoutiques boutiques={filteredBoutiques} onDelete={handleDeleteBoutique} onEdit={setEditingBoutique} />
          <ListeProduitsUtilisateur />
          <ListeVentes />

          {/* Modales */}
          <AnimatePresence>
            {showAddProduit && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur">
                <AdminAjouterProduit
                  onClose={() => setShowAddProduit(false)}
                  onCreated={() => {
                    setShowAddProduit(false);
                    setSuccessMessage("✅ Produit ajouté avec succès !");
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {showCreate && (
            <CreateBoutiqueModal
              userId={user.uid}
              theme={selectedTheme} // 🔥 passe le thème ici
              onClose={() => setShowCreate(false)}
              onCreated={(message) => {
                setShowCreate(false);
                setToastMessage(message);
                setToastType("success");
                fetchData();
              }}
            />
          )}

          {editingBoutique && (
            <EditBoutiqueModal
              boutique={editingBoutique}
              onClose={() => setEditingBoutique(null)}
              onUpdated={() => {
                setEditingBoutique(null);
                setSuccessMessage("✏️ Boutique modifiée avec succès !");
                fetchData();
              }}
            />
          )}

          {successMessage && (
            <SuccessToast message={successMessage} onClose={() => setSuccessMessage("")} />
          )}
        </section>
      </main>
    </>
  );
}

// 🔥 Composant KPI simple
function KpiCard({ title, value, color }) {
  return (
    <div className="bg-white dark:bg-gray-800 border p-4 rounded shadow">
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</h3>
      <p className={`text-3xl font-bold text-${color}-600 mt-1`}>{value}</p>
    </div>
  );
}

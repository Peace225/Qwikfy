import { useState } from "react";
import { PlusCircle, Loader } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ToastNotification from "../components/ToastNotification"; // 🔥
import TimelineLivraison from "../components/TimelineLivraison"; // 🔥

export default function Automatisation() {
  const [commandes, setCommandes] = useState([
    { id: 1, produit: "Montre connectée", fournisseur: "AliExpress", statut: "En cours", prix: 15000, date: "2025-04-30", tracking: { step: 2, number: "TRK12345" } },
    { id: 2, produit: "Chaussures sport", fournisseur: "CJdropshipping", statut: "Livrée", prix: 22000, date: "2025-04-28", tracking: { step: 4, number: "TRK67890" } },
  ]);
  const [loading, setLoading] = useState(false);
  const [filterStatut, setFilterStatut] = useState("Tous");
  const [showToast, setShowToast] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleImportCommande = async () => {
    setLoading(true);
    setProgress(0);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 20;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);

        const nouvelleCommande = {
          id: commandes.length + 1,
          produit: "Casque Bluetooth",
          fournisseur: "AliExpress",
          statut: "En attente",
          prix: 18000,
          date: new Date().toISOString().split('T')[0],
          tracking: { step: 1, number: `TRK${Math.floor(Math.random() * 100000)}` },
        };
        setCommandes(prev => [...prev, nouvelleCommande]);
        setLoading(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    }, 400);
  };

  const commandesFiltrees = commandes.filter(cmd => {
    if (filterStatut === "Tous") return true;
    return cmd.statut === filterStatut;
  });

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Automatisation des Commandes</h1>
        <p className="text-center text-gray-500 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          Gérez vos commandes dropshipping avec AliExpress, CJdropshipping et synchronisez vos processus automatiquement.
        </p>

        {/* Barre de progression */}
        {loading && (
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-6">
            <div
              className="bg-green-600 h-3 rounded-full transition-all duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* Filtres par Statut */}
        <div className="flex justify-center mb-6 gap-4 flex-wrap">
          {["Tous", "Livrée", "En cours", "En attente"].map((statut) => (
            <button
              key={statut}
              onClick={() => setFilterStatut(statut)}
              className={`px-4 py-2 rounded-full text-sm ${
                filterStatut === statut ? "bg-green-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {statut}
            </button>
          ))}
        </div>

        {/* Bouton Importer */}
        <div className="flex justify-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleImportCommande}
            disabled={loading}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md shadow disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Importation...
              </>
            ) : (
              <>
                <PlusCircle size={20} /> Importer une commande
              </>
            )}
          </motion.button>
        </div>

        {/* Tableau des Commandes */}
        <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Produit</th>
                <th className="px-4 py-2 text-left">Fournisseur</th>
                <th className="px-4 py-2 text-left">Statut</th>
                <th className="px-4 py-2 text-left">Prix</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {commandesFiltrees.map((cmd) => (
                <tr key={cmd.id} className="border-t dark:border-gray-700">
                  <td className="px-4 py-3">
                    {cmd.produit}
                    {cmd.tracking && (
                      <div className="text-xs text-gray-400 mt-1">
                        Suivi: {cmd.tracking.number} (étape {cmd.tracking.step})
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">{cmd.fournisseur}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${cmd.statut === "Livrée" ? "bg-green-100 text-green-600" :
                        cmd.statut === "En cours" ? "bg-yellow-100 text-yellow-600" :
                        "bg-gray-100 text-gray-600"}`}>
                      {cmd.statut}
                    </span>
                  </td>
                  <td className="px-4 py-3">{cmd.prix.toLocaleString()} FCFA</td>
                  <td className="px-4 py-3">{cmd.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Timeline Livraison pour la dernière commande */}
        {commandes.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4 text-center">Suivi de la dernière commande</h2>
            <TimelineLivraison currentStep={commandes[commandes.length - 1]?.tracking?.step || 1} />
          </div>
        )}
      </div>

      {/* Toast Notification */}
      <ToastNotification message="✅ Commande importée avec succès !" isVisible={showToast} />
    </div>
  );
}

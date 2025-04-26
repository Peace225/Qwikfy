import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { createBoutique, getBoutiquesByUser, deleteBoutique } from "../services/boutiqueService";
import BoutiqueForm from "../components/BoutiqueForm";
import { Helmet } from "react-helmet";

export default function Boutique() {
  const { user } = useAuth();
  const [boutiques, setBoutiques] = useState([]);

  const fetchBoutiques = async () => {
    if (user) {
      const data = await getBoutiquesByUser(user.uid);
      setBoutiques(data);
    }
  };

  useEffect(() => {
    fetchBoutiques();
  }, [user]);

  const handleCreate = async (data) => {
    await createBoutique({ ...data, userId: user.uid });
    fetchBoutiques();
  };

  const handleDelete = async (id) => {
    await deleteBoutique(id);
    fetchBoutiques();
  };

  return (
    <div className="p-6">
      <Helmet>
        <title>Mes Boutiques - Qwikfy</title>
        <meta name="description" content="Créez et gérez vos boutiques e-commerce en quelques clics." />
      </Helmet>

      <h1 className="text-xl font-bold mb-4">Créer une nouvelle boutique</h1>
      <BoutiqueForm onSubmit={handleCreate} />

      <h2 className="mt-10 mb-2 text-lg font-semibold">Mes Boutiques</h2>
      <ul className="space-y-2">
        {boutiques.map((b) => (
          <li key={b.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <h3 className="font-bold">{b.nom}</h3>
              <p className="text-sm text-gray-600">{b.description}</p>
            </div>
            <button onClick={() => handleDelete(b.id)} className="text-red-600 text-sm">
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

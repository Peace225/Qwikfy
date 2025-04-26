import { useState } from "react";
import { db, storage } from "../utils/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../context/AuthContext";

export default function AdminAjouterProduit({ onClose, onCreated }) {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    prix: "",
    categorie: "",
    image: null,
  });
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setSuccess(null);

    try {
      let imageUrl = "";

      if (formData.image) {
        const imageRef = ref(storage, `produits/${Date.now()}_${formData.image.name}`);
        await uploadBytes(imageRef, formData.image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "produits"), {
        nom: formData.nom,
        description: formData.description,
        prix: Number(formData.prix),
        categorie: formData.categorie,
        image: imageUrl,
        createdAt: serverTimestamp(),
        uid: user?.uid || null,
      });

      setSuccess("✅ Produit ajouté avec succès");
      setFormData({ nom: "", description: "", prix: "", categorie: "", image: null });

      if (onCreated) onCreated();
    } catch (error) {
      console.error("Erreur ajout produit :", error);
      setSuccess("❌ Erreur lors de l'ajout");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-[90vw] max-w-md md:max-w-lg lg:max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Ajouter un produit</h1>
        <button
          onClick={() => {
            if (confirm("Voulez-vous vraiment fermer ce formulaire ?")) {
              onClose();
            }
          }}
          className="text-sm text-gray-500 hover:text-red-500"
          aria-label="Fermer"
        >
          ✖️
        </button>
      </div>

      {success && (
        <p className="mb-4 text-sm text-green-600 dark:text-green-400">{success}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          placeholder="Nom du produit"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          name="prix"
          type="number"
          value={formData.prix}
          onChange={handleChange}
          placeholder="Prix en FCFA"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          name="categorie"
          value={formData.categorie}
          onChange={handleChange}
          placeholder="Catégorie"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleChange}
          className="w-full text-sm"
        />

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {uploading ? "Ajout en cours..." : "Ajouter le produit"}
        </button>
      </form>
    </div>
  );
}

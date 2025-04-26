import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../utils/firebaseConfig";
import { v4 as uuidv4 } from "uuid";

export default function CreateBoutiqueModal({ userId, onClose, onCreated }) {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let logoUrl = "";

    try {
      if (logoFile) {
        const storageRef = ref(storage, `logos/${uuidv4()}-${logoFile.name}`);
        const snapshot = await uploadBytes(storageRef, logoFile);
        logoUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, "boutiques"), {
        nom,
        description,
        userId,
        logoUrl, // ✅ image stockée dans Firestore
        createdAt: serverTimestamp(),
      });

      onCreated();
      onClose();
    } catch (err) {
      console.error("Erreur :", err);
      alert("Erreur lors de la création de la boutique.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow max-w-md w-full space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-800">Créer une boutique</h2>

        <input
          type="text"
          placeholder="Nom de la boutique"
          className="w-full border rounded p-2"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full border rounded p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogoFile(e.target.files[0])}
          className="w-full"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-600"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? "Création..." : "Créer"}
          </button>
        </div>
      </form>
    </div>
  );
}

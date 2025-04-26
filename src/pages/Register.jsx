import { saveUserToFirestore } from "../services/userService";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import AlertMessage from "../components/AlertMessage";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // 🔐 Enregistrement Firestore
      await saveUserToFirestore(user);
  
      navigate("/dashboard");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setAlert("Cet email est déjà utilisé.");
      } else if (error.code === "auth/invalid-email") {
        setAlert("Adresse email invalide.");
      } else if (error.code === "auth/weak-password") {
        setAlert("Mot de passe trop faible (minimum 6 caractères).");
      } else {
        setAlert("Erreur : " + error.message);
      }
    }
  };
  

  return (
    <>
      <Helmet>
        <title>Inscription - Qwikfy</title>
        <meta
          name="description"
          content="Créez votre compte Qwikfy pour lancer votre activité e-commerce dropshipping tout-en-un."
        />
      </Helmet>

      <div className="p-6">
        <AlertMessage message={alert} onClose={() => setAlert("")} />

        <form
          onSubmit={handleRegister}
          className="max-w-md mx-auto mt-20 bg-white shadow-lg p-8 rounded-lg space-y-4"
          aria-label="Formulaire d'inscription"
        >
          <h1 className="text-2xl font-bold text-center text-gray-800">Créer un compte</h1>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Adresse Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 border border-gray-300 w-full p-2 rounded"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              className="mt-1 border border-gray-300 w-full p-2 rounded"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-2 px-4 rounded"
          >
            S'inscrire
          </button>

          <p className="text-center text-sm mt-4 text-gray-600">
            Déjà inscrit ?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Se connecter ici
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

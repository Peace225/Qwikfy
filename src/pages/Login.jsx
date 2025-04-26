import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import AlertMessage from "../components/AlertMessage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setAlert("Adresse email invalide.");
      } else if (error.code === "auth/user-not-found") {
        setAlert("Utilisateur introuvable.");
      } else if (error.code === "auth/wrong-password") {
        setAlert("Mot de passe incorrect.");
      } else {
        setAlert("Erreur : " + error.message);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Connexion - Qwikfy</title>
        <meta
          name="description"
          content="Connectez-vous à votre compte Qwikfy pour accéder à votre tableau de bord e-commerce dropshipping."
        />
      </Helmet>

      <div className="p-6">
        <AlertMessage message={alert} onClose={() => setAlert("")} />

        <form
          onSubmit={handleLogin}
          className="max-w-md mx-auto mt-20 bg-white shadow-lg p-8 rounded-lg space-y-4"
          aria-label="Formulaire de connexion"
        >
          <h1 className="text-2xl font-bold text-center text-gray-800">Connexion</h1>

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
              autoComplete="current-password"
              required
              className="mt-1 border border-gray-300 w-full p-2 rounded"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 px-4 rounded"
          >
            Se connecter
          </button>

          <p className="text-center text-sm mt-4 text-gray-600">
            Pas encore de compte ?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              S'inscrire ici
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

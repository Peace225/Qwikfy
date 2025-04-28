import { useState } from "react";
import { motion } from "framer-motion";

const PLATFORMS_DEFAULT = [
  {
    name: "Shopify",
    url: "https://www.shopify.com/",
    logo: "https://cdn.shopify.com/assets/images/logos/shopify-bag.png",
  },
  {
    name: "WooCommerce",
    url: "https://woocommerce.com/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c5/WooCommerce_logo.svg",
  },
  {
    name: "Amazon",
    url: "https://sell.amazon.com/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
];

export default function GestionMultiCanaux() {
  const [platforms, setPlatforms] = useState(PLATFORMS_DEFAULT);
  const [redirecting, setRedirecting] = useState("");

  const openLink = (url, platform) => {
    setRedirecting(platform);
    setTimeout(() => {
      window.open(url, "_blank");
      setRedirecting("");
    }, 1000);
  };

  const handleAddPlatform = () => {
    const newPlatform = {
      name: "Etsy",
      url: "https://www.etsy.com/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/61/Etsy_logo.svg",
    };
    setPlatforms(prev => [...prev, newPlatform]);
  };

  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl mb-8 relative">
      <h2 className="text-2xl font-bold text-green-600 mb-8 text-center">Gestion Multi-Canaux</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {platforms.map((platform) => (
          <ServiceCard
            key={platform.name}
            {...platform}
            loading={redirecting === platform.name}
            onClick={openLink}
          />
        ))}
      </div>

      {/* Bouton ajouter + bouton gérer tout */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddPlatform}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-all duration-300 shadow-md"
        >
          + Ajouter une nouvelle plateforme
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = "/multi-canaux"}
          className="px-6 py-3 border-2 border-green-600 text-green-600 font-semibold rounded-full hover:bg-green-50 transition-all duration-300 shadow-md"
        >
          Gérer toutes mes plateformes
        </motion.button>
      </div>

      <p className="text-xs text-gray-400 mt-8 text-center italic">
        (Bientôt : Synchronisation automatique des ventes et inventaires 🔄)
      </p>
    </section>
  );
}

function ServiceCard({ name, url, logo, loading, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
    >
      <img
        src={logo}
        alt={`${name} logo`}
        className="h-16 w-16 object-contain mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{name}</h3>
      <button
        onClick={() => onClick(url, name)}
        className="mt-auto flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-full transition-all duration-300"
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        ) : (
          <span>Connecter</span>
        )}
      </button>
    </motion.div>
  );
}

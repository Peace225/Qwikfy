import { useState } from "react";

export default function GestionMultiCanaux() {
  const [redirecting, setRedirecting] = useState("");

  const openLink = (url, platform) => {
    setRedirecting(platform);
    setTimeout(() => {
      window.open(url, "_blank");
      setRedirecting("");
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-8 relative">
      <h2 className="text-lg font-semibold text-green-600 mb-6">Gestion Multi-Canaux</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ServiceButton
          name="Shopify"
          url="https://www.shopify.com/"
          logo="https://cdn.shopify.com/assets/images/logos/shopify-bag.png"
          loading={redirecting === "Shopify"}
          onClick={openLink}
        />

        <ServiceButton
        name="WooCommerce"
        url="https://woocommerce.com/"
        logo="https://upload.wikimedia.org/wikipedia/commons/c/c5/WooCommerce_logo.svg"
        loading={redirecting === "WooCommerce"}
        onClick={openLink}
        />


        <ServiceButton
          name="Amazon"
          url="https://sell.amazon.com/"
          logo="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          loading={redirecting === "Amazon"}
          onClick={openLink}
        />
      </div>

      <p className="text-xs text-gray-400 mt-6 text-center">
        (Bientôt : Synchronisation automatique des ventes et inventaires)
      </p>
    </div>
  );
}

// 🔥 Composant réutilisable pour chaque plateforme
function ServiceButton({ name, url, logo, loading, onClick }) {
  return (
    <button
      onClick={() => onClick(url, name)}
      className="flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
    >
      <img src={logo} alt={`${name} logo`} className="h-6 w-6 object-contain" />
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-gray-600 dark:text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
      ) : (
        <span>Connecter {name}</span>
      )}
    </button>
  );
}

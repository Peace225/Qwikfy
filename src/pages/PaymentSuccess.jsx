import { useEffect } from "react";
import axios from "axios";

export default function PaymentSuccess() {
  useEffect(() => {
    envoyerCommande();
  }, []);

  const envoyerCommande = async () => {
    try {
      const response = await axios.post("/api/create-order", {
        customerName: "Brad Serguei",
        address: {
          country: "France",
          state: "Île-de-France",
          city: "Paris",
          addressLine: "12 Rue de la Paix",
          zip: "75002",
          phone: "+33123456789",
        },
        products: [
          {
            variantId: "cj-variant-id",
            quantity: 1,
          },
        ],
      });
      console.log("✅ Commande envoyée à CJ :", response.data);
    } catch (error) {
      console.error("🚨 Erreur d'envoi de commande :", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Merci pour votre commande !</h1>
      <p className="text-gray-600 mb-8">Nous traitons votre commande. Vous recevrez un email de confirmation sous peu.</p>
      <a href="/" className="text-green-600 hover:underline">Retour à l'accueil</a>
    </div>
  );
}

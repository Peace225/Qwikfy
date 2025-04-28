import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.prix * item.quantity, 0);

  const handlePaymentSuccess = () => {
    const commandeId = "CMD-" + Date.now();

    // Simule la sauvegarde dans Firebase ici plus tard
    navigate(`/payment-success?commandeId=${commandeId}&total=${total}`);
    clearCart(); // 🔥 Vide le panier après paiement
  };

  if (cartItems.length === 0) {
    return <div className="p-8 text-center text-gray-600">Votre panier est vide.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Votre Panier</h1>
      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <div key={index} className="flex justify-between border-b pb-2">
            <div>
              <h2 className="font-semibold">{item.nom}</h2>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
            <p className="text-green-600 font-bold">{item.prix.toLocaleString()} FCFA</p>
          </div>
        ))}
      </div>

      <div className="text-right mt-6">
        <h2 className="text-xl font-bold">Total : {total.toLocaleString()} FCFA</h2>
        <button
          onClick={handlePaymentSuccess}
          className="mt-4 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Payer maintenant
        </button>
      </div>
    </div>
  );
}

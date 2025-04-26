// src/components/EncartsDroite.jsx
import { HelpCircle, ShoppingCart, Store } from "lucide-react";

export default function EncartsDroite() {
  const encarts = [
    {
      icon: <HelpCircle className="w-5 h-5 text-orange-500" />,
      title: "Centre d'assistance",
      desc: "Guide du service client",
    },
    {
      icon: <ShoppingCart className="w-5 h-5 text-orange-500" />,
      title: "Retour Facile",
      desc: "Remboursement rapide",
    },
    {
      icon: <Store className="w-5 h-5 text-orange-500" />,
      title: "Vendez sur Qwikfy",
      desc: "Ouvrez votre shop ici",
    },
  ];

  return (
    <div className="space-y-4">
      {encarts.map((e, i) => (
        <div key={i} className="bg-white p-4 rounded shadow-sm flex items-start gap-3">
          {e.icon}
          <div>
            <h4 className="text-sm font-semibold text-gray-800">{e.title}</h4>
            <p className="text-xs text-gray-500">{e.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

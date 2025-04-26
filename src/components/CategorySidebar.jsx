import React, { useContext } from "react";
import {
  Smartphone, Tv2, Laptop, Home, WashingMachine, Shirt, Heart,
  Gamepad2, Wrench, Dumbbell, Baby, PackageSearch
} from "lucide-react";
import { CategorieContext } from "../context/CategorieContext";

// 🧩 Map des icônes par catégorie
const iconsMap = {
  Téléphones: Smartphone,
  "TV & HIGH TECH": Tv2,
  Informatique: Laptop,
  "Maison, cuisine & bureau": Home,
  Électroménager: WashingMachine,
  "Vêtements & Chaussures": Shirt,
  "Beauté & Santé": Heart,
  "Jeux vidéos & Consoles": Gamepad2,
  Bricolage: Wrench,
  "Sports & Loisirs": Dumbbell,
  "Bébé & Jouets": Baby,
  "Autres catégories": PackageSearch,
  Toutes: PackageSearch,
};

export default function CategorySidebar({ categories, mode = "sidebar", isMobile = false }) {
  const { categorieActive, setCategorieActive } = useContext(CategorieContext);

  const renderCategory = (cat, i) => {
    const Icon = iconsMap[cat] || PackageSearch;
    const active = categorieActive === cat;

    return (
      <button
        key={i}
        onClick={() => setCategorieActive(cat)}
        className={`flex items-center gap-2 text-sm transition duration-200 ease-in-out
          ${mode === "horizontal" ? "px-3 py-2 whitespace-nowrap" : "w-full p-2 rounded text-left"}
          ${active ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}
        `}
      >
        <Icon className="w-4 h-4 flex-shrink-0" /> {cat}
      </button>
    );
  };

  if (mode === "horizontal") {
    return (
      <nav className="md:hidden bg-gray-50 border-t border-b px-4 py-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="flex gap-4">
          {categories.map(renderCategory)}
        </div>
      </nav>
    );
  }
  

  // Version sidebar verticale
  return (
    <aside
      className={`bg-white rounded shadow ${isMobile ? "block md:hidden" : "hidden md:block"} h-fit sticky top-24 max-h-[70vh] overflow-y-auto`}
      aria-label="Navigation des catégories de produits"
    >
      <div className="sticky top-0 bg-white z-10 pt-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4 px-2">Catégories</h2>
        {renderCategory("Toutes", -1)}
      </div>
      <ul className="space-y-3 text-sm mt-4 px-2 pb-4">
        {categories.filter(cat => cat !== "Toutes").map((cat, i) => (
          <li key={i}>{renderCategory(cat, i)}</li>
        ))}
      </ul>
    </aside>
  );
}

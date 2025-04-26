import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import EncartsDroite from "../components/EncartsDroite";
import CategorySidebar from "../components/CategorySidebar";
import CarouselBoutiques from "../components/CarouselBoutiques";
import BottomCatalogueSection from "../components/BottomCatalogueSection";
import TopDeals from "../components/TopDeals";
import VentesFlash from "../components/VentesFlash";
import NosCategories from "../components/NosCategories";
import BoutiquesOfficielles from "../components/BoutiquesOfficielles";
import AdidasBoutique from "../components/AdidasBoutique";
import ClimatisationVentilateurs from "../components/ClimatisationVentilateurs";
import Destockage from "../components/Destockage";
import InfinixBoutique from "../components/InfinixBoutique";
import Beaute from "../components/Beaute";
import Mode from "../components/Mode";
import MaisonElectromenager from "../components/MaisonElectromenager";
import Tech from "../components/Tech";
import AproposQwikfy from "../components/AproposQwikfy";
import FooterQwikfy from "../components/FooterQwikfy";
import { CategorieContext } from "../context/CategorieContext";
import AssistantChatbot from "../components/AssistantChatbot";
import PopupMarketing from "../components/PopupMarketing";
import PopupGestionMulticanal from "../components/PopupGestionMulticanal";

export default function Accueil() {
  const [boutiques, setBoutiques] = useState([]);
  const { categorieActive, setCategorieActive } = useContext(CategorieContext);
  const navigate = useNavigate();
  const [showPopupMarketing, setShowPopupMarketing] = useState(false);
  const [showPopupMultiCanal, setShowPopupMultiCanal] = useState(false);


  const categories = [
    "Toutes",
    "Téléphones",
    "TV & HIGH TECH",
    "Informatique",
    "Maison, cuisine & bureau",
    "Électroménager",
    "Vêtements & Chaussures",
    "Beauté & Santé",
    "Jeux vidéos & Consoles",
    "Bricolage",
    "Sports & Loisirs",
    "Bébé & Jouets",
    "Autres catégories",
  ];

  useEffect(() => {
    const fetchBoutiques = async () => {
      const snapshot = await getDocs(collection(db, "boutiques"));
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      if (list.length === 0) {
        setBoutiques([
          {
            id: "1",
            nom: "Boutique Samsung",
            description: "Découvrez les derniers smartphones et accessoires Samsung.",
            categorie: "Téléphones",
            logoUrl: "/images/carouselBoutique/Samsung.png",
            lien: "/produits/samsung",
            facebook: "https://facebook.com/samsung",
            instagram: "https://instagram.com/samsung"
          },
          {
            id: "2",
            nom: "Maison Chic",
            description: "Articles de maison, cuisine et bureau tendance.",
            categorie: "Maison, cuisine & bureau",
            logoUrl: "/images/carouselBoutique/Maison .jpg",
            lien: "/produits/maison-chic",
            facebook: "https://facebook.com/maisonchic",
            instagram: "https://instagram.com/maisonchic"
          },
          {
            id: "3",
            nom: "Jeux Galaxy",
            description: "Jeux vidéo & consoles dernière génération.",
            categorie: "Jeux vidéos & Consoles",
            logoUrl: "/images/carouselBoutique/Jeux.jpg",
            lien: "/produits/jeux-galaxy",
            facebook: "https://facebook.com/jeuxgalaxy",
            instagram: "https://instagram.com/jeuxgalaxy"
          },
          {
            id: "4",
            nom: "Beauté Naturelle",
            description: "Cosmétiques bio pour une beauté naturelle.",
            categorie: "Beauté & Santé",
            logoUrl: "/images/carouselBoutique/beaut.jpg",
            lien: "/produits/beaute-naturelle",
            facebook: "https://facebook.com/beautenaturelle",
            instagram: "https://instagram.com/beautenaturelle"
          },
          {
            id: "5",
            nom: "Sportif+",
            description: "Équipements et accessoires pour sportifs de haut niveau.",
            categorie: "Sports & Loisirs",
            logoUrl: "/images/carouselBoutique/Sportif.jpg",
            lien: "/produits/sportif",
            facebook: "https://facebook.com/sportifplus",
            instagram: "https://instagram.com/sportifplus"
          },
        ]);
        
      } else {
        setBoutiques(list);
      }
    };
    fetchBoutiques();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopupMarketing(true);
    }, 10000); // Affiche après 10 secondes

    return () => clearTimeout(timer);
  }, []);

  const boutiquesFiltrees = categorieActive === "Toutes"
    ? boutiques
    : boutiques.filter((boutique) => boutique.categorie === categorieActive);

  
  return (
    <div className="bg-gray-100 min-h-screen">
      <Helmet>
        <title>Qwikfy - Découvrez les boutiques en ligne</title>
        <meta name="description" content="Explorez les meilleures boutiques en ligne par catégorie sur Qwikfy. Téléphones, mode, maison, jeux vidéo, et plus encore !" />
        <meta name="keywords" content="Qwikfy, boutiques, e-commerce, shopping, produits en ligne, marketplace" />
        <meta name="author" content="Qwikfy" />
        <link rel="canonical" href="https://www.qwikfy.com" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Qwikfy - Découvrez les boutiques en ligne" />
        <meta property="og:description" content="Trouvez les meilleures boutiques en ligne dans toutes les catégories. Offres spéciales, produits tendance et bien plus." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.qwikfy.com" />
        <meta property="og:image" content="https://www.qwikfy.com/images/cover-accueil.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Qwikfy - Découvrez les boutiques en ligne" />
        <meta name="twitter:description" content="Explorez les meilleures boutiques en ligne par catégorie sur Qwikfy. Produits tendance à découvrir." />
        <meta name="twitter:image" content="https://www.qwikfy.com/images/cover-accueil.png" />
      </Helmet>

      <div className="max-w-7xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-6 gap-8">
        <div className="hidden md:block md:col-span-1">
          <CategorySidebar
            categories={categories}
            categorieActive={categorieActive}
            onSelect={setCategorieActive}
          />
        </div>

        <main className="md:col-span-4 flex flex-col gap-8">

          <section className="bg-white rounded shadow p-6">
            <h1 className="text-2xl font-bold text-green-700 mb-2">
              Bienvenue sur Qwikfy
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              Votre plateforme pour découvrir, explorer et acheter auprès des meilleures boutiques en ligne.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
            >
              <span className="text-lg">➕</span> Créer ma boutique
            </motion.button>
          </section>

           
          <CarouselBoutiques boutiques={boutiquesFiltrees} />
          <TopDeals />
          <VentesFlash />
          <NosCategories />
          <BoutiquesOfficielles />
          <AdidasBoutique />
          <ClimatisationVentilateurs />
          <Destockage />
          <InfinixBoutique />
          <Beaute />
          <Mode />
          <MaisonElectromenager />
          <Tech />
          <AproposQwikfy />
          <AssistantChatbot />
          <PopupMarketing isOpen={showPopupMarketing} onClose={() => setShowPopupMarketing(false)} />
          <PopupGestionMulticanal isOpen={showPopupMultiCanal} onClose={() => setShowPopupMultiCanal(false)} />
        </main>

        <div className="hidden md:block md:col-span-1">
          <EncartsDroite />
        </div>
      </div>

      <FooterQwikfy />
    </div>
  );
}

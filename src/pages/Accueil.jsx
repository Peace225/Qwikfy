import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import EncartsDroite from "../components/EncartsDroite";
import CategorySidebar from "../components/CategorySidebar";
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
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import bannerItems from "../data/banners.json";

export default function Accueil() {
  const [boutiques, setBoutiques] = useState([]);
  const { categorieActive, setCategorieActive } = useContext(CategorieContext);
  const [showPopupMarketing, setShowPopupMarketing] = useState(false);
  const [showPopupMultiCanal, setShowPopupMultiCanal] = useState(false);
  const navigate = useNavigate();

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
      setBoutiques(list);
    };
    fetchBoutiques();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopupMarketing(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Helmet>
        <title>Qwikfly - Découvrez les boutiques en ligne</title>
        <meta name="description" content="Explorez les meilleures boutiques en ligne par catégorie sur Qwikfly." />
        <link rel="canonical" href="https://www.qwikfly.com" />
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

          {/* Carrousel Offres avec animation */}
          <Carousel
            responsive={{ desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 }, tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 }, mobile: { breakpoint: { max: 464, min: 0 }, items: 1 } }}
            infinite
            autoPlay
            arrows={false}
            showDots
            keyBoardControl
            containerClass="carousel-container"
            itemClass="px-2"
            autoPlaySpeed={4000}
            transitionDuration={700}
          >
            {bannerItems.map((item, index) => (
              <motion.section
                key={index}
                className="bg-blue-900 text-white rounded shadow p-6 flex flex-col md:flex-row items-center justify-between"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <div className="flex-1 mb-4 md:mb-0">
                  <h2 className="text-4xl font-extrabold mb-2">{item.title.toUpperCase()}</h2>
                  <p className="text-lg">{item.subtitle}</p>
                  <p className="mt-2 text-yellow-300 font-semibold">{item.product}</p>
                  <p className="text-2xl font-bold mt-1">{item.price} <span className="text-red-500 text-sm">{item.discount}</span></p>
                </div>
                <div className="flex-1 text-center">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="max-h-48 mx-auto"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </motion.section>
            ))}
          </Carousel>

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

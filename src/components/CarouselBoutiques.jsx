import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export default function CarouselBoutiques({ boutiques = [], arrows = true }) {
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3, partialVisibilityGutter: 40 },
    tablet: { breakpoint: { max: 1024, min: 600 }, items: 2, partialVisibilityGutter: 30 },
    mobile: { breakpoint: { max: 600, min: 0 }, items: 1, partialVisibilityGutter: 20 },
  };

  if (!boutiques.length) {
    return (
      <p className="text-sm text-center text-gray-500 py-8">
        Aucune boutique dans cette catégorie.
      </p>
    );
  }

  return (
    <div className="overflow-hidden px-2 md:px-4">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={2500}
        arrows
        showDots
        keyBoardControl
        transitionDuration={500}
        partialVisible
        containerClass="carousel-container"
        itemClass="px-2"
        dotListClass="mt-4"
        customLeftArrow={
          <button className="carousel-arrow absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100">
            ◀️
          </button>
        }
        customRightArrow={
          <button className="carousel-arrow absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100">
            ▶️
          </button>
        }
      >

        {boutiques.map((b) => (
          <motion.div
            key={b.id}
            whileHover={{ rotateY: 10, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white p-4 rounded-2xl shadow-md border border-gray-200 h-full flex flex-col justify-between relative overflow-hidden"
          >
            <div className="relative">
              <img
                src={b.logoUrl || "https://via.placeholder.com/300x150?text=Boutique"}
                alt={`Boutique ${b.nom}`}
                className="rounded-xl mb-4 w-full h-40 object-cover"
                loading="lazy"
              />
              {/* Overlay sur image */}
              <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-sm p-2 text-center rounded-xl">
                {b.description || "Aucune description."}
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{b.nom}</h3>

              <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
                <Link
                  to={b.lien || "#"}
                  className="text-green-600 text-sm font-medium hover:underline hover:text-green-700 transition-colors"
                >
                  Voir les produits
                </Link>
                <div className="flex items-center gap-2">
                  {b.facebook && (
                    <a
                      href={b.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  )}
                  {b.instagram && (
                    <a
                      href={b.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-500 hover:text-pink-500 transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </Carousel>
    </div>
  );
}

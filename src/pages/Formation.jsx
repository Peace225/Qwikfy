import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf"; // 🔥 pense à installer avec npm install jspdf

// Tes vidéos
const videos = [
  { id: "vid1", title: "Créer une boutique", url: "https://www.youtube.com/embed/9Jk9Jk9Jk9" },
  { id: "vid2", title: "Introduction au dropshipping", url: "https://www.youtube.com/embed/xJ8a2mJj9YU" },
];

// Tes ebooks
const ebooks = [
  { id: "ebook1", title: "Guide du E-commerce", downloadLink: "/documents/guide-ecommerce.pdf" },
  { id: "ebook2", title: "Secrets du Marketing Digital", downloadLink: "/documents/marketing-digital.pdf" },
];

// 👉 Fonction principale
export default function Formation() {
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("formationProgress");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("formationProgress", JSON.stringify(completed));
  }, [completed]);

  const handleComplete = (id) => {
    setCompleted((prev) => ({ ...prev, [id]: true }));
  };

  const handleDownloadCertificate = () => {
    const doc = new jsPDF();
    doc.setFontSize(24);
    doc.text("CERTIFICAT DE FORMATION", 20, 30);
    doc.setFontSize(16);
    doc.text(`Décerné à : [Nom de l'utilisateur]`, 20, 50);
    doc.text(`Formation : Système E-commerce & Dropshipping`, 20, 70);
    doc.text(`Date : ${new Date().toLocaleDateString()}`, 20, 90);
    doc.text("Félicitations pour avoir complété 100% de la formation !", 20, 120);

    doc.save("certificat-qwikfy.pdf");
  };

  const totalItems = videos.length + ebooks.length;
  const completedItems = Object.keys(completed).length;
  const progress = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="space-y-12">
      {/* 🎯 Progression globale */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-green-600 mb-2">Progression de votre Formation</h2>
        <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
          <div
            className="bg-green-600 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{progress}% complété</p>
      </div>

      {/* 🎥 Formations Vidéo */}
      <section>
        <h2 className="text-2xl font-bold text-green-600 mb-6">Formations Vidéo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ scale: 1.03 }}
              className="rounded-lg overflow-hidden shadow-md dark:shadow-xl bg-white dark:bg-gray-800 relative"
            >
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-4 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{video.title}</h3>
                {!completed[video.id] ? (
                  <button
                    onClick={() => handleComplete(video.id)}
                    className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm"
                  >
                    Marquer comme vu
                  </button>
                ) : (
                  <span className="mt-4 inline-block text-green-600 font-semibold">✅ Terminé</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 📚 E-books */}
      <section>
        <h2 className="text-2xl font-bold text-green-600 mb-6">E-Books à Télécharger</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ebooks.map((ebook) => (
            <motion.div
              key={ebook.id}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-center"
            >
              <div className="flex-shrink-0 mb-4">
                <svg
                  className="h-16 w-16 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{ebook.title}</h3>
              <a
                href={ebook.downloadLink}
                download
                className="text-green-600 hover:underline text-sm"
              >
                Télécharger
              </a>

              {!completed[ebook.id] ? (
                <button
                  onClick={() => handleComplete(ebook.id)}
                  className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm"
                >
                  Marquer comme lu
                </button>
              ) : (
                <span className="mt-4 inline-block text-green-600 font-semibold">✅ Lu</span>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🎓 Affichage Certificat si 100% progression */}
      {progress === 100 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mt-12"
        >
          <div className="text-2xl font-bold text-green-600 mb-4 animate-bounce">
            🎉 Félicitations, vous avez terminé la formation !
          </div>
          <button
            onClick={handleDownloadCertificate}
            className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full transition-all shadow"
          >
            Télécharger votre Certificat 📜
          </button>
        </motion.div>
      )}
    </div>
  );
}

import { motion } from "framer-motion";

export default function ThemePreview({ theme }) {
  const styles = {
    Minimaliste: {
      background: "white",
      textColor: "black",
      highlight: "gray",
    },
    Élégant: {
      background: "#1f2937",
      textColor: "white",
      highlight: "#d1d5db",
    },
    Dynamique: {
      background: "#10b981",
      textColor: "white",
      highlight: "#34d399",
    },
  };

  const currentStyle = styles[theme] || styles.Minimaliste;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="rounded-lg overflow-hidden shadow-md"
      style={{ backgroundColor: currentStyle.background }}
    >
      <div className="h-16 flex items-center justify-center font-bold text-lg" style={{ color: currentStyle.textColor }}>
        {theme}
      </div>
      <div className="p-4 space-y-2">
        <div
          className="h-10 rounded bg-opacity-30"
          style={{ backgroundColor: currentStyle.highlight }}
        ></div>
        <div
          className="h-10 rounded bg-opacity-30"
          style={{ backgroundColor: currentStyle.highlight }}
        ></div>
        <div
          className="h-10 rounded bg-opacity-30"
          style={{ backgroundColor: currentStyle.highlight }}
        ></div>
      </div>
    </motion.div>
  );
}

import { useEffect } from "react";

export default function SuccessToast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // disparaît après 3s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
      ✅ {message}
    </div>
  );
}

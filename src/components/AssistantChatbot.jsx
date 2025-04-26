import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../utils/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function AssistantChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Bonjour 👋 Je suis votre assistant Qwikfy. Posez-moi une question !"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'fr-FR';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        recognition.stop();
      };
      recognitionRef.current = recognition;
    }
  }, []);

  const handleStartVoice = () => {
    if (recognitionRef.current) recognitionRef.current.start();
  };

  useEffect(() => {
    if (messages.length > 1) {
      const saveLastMessage = async () => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.from === "user") {
          await addDoc(collection(db, "chatbot_messages"), {
            text: lastMessage.text,
            from: lastMessage.from,
            createdAt: serverTimestamp(),
          });
        }
      };
      saveLastMessage();
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "Tu es l'assistant virtuel de Qwikfy, une plateforme e-commerce." },
            ...messages.map((m) => ({ role: m.from === "user" ? "user" : "assistant", content: m.text })),
            { role: "user", content: input }
          ]
        })
      });

      const data = await response.json();
      const botText = data.choices?.[0]?.message?.content || "🤖 Désolé, je n'ai pas compris.";

      setMessages((prev) => [...prev, { from: "bot", text: botText }]);
    } catch (err) {
      console.error("Erreur API OpenAI:", err);
      setMessages((prev) => [...prev, { from: "bot", text: "❌ Erreur lors de la réponse." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-4 w-full max-w-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg flex flex-col overflow-hidden z-50"
          >
            <div className="bg-green-600 text-white px-4 py-2 text-sm font-semibold">Chatbot Qwikfy 🤖</div>
            <div className="flex-1 p-4 overflow-y-auto max-h-60 space-y-2 text-sm">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-md ${msg.from === "bot"
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                    : "bg-blue-100 dark:bg-blue-600 text-right text-blue-800 dark:text-white ml-auto"}`}
                >
                  {msg.text}
                </div>
              ))}
              {loading && (
                <div className="text-xs text-gray-500 italic">Rédaction de la réponse...</div>
              )}
            </div>
            <div className="flex border-t border-gray-200 dark:border-gray-700">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 px-4 py-2 text-sm bg-transparent focus:outline-none"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleStartVoice}
                className="px-2 text-sm text-gray-500 hover:text-gray-800"
                title="Parler"
              >🎙️</button>
              <button
                onClick={handleSend}
                className="px-4 text-sm text-green-600 hover:text-green-800 font-semibold"
                disabled={loading}
              >
                Envoyer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 flex items-center gap-2 z-50">
        <div className="hidden md:flex items-center gap-1 text-sm text-gray-700 dark:text-white bg-white dark:bg-gray-700 px-3 py-1 rounded shadow-md animate-bounce">
          Je suis ton Assistant virtuel
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          title="Je suis ton Assistant virtuel"
          className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg"
          aria-label="Ouvrir le chatbot"
        >
        {isOpen ? "✖️" : "🤖"}
      </button>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

const ventesFlash = [
  {
    name: "Logitech G305 Souris Gaming",
    price: "449.00 Euro",
    oldPrice: "718.40 Euro",
    discount: "-38%",
    remaining: 1,
    total: 10,
    img: "/images/ventesflash/g305.webp",
  },
  {
    name: "Logitech MK270 Combo",
    price: "239.00 Euro",
    oldPrice: "399.00 Euro",
    discount: "-40%",
    remaining: 18,
    total: 30,
    img: "/images/ventesflash/mk270.webp",
  },
  {
    name: "Logitech Signature M650",
    price: "369.00 Euro",
    oldPrice: "590.40 Euro",
    discount: "-38%",
    remaining: 2,
    total: 10,
    img: "/images/ventesflash/m650.jpg.webp",
  },
  {
    name: "Logitech MK120 Combo",
    price: "89.00 Euro",
    oldPrice: "142.40 Euro",
    discount: "-38%",
    remaining: 42,
    total: 80,
    img: "/images/ventesflash/mk120.png",
  },
  {
    name: "Logitech M171 Wireless",
    price: "99.00 Euro",
    oldPrice: "158.40 Euro",
    discount: "-38%",
    remaining: 3,
    total: 10,
    img: "/images/ventesflash/m171.jpg",
  },
];

export default function VentesFlash() {
  const [countdown, setCountdown] = useState("00h : 00m : 00s");

  useEffect(() => {
    // Simule un compte à rebours
    const target = new Date().getTime() + 60 * 60 * 1000; // 1h
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      const h = String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, "0");
      const m = String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, "0");
      const s = String(Math.floor((distance / 1000) % 60)).padStart(2, "0");
      setCountdown(`${h}h : ${m}m : ${s}s`);
      if (distance < 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white shadow mt-8 rounded-lg overflow-hidden">
      <div className="flex justify-between items-center bg-red-600 text-white px-4 py-2">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="font-bold">Ventes Flash</span>
        </div>
        <div className="text-sm">Termine dans : <span className="font-mono">{countdown}</span></div>
        <button className="text-sm underline hover:text-yellow-300">Voir plus</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {ventesFlash.map((item, i) => {
          const percent = Math.round(((item.total - item.remaining) / item.total) * 100);
          return (
            <div key={i} className="text-sm">
              <div className="relative">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-32 object-contain"
                />
                <span className="absolute top-1 right-1 bg-orange-100 text-orange-700 text-xs px-1 py-0.5 rounded">
                  {item.discount}
                </span>
              </div>
              <h3 className="font-semibold mt-1 line-clamp-2">{item.name}</h3>
              <p className="font-bold">{item.price}</p>
              <p className="text-xs text-gray-400 line-through">{item.oldPrice}</p>
              <p className="text-xs text-gray-700 mt-1">{item.remaining} articles restants</p>
              <div className="h-1 w-full bg-gray-300 rounded mt-1 overflow-hidden">
                <div
                  className="h-full bg-orange-500"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

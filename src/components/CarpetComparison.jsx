import React, { useRef, useState, useEffect } from "react";
import { FcInTransit } from "react-icons/fc";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { useLanguage } from "./LanguageContext";

export default function CarpetComparison() {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState(50);
  const { language, toggleLanguage } = useLanguage();

  const t = {
    uz: {
      cleaning: " Gilamlarni yuvish",
      rug: "vaqti keldi!",
      res: "  Gilam, mebel, matras va boshqa sirtlarni yuvish Xizmatlardan",
      cik: " CHEGIRMA",
      rbe: "bilan foydalaning! Tozalik — sizning farovonligingiz!",
      ber: "  bepul yetkazib berish",
      yer: " Shahar ichida",
      eko: "Ekologik toza yuvish vositalari bilan",
      yuv: "yuvish",
      bts: "Batafsil ma'lumot",
    },
    ru: {
      cleaning: " Стирка ковров",
      rug: "Пришло время!",
      res: "Услуги по чистке ковров, мебели, матрасов и других поверхностей",
      cik: "СКИДКА",
      rbe: "Используйте нас! Чистота — это ваше благополучие!",
      ber: "Бесплатная доставка",
      yer: "По городу",
      eko: "С использованием экологически чистых моющих средств",
      yuv: "Стирка",
      bts: "Узнать больше",
    },
  };

  // Drag / touch events
  useEffect(() => {
    const onMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const rect = containerRef.current.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      setPos(pct);
    };

    const onUp = () => setIsDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDragging]);

  const startDrag = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const moveLeft = () => setPos((p) => Math.max(0, p - 10));
  const moveRight = () => setPos((p) => Math.min(100, p + 10));

  return (
    <section className="relative  mx-auto px-6 py-24 bg-gradient-to-br from-emerald-600 via-indigo-700 to-purple-700 rounded-3xl shadow-2xl overflow-hidden">
      {/* Dekorativ fon effekt */}
      <div className="absolute inset-0 "></div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT: Text */}
        <div className="lg:pr-12 text-white">
          <h3 className="text-3xl lg:text-5xl font-extrabold leading-tight mb-6 drop-shadow-md">
            {t[language].cleaning}
            <br className="hidden md:block" /> {t[language].rug}
          </h3>

          <p className="text-lg text-gray-100 mb-10 leading-relaxed">
            {t[language].res}
            <strong className="text-yellow-300 font-semibold">
              {t[language].cik}
            </strong>
            {t[language].rbe}
          </p>

          {/* Xizmat afzalliklari */}
          <div className="flex flex-col sm:flex-row gap-10 mb-12">
            <div className="flex flex-col items-start gap-4 max-w-xs">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 hover:scale-105 transition-all duration-500">
                <FcInTransit className="w-16 h-16" />
              </div>
              <div className="text-lg font-medium text-gray-50 leading-snug">
                {t[language].yer}
                <span className="text-yellow-300 font-semibold">
                  {t[language].ber}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 max-w-xs">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 hover:scale-105 transition-all duration-500">
                <CgSmartHomeWashMachine className="w-16 h-16 text-white" />
              </div>
              <div className="text-lg font-medium text-gray-50 leading-snug">
                {t[language].eko}
                <span className="text-yellow-300">{t[language].yuv}</span>
              </div>
            </div>
          </div>

          {/* Tugma */}
          <button className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-yellow-500/40">
            {t[language].bts}
          </button>
        </div>

        {/* RIGHT: Before / After slider */}
        <div className="relative group">
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-3xl shadow-2xl ring-2 ring-white/20 touch-none cursor-ew-resize"
            onMouseDown={startDrag}
            onTouchStart={startDrag}
          >
            {/* Right (after) image */}
            <img
              src="./gepk.jpg"
              alt="after"
              className="w-full h-full object-cover block"
            />

            {/* Left (before) image */}
            <div
              className="absolute top-0 left-0 h-full overflow-hidden transition-all duration-300"
              style={{ width: `${pos}%` }}
            >
              <img
                src="./gepk2.jpg"
                alt="before"
                className="w-full h-full object-cover block"
              />
            </div>

            {/* Slider handle */}
            <div
              className="absolute top-0 bottom-0 flex items-center justify-center transition-transform duration-300"
              style={{
                left: `${pos}%`,
                transform: "translateX(-50%)",
              }}
            >
              <div className="bg-white/90 shadow-md border-2 border-yellow-400 rounded-full w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <div className="w-2 h-8 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

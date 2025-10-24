import { useState, useEffect } from "react";
import { Phone, Clock, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false); // <-- navni yopishtirish holati
  const { language, toggleLanguage } = useLanguage();

  const t = {
    uz: {
      home: "Asosiy",
      about: "Biz haqimizda",
      services: "Xizmatlar",
      gallery: "Galereya",
      news: "Yangiliklar",
      reviews: "Sharhlar",
      contact: "Aloqa",
      order: "Buyurtma berish",
      workTime: "Ish vaqti:",
      callUs: "Biz bilan aloqa:",
      switch: "Русский",
    },
    ru: {
      home: "Главная",
      about: "О нас",
      services: "Услуги",
      gallery: "Галерея",
      news: "Новости",
      reviews: "Отзывы",
      contact: "Контакты",
      order: "Заказать",
      workTime: "Время работы:",
      callUs: "Связаться с нами:",
      switch: "O‘zbekcha",
    },
  };

  // scroll hodisasi orqali navni yopishtirish
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="border-b bg-white shadow-sm">
      {/* Yuqori qism */}
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto py-3 px-4 text-sm text-gray-600">
        <div className="flex items-center gap-2 font-semibold">
          <img
            src="/logo.png"
            alt="Zilol logo"
            className="w-80 h-30 object-cover"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10 mt-3 sm:mt-0">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            <div className="flex items-center gap-2">
              <Clock className="w-10 h-10 text-black" />
              <div className="flex flex-col text-center sm:text-left">
                <span className="font-semibold text-1.5xl">
                  {t[language].workTime}
                </span>
                <span className="text-black">08:00–20:00 Du–Ya</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-10 h-10 text-black" />
              <p className="flex flex-col text-center sm:text-left">
                <span className="font-semibold text-1xl">
                  {t[language].callUs}
                </span>
                <a
                  href="tel:+99873.200-13-13"
                  className="text-black hover:text-green-700 text-1xl font-medium hover:underline"
                >
                  +99873.200-13-13
                </a>
              </p>
            </div>
          </div>

          {/* Buyurtma tugmasi */}
          <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-md font-semibold transition sm:ml-auto">
            {t[language].order}
          </button>
        </div>
      </div>

      {/* Navigatsiya (desktop) */}
      <nav
        className={`hidden md:flex justify-center w-full bg-white/90 backdrop-blur-md transition-all duration-300 ${
          isSticky
            ? "fixed top-0 left-0 shadow-md z-50 animate-slideDown"
            : "relative shadow-none"
        }`}
      >
        <ul className="flex flex-wrap items-center gap-8 py-4 text-sm font-medium text-gray-700 uppercase tracking-wide">
          <Link className="text-purple-700 font-semibold cursor-pointer">
            {t[language].home}
          </Link>
          <Link className="cursor-pointer hover:text-purple-700">
            {t[language].about}
          </Link>
          <Link className="cursor-pointer hover:text-purple-700">
            {t[language].services}
          </Link>
          <Link className="cursor-pointer hover:text-purple-700">
            {t[language].gallery}
          </Link>
          <Link className="cursor-pointer hover:text-purple-700">
            {t[language].news}
          </Link>
          <Link className="cursor-pointer hover:text-purple-700">
            {t[language].reviews}
          </Link>
          <Link className="cursor-pointer hover:text-purple-700">
            {t[language].contact}
          </Link>

          <button
            onClick={toggleLanguage}
            className="cursor-pointer hover:text-purple-700 font-semibold flex gap-1 items-center"
          >
            <img
              src={language === "uz" ? "/ru.png" : "/uzb.png"}
              alt={language === "uz" ? "RU" : "UZ"}
              className="w-5 h-5 object-cover"
            />
            {t[language].switch}
          </button>
        </ul>
      </nav>

      {/* Mobil menyu tugmasi */}
      <div className="md:hidden flex justify-end px-4 py-2">
        <button className="text-gray-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div
        className={`md:hidden bg-white border-t transition-all duration-500 overflow-hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center py-3 space-y-3 text-gray-700 uppercase font-medium text-sm">
          <Link onClick={() => setIsOpen(false)}>{t[language].home}</Link>
          <Link onClick={() => setIsOpen(false)}>{t[language].about}</Link>
          <Link onClick={() => setIsOpen(false)}>{t[language].services}</Link>
          <Link onClick={() => setIsOpen(false)}>{t[language].gallery}</Link>
          <Link onClick={() => setIsOpen(false)}>{t[language].news}</Link>
          <Link onClick={() => setIsOpen(false)}>{t[language].reviews}</Link>
          <Link onClick={() => setIsOpen(false)}>{t[language].contact}</Link>

          <button
            onClick={() => {
              toggleLanguage();
              setIsOpen(false);
            }}
            className="flex items-center gap-2 hover:text-purple-700"
          >
            <img
              src={language === "uz" ? "/ru.png" : "/uzb.png"}
              alt={language === "uz" ? "RU" : "UZ"}
              className="w-5 h-5"
            />
            {t[language].switch}
          </button>
        </ul>
      </div>
    </header>
  );
}

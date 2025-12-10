import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const mobileMenuRef = useRef(null);
  const { language, toggleLanguage } = useLanguage();

  // Tarjimalar
  const translations = {
    uz: {
      home: "Asosiy",
      about: "Biz haqimizda",
      services: "Xizmatlar",
      news: "Yangiliklar",
      contact: "Aloqa",
      switch: "UZ",
    },
    ru: {
      home: "Главная",
      about: "О нас",
      services: "Услуги",
      news: "Новости",
      contact: "Контакты",
      switch: "RU",
    },
  };

  // Fallback bilan tanlangan tilni olish
  const t = translations[language] || translations["uz"];

  // Scroll orqali nav fonini va shadow effektini o‘zgartirish
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobil menyu ochilganda body scrollni bloklash
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // Ekranga bosilganda mobil menyuni yopish
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isSticky ? "bg-white/95 shadow-lg backdrop-blur-md" : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <Link to="/">
          <img
            src="./logo.png"
            alt="Logo"
            className="    hidden md:block w-24 h-12  sm:w-10 sm:h-2 md:w-40 md:h-20  lg:w-47 lg:h-17  object-cover "
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium uppercase tracking-wide">
          {[
            { to: "/", label: t.home },
            { to: "/about", label: t.about },
            { to: "/services", label: t.services },
            { to: "/news", label: t.news },
            { to: "/contact", label: t.contact },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="hover:text-purple-700 transition-colors"
            >
              {item.label}
            </Link>
          ))}

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 font-semibold hover:text-purple-700 transition-all"
          >
            <img
              src={language === "uz" ? "/uzb.png" : "/ru.png"}
              alt={language === "uz" ? "UZ" : "RU"}
              className="w-5 h-5 transition-transform duration-300 hover:scale-110"
            />
            <span className="transition-opacity duration-300">{t.switch}</span>
          </button>
        </nav>

        {/* Mobil menyu ikonkasi va til tugmasi */}
        <div className="flex gap-2 md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black hover:bg-purple-100 rounded-full p-2 transition"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <button
            onClick={() => {
              toggleLanguage();
              setIsOpen(false);
            }}
            className="px-3 py-1 text-sm font-semibold text-black bg-transparent hover:bg-amber-400 rounded-3xl shadow-sm hover:scale-105 transition-transform duration-300"
          >
            {t.switch}
          </button>
        </div>

        {/* Mobil versiya uchun logo */}
        <Link to="/">
          <img
            src="./logo.png"
            alt="ZILOL logo"
            className="block md:hidden w-32 h-auto object-contain mx-auto my-2"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          backgroundImage: `url('/bg-mobil2.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <ul className="flex flex-col items-start mt-24 py-10 px-5 space-y-6 text-gray-700 uppercase font-medium">
          {[
            { to: "/", label: t.home },
            { to: "/about", label: t.about },
            { to: "/services", label: t.services },
            { to: "/news", label: t.news },
            { to: "/contact", label: t.contact },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className="hover:text-purple-700 transition-colors text-lg"
            >
              {item.label}
            </Link>
          ))}
        </ul>
      </div>
    </header>
  );
}

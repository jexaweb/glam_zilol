import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const mobileMenuRef = useRef(null);

  const t = {
    uz: {
      home: "Asosiy",
      about: "Biz haqimizda",
      services: "Xizmatlar",
      news: "Yangiliklar",
      contact: "Aloqa",
      switch: "uz",
    },
    ru: {
      home: "Главная",
      about: "О нас",
      services: "Услуги",
      news: "Новости",
      contact: "Контакты",
      switch: "ru",
    },
  };

  // scroll orqali nav fonini va shadow effektini o'zgartirish
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
      className={`w-full top-0 z-50 transition-all duration-300 ${
        isSticky ? "bg-white/95 shadow-lg backdrop-blur-md" : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        <img src="./logo.png" alt="" className="hidden md:block w-60 h-20" />

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium uppercase tracking-wide">
          {[
            { to: "/", label: t[language].home },
            { to: "/about", label: t[language].about },
            { to: "/services", label: t[language].services },
            { to: "/news", label: t[language].news },
            { to: "/contact", label: t[language].contact },
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
            className="flex items-center gap-2 hover:text-purple-700 font-semibold"
          >
            <img
              src={language === "uz" ? "/uzb.png" : "/ru.png"}
              alt={language === "uz" ? "UZ" : "RU"}
              className="w-5 h-5"
            />
            {t[language].switch}
          </button>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="flex gap-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-black t hover:bg-blue-600 hover:text-white"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <button
            onClick={() => {
              toggleLanguage();
              setIsOpen(false);
            }}
            className="relative block md:hidden px-3 py-1 font-semibold text-white uppercase 
             rounded-3xl hover:bg-gradient-to-r from-indigo-500 via-sky-500 to-purple-500 
             shadow-md transition-all duration-500 overflow-hidden
             hover:scale-105 hover:shadow-xl"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 hover:opacity-100 transition-opacity duration-700"></span>
            <span className="relative z-10 tracking-wide text-sm text-black  hover:text-white">
              {t[language].switch}
            </span>
          </button>
        </div>

        <img
          src="./logo.png"
          alt="ZILOL logo"
          className="
    block md:hidden             
    w-30 h-auto                
    max-w-[180px]               
    md:max-w-[220px]           
    object-contain            
    mx-auto my-2             
    touch-none                   
  "
          loading="lazy"
        />
      </div>
      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 left-0 h-full w-64 bg-amber-50 shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          backgroundImage: `url('/bg-mobil2.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <ul className="flex flex-col items-start mt-50 py-10 px-5 space-y-6 text-gray-700 uppercase font-medium">
          {[
            { to: "/", label: t[language].home },
            { to: "/about", label: t[language].about },
            { to: "/services", label: t[language].services },
            { to: "/news", label: t[language].news },
            { to: "/contact", label: t[language].contact },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className="hover:text-purple-700 transition-colors"
            >
              {item.label}
            </Link>
          ))}

          {/* <button
            onClick={() => {
              toggleLanguage();
              setIsOpen(false);
            }}
            className="flex items-center gap-2 hover:text-purple-700 font-semibold mt-4"
          >
            <img
              src={language === "uz" ? "/ru.png" : "/uzb.png"}
              alt={language === "uz" ? "RU" : "UZ"}
              className="w-5 h-5"
            />
            {t[language].switch}
          </button> */}
        </ul>
      </div>
    </header>
  );
}

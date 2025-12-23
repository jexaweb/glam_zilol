import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import CarpetComparison from "../components/CarpetComparison";
import PhoneInput from "../components/PhoneInput";
import { useLanguage } from "../components/LanguageContext";
import EmailForm from "../components/EmailForm";
import Footer from "../components/Footer";


function ErrorAlert({ message, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [message]);

  if (!visible || !message) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between w-[90%] max-w-md z-50">
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 font-bold hover:text-gray-200">
        ✕
      </button>
    </div>
  );
}

function Home() {
  const { language } = useLanguage();
  const [key, setKey] = useState(language);

  // EmailJS
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [currentError, setCurrentError] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [showDiscountModal, setShowDiscountModal] = useState(false);

  // ⭐ SLIDER ITEMS – YONIQLANIB QO‘YILDI
  // ⭐ SLIDER ITEMS – TIL BO‘YICHA TARJIMA QO‘SHILDI
  const items = [
    {
      img: "https://d34mfkth6cubud.cloudfront.net/wp-content/uploads/2022/11/16073435/home-cleaning-services-in-Abu-Dhabi-_-Cover-16-11-22.jpg",

      text_uz:
        "Primum teskor xizmat! Antibakterial, gipoallergenik ERA 111 professional shampunida yuvib, quritib 1 kunda yetkazib beramiz!",
      text_ru:
        "Премиальная быстрая услуга! Стираем антибактериальным, гипоаллергенным шампунем ERA 111, сушим и доставляем за 1 день!",
    },
    {
      img: "https://avatars.mds.yandex.net/get-altay/15265650/2a00000194cfc14c6f5dd8df9fe271072a6a/XXL_height",

      text_uz:
        "Mebel va ugaloklarni joyingizga borib, maxsus piliso yordamida ekologik toza shampunlar bilan 1–2 soat ichida yangidek qilib beramiz!",
      text_ru:
        "Мягкую мебель и угловые диваны чистим у вас на месте, с помощью специального пылесоса и экологичных шампуней — всего за 1–2 часа!",
    },
    {
      img: "https://biryusa.ru/up/opti/resizetmp/2520_3000_1/27d166727599573d9fa491436e510f7b/SM2_3.jpg",

      text_uz:
        "Pardalarni zamonaviy mashinalarda yuvib, quritib va xushbo‘y atirlar bilan xushbo'ylantirib  beramiz!",
      text_ru:
        "Мы стираем шторы на современных машинах, высушиваем и ароматизируем их приятными, свежими ароматами!",
    },
  ];

  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    if (items.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 20000);

    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % items.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + items.length) % items.length);

  // Modal 1s dan keyin ochiladi
  useEffect(() => {
    const timer = setTimeout(() => setShowDiscountModal(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Tarjimalar
  const t = {
    uz: {
      chek: "Birinchi buyurtma uchun chegirma",
      namePlaceholder: "Ismingizni kiriting",
      submit: "Yuborish",
      privacy:
        '"Yuborish" tugmasini bosish orqali veb-sayt shartlariga rozilik bildirasiz',
      submitSuccess:
        "✅ Muvaffaqiyatli yuborildi! Tez orada sizga qo‘ng‘iroq qilamiz.",
      submitError: "❌ Xatolik yuz berdi. Qayta urinib ko‘ring.",
      name: "Professional xizmat",
      gil: "1000+ hursand mijozlar bilan ishonchli xizmat!",
    },
    ru: {
      chek: "Скидка на первый заказ",
      namePlaceholder: "Введите ваше имя",
      submit: "Отправить",
      privacy: 'Нажимая "Отправить", вы соглашаетесь с условиями сайта',
      submitSuccess: "✅ Успешно отправлено! Мы скоро вам перезвоним.",
      submitError: "❌ Произошла ошибка. Попробуйте снова.",
      name: "Профес-сиональные услуги",
      gil: "Более 1000 довольных клиентов — качество и чистота!",
    },
  };
  const currentT = t[language] || t.uz;

  // Forma boshqarish
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
  };

  // Validatsiya
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = currentT.namePlaceholder;
    if (!formData.phone.trim() || formData.phone.length < 9)
      newErrors.phone = "To‘liq telefon raqamini kiriting.";
    return newErrors;
  };

  // Email yuborish
  const sendEmail = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setCurrentError(Object.values(validationErrors)[0]);
      return;
    }

    setLoading(true);
    setCurrentError("");

    emailjs
      .sendForm(
        "service_u8uok6n",
        "template_l0no0ke",
        formRef.current,
        "yqeQcMyCRd4i1twMv"
      )
      .then(
        () => {
          alert(currentT.submitSuccess);
          setFormData({ name: "", phone: "" });
          setShowDiscountModal(false);
        },
        () => {
          setCurrentError(currentT.submitError);
        }
      )
      .finally(() => setLoading(false));
  };

  // Xatoni kuzatish
  useEffect(() => {
    const firstError = Object.values(errors).find(Boolean);
    if (firstError) setCurrentError(firstError);
  }, [errors]);

  return (
    <div key={key}>
      {/* Xato Alert */}
      <ErrorAlert message={currentError} onClose={() => setCurrentError("")} />

      {/* Modal */}
      {showDiscountModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="relative bg-white rounded-2xl p-6 w-80 shadow-2xl text-center animate-fadeIn"
          >
            <button
              type="button"
              onClick={() => setShowDiscountModal(false)}
              className="absolute top-3 right-5 text-gray-500 hover:text-red-700 text-xl"
            >
              ✕
            </button>

            <h1 className="text-2xl font-bold text-blue-700 mb-2">ZILOL</h1>
            <h2 className="text-xl font-semibold text-blue-800 mb-6">
              {currentT.chek}
            </h2>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={currentT.namePlaceholder}
              className="w-full mb-4 px-4 py-3 rounded-full bg-blue-100 text-gray-700"
            />

            <PhoneInput
              value={formData.phone}
              onChange={handlePhoneChange}
              error={errors.phone}
              name="phone"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-full mt-6 hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Yuborilmoqda..." : currentT.submit}
            </button>

            <p className="text-gray-500 text-sm mt-3">{currentT.privacy}</p>
          </form>
        </div>
      )}

      <section
        className="relative w-full overflow-hidden 
  h-[70vh] sm:h-[75vh] md:h-[80vh] lg:h-[90vh]"
      >
        {items.map((item, i) => (
          <div
            key={i}
            className={`absolute inset-0 px-3 sm:px-5 md:px-10 pt-10 sm:pt-16 
      w-full h-full transition-opacity duration-700 ease-in-out
      ${i === index ? "opacity-100" : "opacity-0"}
    `}
          >
            <div className="relative w-full h-full">
              <img
                src={item.img}
                className="absolute inset-0 z-30 w-full h-full object-cover rounded-2xl"
                alt=""
              />
            </div>

            {/* TEXT */}
            <div
              className="
        absolute 
        bottom-10 sm:bottom-16 md:bottom-20 lg:bottom-2
        left-4 sm:left-6 md:left-10 
        max-w-[92%] sm:max-w-[85%] md:max-w-3xl lg:max-w-4xl
        z-40
      "
            >
              <h2
                className="
          font-bold 
          text-[14px] sm:text-lg md:text-2xl lg:text-4xl
          leading-snug md:leading-normal
          px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-6 
          bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400
          text-blue-800 
          rounded-xl md:rounded-2xl 
          backdrop-blur-md 
          border border-white/30
          shadow-lg
        "
              >
                {item[`text_${language}`]}
              </h2>
            </div>

            {/* PREV */}
            <button
              onClick={prev}
              className="absolute z-40 top-1/2 
        left-3 sm:left-5 md:left-10 
        -translate-y-1/2 
        bg-yellow-400 text-black 
        p-2 sm:p-3 rounded-full shadow-lg 
        hover:bg-yellow-300 active:scale-95 transition"
            >
              ‹
            </button>

            {/* NEXT */}
            <button
              onClick={next}
              className="absolute z-40 top-1/2 
        right-3 sm:right-5 md:right-10 
        -translate-y-1/2 
        bg-yellow-400 text-black 
        p-2 sm:p-3 rounded-full shadow-lg 
        hover:bg-yellow-300 active:scale-95 transition"
            >
              ›
            </button>

            {/* DOTS */}
            <div
              className="absolute 
        bottom-5 sm:bottom-10 md:bottom-16 lg:bottom-5
        left-260 -translate-x-1/2 
        flex space-x-2 sm:space-x-3 
        z-40"
            >
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 rounded-full transition 
              ${
                i === index
                  ? "bg-yellow-400 scale-125"
                  : "bg-white/60 hover:bg-white"
              }
            `}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Info Section */}
      <section className="flex flex-col items-center justify-center  text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600">
          {currentT.name}
        </h1>

        <p className="text-gray-600 max-w-2xl leading-relaxed mt-4 text-lg">
          {currentT.gil}
        </p>
      </section>
      <div>
        <CarpetComparison />
      </div>
    </div>
  );
}

export default Home;

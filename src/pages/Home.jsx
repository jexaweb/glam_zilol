import { useState, useEffect } from "react";
import { useLanguage } from "../components/LanguageContext";
import CarpetComparison from "../components/CarpetComparison";
import PhoneInput from "../components/PhoneInput";
import Services from "../components/Services";

// Error alert sake
function ErrorAlert({ message, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [message]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  if (!visible || !message) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between w-[90%] max-w-md z-50">
      <span>{message}</span>
      <button
        onClick={handleClose}
        className="ml-4 font-bold text-white hover:text-gray-200"
      >
        ✕
      </button>
    </div>
  );
}

function Home({ text = "ZILOL" }) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentError, setCurrentError] = useState("");
  const [preview, setPreview] = useState({ name: "", phone: "" });
  const [showDiscountModal, setShowDiscountModal] = useState(false); // modal uchun
  const colors = [
    "text-red-500",
    "text-orange-500",
    "text-yellow-500",
    "text-green-500",
    "text-blue-500",
    "text-indigo-500",
    "text-purple-500",
    "text-pink-500",
  ];

  // 3 soniyadan keyin modal chiqsin
  useEffect(() => {
    const timer = setTimeout(() => setShowDiscountModal(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const t = {
    uz: {
      dec: "Ismingiz va telefon raqamingizni kiritib, bizga jo'nating. Tez orada sizga qo'ng'iroq qilamiz:",
      titl: "Jo'natish",
      name: "Profissanal Xizmat",
      privacy: "Biz ma'lumotlaringizni maxfiy saqlaymiz.",
      placeholderName: "Ismingizni kiriting",
      submitSuccess:
        "Muvaffaqiyatli yuborildi! Tez orada sizga qo'ng'iroq qilamiz.",
      submitError: "Xatolik yuz berdi. Qayta urinib ko'ring.",
      gil: "1000.000 Ming  Ko'proq Hursand mijozlar",
    },
    ru: {
      dec: "Введите имя и номер телефона, отправьте нам. Мы Вам перезвоним в ближайшее время:",
      titl: "Отправить",
      name: "У нас имеются скидки",
      privacy: "Мы храним ваши данные в конфиденциальности.",
      placeholderName: "Введите ваше имя",
      submitSuccess: "Успешно отправлено! Мы перезвоним вам скоро.",
      submitError: "Произошла ошибка. Попробуйте снова.",
      gil: "Мы приводим ваши ковры в состояние как новые — с качеством, доверием и чистотой.",
    },
    //     default: {
    //     dec: "Ismingiz va telefon raqamingizni kiriting va bizga yuboring. Tez orada sizga qo‘ng‘iroq qilamiz:",
    // titl: "Yuborish",
    // name: "Bizda eng arzon narxlar mavjud",
    // privacy: "Ma’lumotlaringiz maxfiy saqlanadi.",
    // placeholderName: "Ismingizni kiriting",
    // submitSuccess: "Muvaffaqiyatli yuborildi! Tez orada sizga qo‘ng‘iroq qilamiz.",
    // submitError: "Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.",

    //     },
  };

  const currentT = t[language] || t.uz;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setPreview((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
    setPreview((prev) => ({ ...prev, phone: value }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Ismingizni kiriting.";
    if (!formData.phone.trim() || formData.phone.length < 17)
      newErrors.phone = "Nomer kiriting.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setCurrentError(Object.values(validationErrors)[0]);
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("Submitting form data:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(currentT.submitSuccess);
      setFormData({ name: "", phone: "" });
      setPreview({ name: "", phone: "" });
    } catch (err) {
      setCurrentError(currentT.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  // errors update bo‘lganda popup ko‘rsatish
  useEffect(() => {
    const firstError = Object.values(errors).find((err) => err);
    if (firstError) setCurrentError(firstError);
  }, [errors]);

  return (
    <>
      {/* Popup */}
      <ErrorAlert message={currentError} onClose={() => setCurrentError("")} />

      {/* Chegirma Modal */}
      {showDiscountModal && (
        <div className="fixed  inset-0 bg-black/60 flex justify-center items-center z-50">
          <form className="relative  bg-white rounded-2xl p-6 w-70 shadow-2xl text-center animate-fadeIn">
            <button
              onClick={() => setShowDiscountModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-700 text-xl"
            >
              ✕
            </button>
            <h1 className="text-3xl font-bold">
              {text.split("").map((char, index) => (
                <span key={index} className={colors[index % colors.length]}>
                  {char}
                </span>
              ))}
            </h1>
            <h2 className="text-2xl font-bold text-blue-800 mb-6">
              Birinchi buyurtma uchun chegirma
            </h2>

            <input
              type="text"
              placeholder="Ismingiz"
              className="w-full mb-4 px-4 py-3 rounded-full bg-blue-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />

            <PhoneInput
              value={formData.phone}
              onChange={handlePhoneChange}
              error={errors.phone}
              className="w-full mb-6 px-4 py-3 rounded-full bg-blue-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />

            <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-full hover:bg-amber-400 transition">
              Yuborish
            </button>

            <p className="text-gray-500 text-sm mt-3">
              "Yuborish" tugmasini bosish orqali veb-sayt shartlariga rozilik
              bildirasiz
            </p>
          </form>
        </div>
      )}

      {/* Hero / Form Section */}
      <section
        className="relative min-h-screen flex flex-col justify-center items-center px-6 py-20 text-white overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
            url('/bg-img.webp')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-3xl mx-auto bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-100 space-y-6 "
        >
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-green-500 hover:from-green-600 hover:to-emerald-500 text-white px-10 py-3 rounded-lg font-semibold shadow-md transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Yuborilmoqda..." : currentT.titl}
            </button>
            <p className="text-sm text-gray-600 text-center sm:text-left">
              {currentT.privacy}
            </p>
          </div>

      
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner text-gray-800">
            <h3 className="font-semibold mb-2">Preview:</h3>
            <p>
              <span className="font-semibold">Name:</span> {preview.name || "-"}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {preview.phone || "-"}
            </p>
          </div>
        </form> */}
      </section>

      {/* Discount / Info Section */}
      <section className="relative flex flex-col items-center justify-center py-28 px-6 text-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-indigo-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(79,70,229,0.08),_transparent_60%)]"></div>
        <h1 className="relative text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600 drop-shadow-sm mb-6">
          {currentT.name}
        </h1>
        <div className="relative w-32 h-1.5 rounded-full bg-gradient-to-r from-emerald-400 via-indigo-500 to-purple-500 shadow-md mb-4 animate-pulse"></div>
        <p className="relative text-gray-600 max-w-2xl leading-relaxed mt-4 text-lg">
          {currentT.gil}
        </p>
      </section>

      <section className="relative bg-gradient-to-b from-gray-50 via-white to-gray-100 py-28 px-1 overflow-hidden">
        <div className="absolute inset-0 opacity-20 animate-spin-slow"></div>
        <CarpetComparison />
      </section>

      <section>
        <Services />
      </section>
    </>
  );
}

export default Home;

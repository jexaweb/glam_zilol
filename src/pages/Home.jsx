import { useState } from "react";
import { useLanguage } from "../components/LanguageContext";
import CarpetComparison from "../components/CarpetComparison";
import PhoneInput from "../components/PhoneInput";

function Home() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = {
    uz: {
      dec: "Ismingiz va telefon raqamingizni kiritib, bizga jo'nating. Tez orada sizga qo'ng'iroq qilamiz:",
      titl: "Jo'natish",
      name: "Bizda eng arzon narxlar mavjud",
      privacy: "Biz ma'lumotlaringizni maxfiy saqlaymiz.",
      placeholderName: "Ismingizni kiriting",
      submitSuccess:
        "Muvaffaqiyatli yuborildi! Tez orada sizga qo'ng'iroq qilamiz.",
      submitError: "Xatolik yuz berdi. Qayta urinib ko'ring.",
    },
    ru: {
      dec: "Введите имя и номер телефона, отправьте нам. Мы Вам перезвоним в ближайшее время:",
      titl: "Отправить",
      name: "У нас имеются скидки",
      privacy: "Мы храним ваши данные в конфиденциальности.",
      placeholderName: "Введите ваше имя",
      submitSuccess: "Успешно отправлено! Мы перезвоним вам скоро.",
      submitError: "Произошла ошибка. Попробуйте снова.",
    },
    default: {
      dec: "Enter your name and phone number and send it to us. We'll call you soon:",
      titl: "Submit",
      name: "We have the best prices",
      privacy: "We keep your data confidential.",
      placeholderName: "Enter your name",
      submitSuccess: "Submitted successfully! We'll call you soon.",
      submitError: "An error occurred. Please try again.",
    },
  };

  const currentT = t[language] || t.default;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
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
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("Submitting form data:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(currentT.submitSuccess);
      setFormData({ name: "", phone: "" });
    } catch (err) {
      alert(currentT.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-3xl mx-auto bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-100 space-y-6 "
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="sr-only">
                {currentT.placeholderName}
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={currentT.placeholderName}
                className={`w-full rounded-lg border px-5 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <PhoneInput
                value={formData.phone}
                onChange={handlePhoneChange}
                error={errors.phone}
                placeholder="+998 90 123 45 67"
              />
            </div>
          </div>

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
        </form>
      </section>

      {/* Discount / Info Section */}
      <section className="relative flex flex-col items-center justify-center py-28 px-6 text-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-indigo-50">
        {/* Orqa fon bezagi */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(79,70,229,0.08),_transparent_60%)]"></div>

        {/* Sarlavha */}
        <h1 className="relative text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600 drop-shadow-sm mb-6">
          {currentT.name}
        </h1>

        {/* Gradient chiziq */}
        <div className="relative w-32 h-1.5 rounded-full bg-gradient-to-r from-emerald-400 via-indigo-500 to-purple-500 shadow-md mb-4 animate-pulse"></div>

        {/* Qo'shimcha matn (ixtiyoriy) */}
        <p className="relative text-gray-600 max-w-2xl leading-relaxed mt-4 text-lg">
          Biz gilamlaringizni yangiday holatga keltiramiz — sifat, ishonch va
          tiniqlik bilan.
        </p>
      </section>

      {/* Carpet Comparison Section */}
      <section className="relative bg-gradient-to-b from-gray-50 via-white to-gray-100 py-28 px-1 overflow-hidden">
        {/* Orqa fon effekt (shaffof rang to‘lqinlar) */}
        <div className="absolute inset-0 opacity-20 bg-[conic-gradient(from_120deg_at_50%_50%,_rgba(99,102,241,0.15),_rgba(16,185,129,0.15),_transparent_70%)] animate-spin-slow"></div>
        <CarpetComparison />
        <div></div>
      </section>
    </>
  );
}

export default Home;

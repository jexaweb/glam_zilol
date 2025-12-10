import { useLanguage } from "./LanguageContext";

export default function PhoneInput({ value, onChange, error }) {
  const { language } = useLanguage();

  const translations = {
    uz: {
      phone: "Telefon raqamingiz",
    },
    ru: {
      phone: "Номер телефона",
    },
  };

  const t = translations[language] || translations["uz"];
  const handleChange = (e) => {
    let val = e.target.value;

    // Faqat raqam va + qoldiramiz
    val = val.replace(/[^0-9+]/g, "");

    // +998 ni saqlab qolish
    if (!val.startsWith("+998")) {
      val = "+998" + val.replace(/\D/g, "");
    }

    // +998 dan keyingi raqamlar
    const digits = val.replace(/\D/g, "").slice(3);

    // Formatlash
    let formatted = "+998";

    if (digits.length >= 1)
      formatted += " (" + digits.slice(0, 2).padEnd(2, "_") + ")";
    if (digits.length >= 3)
      formatted += " " + digits.slice(2, 5).padEnd(3, "_");
    if (digits.length >= 6)
      formatted += "-" + digits.slice(5, 7).padEnd(2, "_");
    if (digits.length >= 8)
      formatted += "-" + digits.slice(7, 9).padEnd(2, "_");

    onChange(formatted);
  };

  return (
    <div className="w-full">
      <input
        type="tel"
        value={value}
        name="name"
        placeholder={t.phone}
        onChange={handleChange}
        className="w-full mb-6 px-4 py-3 rounded-full bg-blue-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

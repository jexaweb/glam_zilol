// src/components/PhoneInput.jsx
export default function PhoneInput({ value, onChange, error }) {
  const handleChange = (e) => {
    let val = e.target.value;

    // Faqat raqam va + belgilar qoldiriladi
    val = val.replace(/[^0-9+]/g, "");

    // +998 bilan boshlanishini ta'minlash
    if (!val.startsWith("+998")) {
      val = "+998";
    }

    // Formatlash: +998 90 123 45 67
    const digits = val.replace(/\D/g, "").slice(3); // +998 olib tashlash
    let formatted = "+998";

    if (digits.length > 0) formatted += " (" + digits.slice(0, 2) + ")";
    if (digits.length >= 3) formatted += "- " + digits.slice(2, 5);
    if (digits.length >= 6) formatted += "-" + digits.slice(5, 7);
    if (digits.length >= 8) formatted += "-" + digits.slice(7, 9);

    // Agar foydalanuvchi inputni to‘liq o‘chirsa ham default placeholder ko‘rinadi
    if (digits.length === 0) formatted = "+998(_)___-__-__";

    onChange(formatted);
  };

  return (
    <div className="w-full">
      <input
        type="tel"
        value={value || "Telefon Raqamingiz"}
        onChange={handleChange}
        placeholder="Telfon raqam"
        className="w-full mb-6 px-4 py-3 rounded-full bg-blue-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

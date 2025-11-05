// src/components/PhoneInput.jsx
export default function PhoneInput({ value, onChange, error }) {
  const handleChange = (e) => {
    let val = e.target.value;

    // Faqat raqam va + belgilar qoldiriladi
    val = val.replace(/[^0-9+]/g, "");

    // +998 bilan boshlanishini ta'minlash
    if (!val.startsWith("+998")) {
      val = "+998 ";
    }

    // Formatlash: +998 90 123 45 67
    let digits = val.replace(/\D/g, "").slice(3); // +998 olib tashlash
    let formatted = "+998";
    if (digits.length > 0) formatted += " " + digits.slice(0, 2);
    if (digits.length >= 3) formatted += " " + digits.slice(2, 5);
    if (digits.length >= 6) formatted += " " + digits.slice(5, 7);
    if (digits.length >= 8) formatted += " " + digits.slice(7, 9);

    // Agar foydalanuvchi inputni to‘liq o‘chirsa ham +998 qolsin
    if (formatted === "") formatted = "+998 ";

    onChange(formatted);
  };

  return (
    <div>
      <input
        type="tel"
        value={value || "+998 "}
        onChange={handleChange}
        placeholder="+998 90 123 45 67"
        className={`w-full rounded-lg border px-5 py-3 text-gray-700 placeholder-gray-400 
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "./LanguageContext";

function EmailForm() {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const { language } = useLanguage();

  const translations = {
    uz: {
      name: "Ismingiz",
      phone: "Telefon raqamingiz",
      address: "Manzilingiz (masalan: Farg‘ona, Marg‘ilon)",
      message: "Xabaringizni kiriting...",
      send: "Yuborish",
      success: "✅ Ma’lumot muvaffaqiyatli yuborildi!",
      error: "❌ Xatolik yuz berdi, qayta urinib ko‘ring!",
    },
    ru: {
      name: "Имя",
      phone: "Номер телефона",
      address: " Aдрес (например: Фергана, Маргилан)",
      message: " Cообщение...",
      send: "Отправить",
      success: "✅ Данные успешно отправлены!",
      error: "❌ Произошла ошибка, попробуйте снова!",
    },
  };

  const t = translations[language] || translations["uz"];

  // Telefon formatlash
  const formatPhone = (val) => {
    val = val.replace(/\D/g, "");
    if (!val.startsWith("998")) val = "998" + val;
    const d = val.slice(3);

    let f = "+998";
    if (d.length > 0) f += " (" + d.slice(0, 2).padEnd(2, "_") + ")";
    if (d.length > 2) f += " " + d.slice(2, 5).padEnd(3, "_");
    if (d.length > 5) f += "-" + d.slice(5, 7).padEnd(2, "_");
    if (d.length > 7) f += "-" + d.slice(7, 9).padEnd(2, "_");

    return f;
  };

  const handleChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "");
    const formatted = formatPhone(digits);
    setPhone(formatted);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    emailjs
      .sendForm(
        "service_u8uok6n",
        "template_l0no0ke",
        form.current,
        "yqeQcMyCRd4i1twMv"
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus(t.success);
          setLoading(false);
          e.target.reset();
          setPhone("");
        },
        (error) => {
          console.error(error.text);
          setStatus(t.error);
          setLoading(false);
        }
      );
  };

  return (
    <div className="flex items-center justify-center mt-15">
      <form
        ref={form}
        onSubmit={sendEmail}
        className="w-full flex flex-col gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder={t.name}
          required
          className="w-full px-4 py-3 rounded-full border-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none text-white placeholder-white transition"
        />

        <input
          type="tel"
          name="name"
          value={phone}
          onChange={handleChange}
          placeholder={t.phone}
          required
          className="w-full px-4 py-3 rounded-full border-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none text-white placeholder-white transition"
        />

        <input
          type="text"
          name="message"
          placeholder={t.address}
          required
          className="w-full px-4 py-3 rounded-full border-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none text-white placeholder-white transition"
        />

        <textarea
          name="message"
          placeholder={t.message}
          rows="4"
          className="w-full px-4 py-3 rounded-2xl border-2 focus:ring-2 focus:ring-amber-300 focus:border-amber-400 outline-none text-white placeholder-white resize-none transition"
        ></textarea>

        <button
          type="submit"
          className="mt-2 bg-amber-400 text-black font-semibold py-3 rounded-4xl hover:bg-white transition shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          {loading
            ? language === "ru"
              ? "Отправка..."
              : "Yuborilmoqda..."
            : t.send}
        </button>

        {status && (
          <p className="text-center mt-2 text-white font-medium">{status}</p>
        )}
      </form>
    </div>
  );
}

export default EmailForm;

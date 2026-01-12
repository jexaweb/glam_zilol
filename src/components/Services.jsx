import { AiFillInstagram } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { GrPhone } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { useLanguage } from "./LanguageContext";

function Services() {
  const { language } = useLanguage();
  const translations = {
    uz: {
      name: "Bizga buyutma qoldiring va biz sizga tez orada javob beramiz",
      prind: " Yoki boshqa usullar bilan bog‘laning",
    },
    ru: {
      name: "Оставьте заявку нам и мы ответим вам в скорейшем времени",
      prind: "или свяжитесь другими способами",
    },
  };
  const t = translations[language] || translations["uz"];
  return (
    <div className="mt-5">
      {/* Header */}
      <h2 className="text-3xl sm:text-3xl md:text-5xl lg:text-4xl font-bold mb-4 leading-snug">
        {t.name}
      </h2>

      <p className="text-amber-300 text-sm sm:text-base mb-8">{t.prind}</p>

      {/* Contact Buttons */}
      <div className="flex flex-col gap-5">
        {/* Phone */}
        <div className="flex items-center gap-3 group">
          <div className="text-3xl text-amber-300 border-2 border-white group-hover:bg-white px-3 py-3 bg-transparent rounded-full">
            <GrPhone />
          </div>

          <a
            href="tel:+998732001313"
            className="py-4 px-5 bg-white text-blue-700 rounded-full group-hover:bg-amber-400 text-center w-56"
          >
            +998 73 200 13 13
          </a>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 group">
          <div className="text-3xl text-amber-300 border-2 border-white group-hover:bg-white px-3 py-3 bg-transparent rounded-full">
            <MdEmail />
          </div>

          <a
            href="mailto:zilol@gmail.com"
            className="py-4 px-5 bg-white text-blue-700 rounded-full group-hover:bg-amber-400 text-center w-56"
          >
            zilol@gmail.com
          </a>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex gap-6 mt-10">
        <a
          href="https://t.me/Gilam_yuvish_Zilol"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-4xl border-[6px] border-white hover:border-amber-400 px-3 py-3 bg-white hover:bg-amber-400 rounded-full transition"
        >
          <FaTelegramPlane />
        </a>

        <a
          href="https://www.instagram.com/zilolgilam_yuvish/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-4xl border-[6px] border-white hover:border-amber-400 px-3 py-3 bg-white hover:bg-amber-400 rounded-full transition"
        >
          <AiFillInstagram />
        </a>
        <a
          href="https://youtube.com/@zilolgilamyuvish-e4c?si=1M-D21xwplat6ya7"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-4xl border-[6px] border-white hover:border-amber-400 px-3 py-3 bg-white hover:bg-amber-400 rounded-full transition"
        >
          <FaYoutube />
        </a>
      </div>
    </div>
  );
}

export default Services;

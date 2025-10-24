import CarpetComparison from "../components/CarpetComparison";
import { useLanguage } from "../components/LanguageContext";
import Universe from "../components/Universe";

function Home() {
  const { language, toggleLanguage } = useLanguage();

  const t = {
    uz: {
      dec: "Ismingiz va telefon raqamingizni kiritib, bizga jo'nating. Tez orada sizga qo'ng'iroq qilamiz:",
      titl: "Jo'natish",
      name: "Bizda eng arzon narxlar mavjud",
    },
    ru: {
      dec: "Введите имя и номер телефона, отправьте нам. Мы Вам перезвоним в ближайшее время:",
      titl: "отправить",
      name: "У нас имеются скидки",
    },
  };
  return (
    <>
      <section className="min-h-screen flex flex-col items-center  from-blue-50 to-blue-100 ">
        <div className="flex items-center justify-center mb-6">
          <img src="./zilol-msh.png" alt="zilol-logo" />
        </div>

        {/* Description */}
        <div className="text-center max-w-md mb-8 mt-20 ">
          <p className="text-2xl font-medium text-white ">{t[language].dec}</p>
        </div>

        <form className="w-full max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <input
                name="name"
                className="block w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ismingizni kiriting"
                required
              />
            </label>
            <label className="flex flex-col">
              <input
                name="phone"
                className="block w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="+998 9x xxx xx xx"
                inputMode="tel"
                required
              />
            </label>
          </div>
          <div className="mt-6 flex items-center justify-between gap-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-2 rounded-md font-semibold hover:opacity-95"
            >
              {t[language].titl}
            </button>

            <div className="text-sm text-gray-500">
              Biz ma'lumotlaringizni maxfiy saqlaymiz.
            </div>
          </div>
        </form>

        <CarpetComparison />
      </section>
      <Universe />
      <div className="universe flex items-center justify-center px-10 py-10">
        <h1>{t[language].name}</h1>
      </div>
      <div className=" flex justify-center items-center">
        <img src="" alt="" />
      </div>
    </>
  );
}

export default Home;

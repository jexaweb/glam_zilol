import EmailForm from "./EmailForm";
import Services from "../components/Services";

function Footer() {
  return (
    <footer className="w-full bg-[linear-gradient(135deg,#059669,#4338ca,#7e22ce)] text-white ">
      <div className="max-w-1xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-10   ">
        {/* Services bo'limi */}
        <div className="  ">
          <Services />
        </div>

        {/* Email Form bo'limi */}
        <div className="">
          <EmailForm />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 text-center sm:text-left mt-10 pr-10 pl-10">
        <h1 className=" text-9xl font-extrabold text-amber-400 mb-10">ZILOL</h1>

        <p className="text-gray-400 text-sm">
          © 2025 ZILOL GILAM YUVISH KORXONASI
        </p>

        <a href="#" className=" text-sm text-white transition">
          Made by KY
        </a>
      </div>
    </footer>
  );
}

export default Footer;

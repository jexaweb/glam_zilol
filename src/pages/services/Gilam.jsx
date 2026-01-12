import { useState } from "react";
import TariffCard from "../../components/TariffCard";
import { tariffDescriptions } from "../../hook/tariffData";

export default function Gilam() {
  // ---------------- STATE ----------------
  const [selectedMainTariff, setSelectedMainTariff] = useState(null);
  const [selectedExtra, setSelectedExtra] = useState({});

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  // ---------------- VIDEOS ----------------
  const videos = [
    "/videos/gilam.mp4",
    "/videos/gilam2.mp4",
    "/videos/gilam3.mp4",
  ];

  // ---------------- TARIFLAR ----------------
  const gilamTariffs = [
    { id: 1, title: "Oddiy", price: "50 000 so'm", desc: tariffDescriptions.basic },
    { id: 2, title: "Premium", price: "100 000 so'm", desc: tariffDescriptions.premium },
    { id: 3, title: "Premium Pro", price: "200 000 so'm", desc: tariffDescriptions.premiumPro },
  ];

  const otherServices = {
    parda: ["80 000 so'm", "150 000 so'm", "200 000 so'm"],
    yakkandoz: ["30 000 so'm", "60 000 so'm", "100 000 so'm"],
    korpa: ["30 000 so'm", "50 000 so'm", "80 000 so'm"],
    matras: ["40 000 so'm", "70 000 so'm", "120 000 so'm"],
    mebel: ["50 000 so'm", "100 000 so'm", "180 000 so'm"],
  };

  const handleExtraSelect = (serviceName, price) => {
    setSelectedExtra((prev) => ({ ...prev, [serviceName]: price }));
  };

  // ---------------- HISOB ----------------
  const toNumber = (str) => parseInt(str.replace(/\D/g, ""), 10);
  let total = 0;

  if (selectedMainTariff) {
    const price = gilamTariffs.find((t) => t.id === selectedMainTariff).price;
    total += toNumber(price);
  }

  Object.values(selectedExtra).forEach((price) => {
    total += toNumber(price);
  });

  // ---------------- SUBMIT ----------------
  const handleSubmit = () => {
    if (!name || !phone || !address || !pickupDate || !pickupTime) {
      alert("❗ Iltimos barcha maydonlarni to‘ldiring");
      return;
    }

    alert("✅ Buyurtmangiz qabul qilindi!");

    setName("");
    setPhone("");
    setAddress("");
    setPickupDate("");
    setPickupTime("");
    setSelectedMainTariff(null);
    setSelectedExtra({});
  };

  return (
    <div className="p-6 mt-24 max-w-7xl mx-auto">

      {/* 3 TA VIDEO (TELEFON FORMAT) */}
      <div className="grid grid-cols-3 gap-3 mb-10">
        {videos.map((video, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden shadow-lg bg-black"
          >
            <video
              src={video}
              controls
              playsInline
              className="w-full h-[260px] object-cover"
            />
          </div>
        ))}
      </div>

      <h1 className="text-3xl font-bold mb-6">Gilam — Tarif tanlang</h1>

      {/* TARIFLAR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {gilamTariffs.map((t) => (
          <TariffCard
            key={t.id}
            title={t.title}
            price={t.price}
            desc={t.desc}
            selected={selectedMainTariff === t.id}
            onSelect={() => setSelectedMainTariff(t.id)}
          />
        ))}
      </div>

      {/* QO‘SHIMCHA XIZMATLAR */}
      {selectedMainTariff && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Qo‘shimcha xizmatlar</h2>

          {Object.keys(otherServices).map((serviceKey) => (
            <div key={serviceKey} className="mb-6">
              <h3 className="font-semibold text-lg capitalize mb-2">
                {serviceKey}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {otherServices[serviceKey].map((price, idx) => (
                  <TariffCard
                    key={idx}
                    title={`${serviceKey} xizmati`}
                    price={price}
                    desc="Olib ketib, yuvib qaytarib beramiz"
                    selected={selectedExtra[serviceKey] === price}
                    onSelect={() => handleExtraSelect(serviceKey, price)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* NATIJA + FORM */}
      {(selectedMainTariff || Object.keys(selectedExtra).length > 0) && (
        <div className="mt-10 p-6 border rounded-2xl bg-gray-100 space-y-4">
          <div className="p-3 bg-white rounded-lg font-bold text-lg">
            Jami: <span className="text-blue-700">{total.toLocaleString()} so'm</span>
          </div>

          <input
            type="text"
            placeholder="Ismingiz"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="tel"
            placeholder="Telefon raqamingiz"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <textarea
            placeholder="Manzilingiz"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold"
          >
            Buyurtmani jo‘natish
          </button>
        </div>
      )}
    </div>
  );
}

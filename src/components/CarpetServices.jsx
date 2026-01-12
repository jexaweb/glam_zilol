// src/components/CarpetServices.jsx
import React, { useState } from "react";

const serviceTypes = [
  "Gilam Yuvish",
  "Mebel Yuvish",
  "Pardalar Yuvish",
  "Kovrolin Tozalash",
  "Ortopedik Matras Yuvish",
  "Avtomobil Jyolti Yuvish",
  "Kafellar Tozalash",
  "Ofis Gilamlarini Yuvish",
  "Uy Tozalash Xizmati",
  "Antiseptik Tozalash"
];

const tariffs = [
  { title: "1 xil", price: "50 000 so'm", desc: "Oddiy eshikdan olish & yetkazish" },
  { title: "2 xil", price: "100 000 so'm", desc: "Yig'ib olish & yetkazish" },
  { title: "3 xil", price: "200 000 so'm", desc: "Ustini bo‘shatib yig‘ib olish & yetkazish" },
];

export default function CarpetServices() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleTariffs = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Zilol Xizmatlar</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceTypes.map((service, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow-lg cursor-pointer transition hover:shadow-xl"
            onClick={() => toggleTariffs(index)}
          >
            <h2 className="text-xl font-semibold mb-2">{service}</h2>
            <p className="text-gray-600">Bosib tariflarni ko‘ring 👇</p>

            {openIndex === index && (
              <div className="mt-4 border-t pt-3">
                {tariffs.map((t, i) => (
                  <div key={i} className="border-b pb-3 mb-3">
                    <p className="font-bold">{t.title} — {t.price}</p>
                    <p className="text-sm text-gray-600">{t.desc}</p>
                  </div>
                ))}

                <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Buyurtma berish
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

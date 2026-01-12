export default function Ofis() {
  const tariffs = [
    { name: "Kichik ofis (50m² gacha)", price: "200 000 so'm" },
    { name: "O'rta ofis (100m² gacha)", price: "350 000 so'm" },
    { name: "Katta ofis (100m²+)", price: "Kelishuv asosida" }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ofis Gilamlarini Tozalash Tariflari</h1>

      {tariffs.map((t, i) => (
        <div key={i} className="border p-3 mb-3 rounded-md">
          <p className="font-bold">{t.name}</p>
          <p>{t.price}</p>
        </div>
      ))}
    </div>
  );
}

export default function Matras() {
  const tariffs = [
    { name: "Yuvish (1 o'rinlik)", price: "40 000 so'm" },
    { name: "Yuvish (2 o'rinlik)", price: "70 000 so'm" },
    { name: "Yuvish (Katta matras)", price: "120 000 so'm" }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Matras Yuvish Tariflari</h1>

      {tariffs.map((t, i) => (
        <div key={i} className="border p-3 mb-3 rounded-md">
          <p className="font-bold">{t.name}</p>
          <p>{t.price}</p>
        </div>
      ))}
    </div>
  );
}

export default function Parda() {
  const tariffs = [
    { name: "30 kg gacha", price: "80 000 so'm" },
    { name: "50 kg gacha", price: "150 000 so'm" },
    { name: "100 kg gacha", price: "200 000 so'm" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Parda Yuvish Tariflari</h1>

      {tariffs.map((t, i) => (
        <div key={i} className="border p-3 mb-3 rounded-md">
          <p className="font-bold">{t.name}</p>
          <p>{t.price}</p>
        </div>
      ))}
    </div>
  );
}

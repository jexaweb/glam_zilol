export default function Korpa() {
  const tariffs = [
    { name: "1 dona (kichik)", price: "30 000 so'm" },
    { name: "2 dona (o'rta)", price: "50 000 so'm" },
    { name: "3 dona (katta)", price: "80 000 so'm" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ko'rpa Yuvish Tariflari</h1>

      {tariffs.map((t, i) => (
        <div key={i} className="border p-3 mb-3 rounded-md">
          <p className="font-bold">{t.name}</p>
          <p>{t.price}</p>
        </div>
      ))}
    </div>
  );
}


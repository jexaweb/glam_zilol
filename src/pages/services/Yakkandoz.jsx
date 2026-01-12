export default function Yakkandoz() {
  const tariffs = [
    { name: "1 dona (kichik)", price: "25 000 so'm" },
    { name: "2 dona (o'rta)", price: "45 000 so'm" },
    { name: "3 dona (katta)", price: "70 000 so'm" }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Yakkandoz Yuvish Tariflari</h1>

      {tariffs.map((t, i) => (
        <div key={i} className="border p-3 mb-3 rounded-md">
          <p className="font-bold">{t.name}</p>
          <p>{t.price}</p>
        </div>
      ))}
    </div>
  );
}

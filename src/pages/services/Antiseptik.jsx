export default function Antiseptik() {
  const tariffs = [
    { name: "1 xona", price: "150 000 so'm" },
    { name: "2 xona", price: "250 000 so'm" },
    { name: "3+ xona", price: "Kelishuv asosida" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Antiseptik Tozalash Tariflari</h1>
      
      {tariffs.map((t, i) => (
        <div key={i} className="border p-3 mb-3 rounded-md">
          <p className="font-bold">{t.name}</p>
          <p>{t.price}</p>
        </div>
      ))}
    </div>
  );
}

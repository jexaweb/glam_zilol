export default function Avto() {
  const tariffs = [
    { name: "Old o'rindiqlar", price: "80 000 so'm" },
    { name: "Old + Orqa", price: "150 000 so'm" },
    { name: "To'liq salon", price: "250 000 so'm" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Avto Salon Yuvish Tariflari</h1>

      {tariffs.map((t, i) => (
        <div key={i} className="border p-3 mb-3 rounded-md">
          <p className="font-bold">{t.name}</p>
          <p>{t.price}</p>
        </div>
      ))}
    </div>
  );
}

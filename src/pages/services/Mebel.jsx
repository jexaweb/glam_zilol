export default function Mebel() {
  const tariffs = [
    { name: "Kreslo (1 dona)", price: "40 000 so'm" },
    { name: "Divan (2 o'rinlik)", price: "80 000 so'm" },
    { name: "Divan (3 o'rinlik)", price: "120 000 so'm" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mebel Yuvish Tariflari</h1>

      {tariffs.map((t, i) => (
        <div key={i} className="border p-3 mb-3 rounded-md">
          <p className="font-bold">{t.name}</p>
          <p>{t.price}</p>
        </div>
      ))}
    </div>
  );
}

export default function TariffCard({ title, price, desc, selected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`border p-4 rounded-xl cursor-pointer transition 
      ${selected ? "bg-blue-600 text-white" : "hover:border-blue-500"}`}
    >
      <p className="font-bold text-lg">{title} — {price}</p>
      <p className="text-sm mt-1">{desc}</p>
    </div>
  );
}

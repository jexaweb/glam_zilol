import { Link } from "react-router-dom";

export default function ServiceCard({ title, video, link }) {
  return (
    <Link to={link}>
      <div className="bg-blue-500 shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition">
        <video src={`/videos/${video}`} autoPlay loop muted className="w-full h-100  object-cover"/>
        <div className="p-4 text-center font-bold text-lg">{title}</div>
      </div>
    </Link>
  );
}

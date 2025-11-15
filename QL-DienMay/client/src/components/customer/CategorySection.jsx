import { danhmuc } from "../../data";
import { useNavigate } from "react-router-dom";

export default function CategorySection() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto p-4 bg-white rounded-3xl border-2 border-[#ffc300]">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8">
        {danhmuc.map((cat, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/danh-muc/${cat.slug}`)}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer text-center transform hover:-translate-y-2 hover:scale-105 hover:bg-[#fff4c8]"
          >
            <div className="w-6 h-6 mb-3 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300 hover:bg-yellow-100">
              <img
                src={cat.img}
                alt={cat.name}
                className="w-3/3 h-3/3 object-contain transition-transform duration-300 hover:scale-110"
              />
            </div>
            <span className="text-base font-semibold text-gray-700 hover:text-primary transition-colors duration-300">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

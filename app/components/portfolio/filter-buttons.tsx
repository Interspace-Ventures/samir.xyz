import { categories } from "../../data/portfolio";

interface FilterButtonsProps {
  selectedCategory: string;
  onChange: (category: string) => void;
}

export default function FilterButtons({ selectedCategory, onChange }: FilterButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`px-4 py-2 rounded-md ${
            selectedCategory === category
              ? "bg-purple-700 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
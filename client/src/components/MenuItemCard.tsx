import { Badge } from "@/components/ui/badge";

interface MenuItemCardProps {
  id: string;
  name: string;
  price: number;
  category: string;
  available?: boolean;
  image?: string;
  isVeg?: boolean;
  foodType?: 'veg' | 'non-veg' | 'egg';
  onAdd: (id: string) => void;
}

export default function MenuItemCard({
  id,
  name,
  price,
  category,
  available = true,
  image,
  isVeg = true,
  foodType,
  onAdd,
}: MenuItemCardProps) {
  const type = foodType || (isVeg ? 'veg' : 'non-veg');
  const borderColor = type === 'veg' ? 'bg-green-500' : type === 'egg' ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:border-primary hover:scale-[1.01] active:scale-[0.99] transition-all duration-150 relative ${
        !available ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={() => available && onAdd(id)}
      data-testid={`menu-item-${id}`}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${borderColor}`}></div>
      <div className="p-2.5 pl-3 relative">
        {!available && (
          <Badge className="absolute top-1 right-1 bg-red-500 text-white shadow-md text-xs px-1.5 py-0">
            Out of Stock
          </Badge>
        )}
        <h3 className="font-semibold text-gray-900 text-sm mb-0.5 line-clamp-2 min-h-[2.5rem]" data-testid={`text-item-name-${id}`}>
          {name}
        </h3>
        <p className="text-[10px] text-gray-500 mb-1.5 font-medium uppercase tracking-wide">{category}</p>
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-primary" data-testid={`text-price-${id}`}>
            ₹{price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
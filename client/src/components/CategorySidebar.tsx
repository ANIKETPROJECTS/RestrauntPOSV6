import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  icon?: string;
}

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function CategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategorySidebarProps) {
  return (
    <div className="h-full bg-card border-r border-card-border flex flex-col">
      <div className="p-3 border-b border-card-border">
        <h2 className="font-semibold text-card-foreground text-sm">Categories</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-1.5">
        {categories.map((category) => (
          <button
            key={category.id}
            data-testid={`category-${category.id}`}
            onClick={() => onSelectCategory(category.id)}
            className={cn(
              "w-full text-left px-2.5 py-2 rounded-lg mb-1 transition-colors hover-elevate active-elevate-2 text-sm",
              selectedCategory === category.id
                ? "bg-primary text-primary-foreground"
                : "text-card-foreground"
            )}
          >
            <span className="font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
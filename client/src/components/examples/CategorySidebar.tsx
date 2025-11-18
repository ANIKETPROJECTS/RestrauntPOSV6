import { useState } from "react";
import CategorySidebar from "../CategorySidebar";

export default function CategorySidebarExample() {
  const [selectedCategory, setSelectedCategory] = useState("fast-food");

  const categories = [
    { id: "all", name: "All Items" },
    { id: "fast-food", name: "Fast Food" },
    { id: "beverages", name: "Beverages" },
    { id: "burgers", name: "Burgers" },
    { id: "pizza", name: "Pizza" },
    { id: "desserts", name: "Desserts" },
    { id: "salads", name: "Salads" },
  ];

  return (
    <div className="h-screen">
      <CategorySidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(id) => {
          console.log("Category selected:", id);
          setSelectedCategory(id);
        }}
      />
    </div>
  );
}
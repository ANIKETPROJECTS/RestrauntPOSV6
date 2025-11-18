import MenuItemCard from "../MenuItemCard";

export default function MenuItemCardExample() {
  const items = [
    {
      id: "1",
      name: "Chicken Burger",
      price: 199,
      category: "Burgers",
      available: true,
    },
    {
      id: "2",
      name: "Veggie Pizza",
      price: 299,
      category: "Pizza",
      available: true,
    },
    {
      id: "3",
      name: "French Fries",
      price: 99,
      category: "Fast Food",
      available: false,
    },
  ];

  return (
    <div className="p-6 grid grid-cols-3 gap-4">
      {items.map((item) => (
        <MenuItemCard
          key={item.id}
          {...item}
          onAdd={(id) => console.log("Added item:", id)}
        />
      ))}
    </div>
  );
}
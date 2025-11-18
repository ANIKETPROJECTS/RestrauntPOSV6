import TableCard from "../TableCard";

export default function TableCardExample() {
  const tables = [
    { id: "1", tableNumber: "T1", status: "available" as const, seats: 4 },
    { id: "2", tableNumber: "T2", status: "occupied" as const, seats: 6, currentGuests: 4 },
    { id: "3", tableNumber: "T3", status: "reserved" as const, seats: 4 },
    { id: "4", tableNumber: "T4", status: "billed" as const, seats: 2, currentGuests: 2 },
  ];

  return (
    <div className="p-6 flex gap-4 flex-wrap">
      {tables.map((table) => (
        <TableCard
          key={table.id}
          {...table}
          onClick={(id) => console.log("Table clicked:", id)}
        />
      ))}
    </div>
  );
}
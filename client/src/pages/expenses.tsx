import { useState } from "react";
import { Plus, Calendar } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  paymentMethod: string;
}

export default function ExpensesPage() {
  const [expenses] = useState<Expense[]>([
    { id: "1", category: "Rent", description: "Monthly rent payment", amount: 25000, date: "2024-01-01", paymentMethod: "Bank Transfer" },
    { id: "2", category: "Utilities", description: "Electricity bill", amount: 3500, date: "2024-01-05", paymentMethod: "Cash" },
    { id: "3", category: "Supplies", description: "Kitchen supplies purchase", amount: 8200, date: "2024-01-10", paymentMethod: "Card" },
    { id: "4", category: "Salaries", description: "Staff salaries", amount: 45000, date: "2024-01-15", paymentMethod: "Bank Transfer" },
    { id: "5", category: "Maintenance", description: "AC repair", amount: 2500, date: "2024-01-18", paymentMethod: "Cash" },
  ]);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Expenses Management" />
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold">₹{totalExpenses.toLocaleString()}</h3>
            <p className="text-sm text-muted-foreground">Total Expenses This Month</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Calendar className="h-4 w-4 mr-2" />This Month</Button>
            <Button data-testid="button-add-expense"><Plus className="h-4 w-4 mr-2" />Add Expense</Button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-card rounded-lg border border-card-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Description</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Amount</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} className="border-b border-border last:border-0 hover-elevate">
                  <td className="py-3 px-4 text-muted-foreground">{expense.date}</td>
                  <td className="py-3 px-4"><Badge variant="outline">{expense.category}</Badge></td>
                  <td className="py-3 px-4">{expense.description}</td>
                  <td className="py-3 px-4 text-right font-semibold">₹{expense.amount.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center text-sm text-muted-foreground">{expense.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
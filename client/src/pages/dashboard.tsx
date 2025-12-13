import { DollarSign, ShoppingCart, Users, TrendingUp, Clock, CheckCircle, Utensils, ArrowUpRight, ArrowDownRight } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";
import type { Order, Table } from "@shared/schema";

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'];

export default function DashboardPage() {
  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ['/api/orders'],
  });

  const { data: tables = [] } = useQuery<Table[]>({
    queryKey: ['/api/tables'],
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaysOrders = orders.filter(order => {
    const orderDate = new Date(order.createdAt);
    orderDate.setHours(0, 0, 0, 0);
    return orderDate.getTime() === today.getTime();
  });

  const todaysSales = todaysOrders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const pendingOrders = orders.filter(o => ['new', 'preparing', 'ready'].includes(o.status)).length;
  const occupiedTables = tables.filter(t => t.status !== 'available').length;
  const avgOrderValue = todaysOrders.length > 0 ? Math.round(todaysSales / todaysOrders.length) : 0;

  const hourlyData = Array.from({ length: 12 }, (_, i) => {
    const hour = 9 + i;
    const hourOrders = todaysOrders.filter(order => {
      const orderHour = new Date(order.createdAt).getHours();
      return orderHour === hour;
    });
    return {
      hour: hour <= 12 ? `${hour}AM` : `${hour - 12}PM`,
      orders: hourOrders.length || Math.floor(Math.random() * 30) + 5,
      revenue: hourOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0) || Math.floor(Math.random() * 5000) + 1000,
    };
  });

  const weeklyData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => ({
    day,
    sales: Math.floor(Math.random() * 30000) + 15000,
    orders: Math.floor(Math.random() * 80) + 40,
  }));

  const categoryData = [
    { name: 'Main Course', value: 35, color: '#10B981' },
    { name: 'Starters', value: 25, color: '#3B82F6' },
    { name: 'Beverages', value: 20, color: '#F59E0B' },
    { name: 'Desserts', value: 12, color: '#EC4899' },
    { name: 'Sides', value: 8, color: '#8B5CF6' },
  ];

  const paymentData = [
    { name: 'Cash', value: 45, color: '#10B981' },
    { name: 'Card', value: 35, color: '#3B82F6' },
    { name: 'UPI', value: 15, color: '#F59E0B' },
    { name: 'Other', value: 5, color: '#8B5CF6' },
  ];

  const topItems = [
    { name: 'Butter Chicken', orders: 42, revenue: 12600 },
    { name: 'Paneer Tikka', orders: 38, revenue: 7600 },
    { name: 'Biryani', orders: 35, revenue: 10500 },
    { name: 'Naan', orders: 65, revenue: 3250 },
    { name: 'Dal Makhani', orders: 28, revenue: 5600 },
  ];

  const recentOrders = orders.slice(0, 5).map((order, index) => ({
    id: `#${String(order.id).padStart(3, '0')}`,
    table: `T${order.tableId}`,
    time: getTimeAgo(order.createdAt),
    status: order.status,
    total: order.total || 0,
  }));

  function getTimeAgo(dateString: string | Date): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      new: 'bg-red-500 text-white',
      preparing: 'bg-amber-500 text-white',
      ready: 'bg-green-500 text-white',
      served: 'bg-blue-500 text-white',
      completed: 'bg-gray-500 text-white',
    };
    return (
      <Badge className={styles[status] || 'bg-gray-500 text-white'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <AppHeader title="Dashboard" showSearch={true} />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">Today's Sales</p>
                  <h3 className="text-3xl font-bold mt-1">₹{todaysSales.toLocaleString() || '45,320'}</h3>
                  <div className="flex items-center gap-1 mt-2 text-emerald-100">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="text-sm">+12.5% from yesterday</span>
                  </div>
                </div>
                <div className="bg-white/20 p-3 rounded-xl">
                  <DollarSign className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Today's Orders</p>
                  <h3 className="text-3xl font-bold mt-1">{todaysOrders.length || 156}</h3>
                  <div className="flex items-center gap-1 mt-2 text-blue-100">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="text-sm">+8.2% from yesterday</span>
                  </div>
                </div>
                <div className="bg-white/20 p-3 rounded-xl">
                  <ShoppingCart className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm font-medium">Total Customers</p>
                  <h3 className="text-3xl font-bold mt-1">89</h3>
                  <div className="flex items-center gap-1 mt-2 text-amber-100">
                    <ArrowDownRight className="h-4 w-4" />
                    <span className="text-sm">-3.1% from yesterday</span>
                  </div>
                </div>
                <div className="bg-white/20 p-3 rounded-xl">
                  <Users className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Avg Order Value</p>
                  <h3 className="text-3xl font-bold mt-1">₹{avgOrderValue || 290}</h3>
                  <div className="flex items-center gap-1 mt-2 text-purple-100">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="text-sm">+5.4% from yesterday</span>
                  </div>
                </div>
                <div className="bg-white/20 p-3 rounded-xl">
                  <TrendingUp className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Hourly Orders & Revenue Chart */}
          <Card className="lg:col-span-2 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                Hourly Orders & Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={hourlyData}>
                  <defs>
                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="hour" stroke="#6B7280" fontSize={12} />
                  <YAxis yAxisId="left" stroke="#3B82F6" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="#10B981" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                    labelStyle={{ color: '#9CA3AF' }}
                  />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorOrders)" name="Orders" />
                  <Area yAxisId="right" type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue (₹)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium">Completed</span>
                </div>
                <span className="text-2xl font-bold text-green-600">{completedOrders || 124}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500 rounded-lg">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium">Pending</span>
                </div>
                <span className="text-2xl font-bold text-amber-600">{pendingOrders || 18}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Utensils className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium">Tables Occupied</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">{occupiedTables}/{tables.length || 12}</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="text-sm text-muted-foreground mb-1">Avg Preparation Time</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">12 min</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Weekly Sales Bar Chart */}
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                Weekly Sales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Sales']}
                  />
                  <Bar dataKey="sales" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution Pie Chart */}
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-pink-500"></div>
                Sales by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                    formatter={(value: number) => [`${value}%`, 'Share']}
                  />
                  <Legend 
                    layout="vertical" 
                    align="right" 
                    verticalAlign="middle"
                    iconSize={8}
                    iconType="circle"
                    formatter={(value) => <span className="text-xs">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Payment Methods Pie Chart */}
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={paymentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {paymentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                    formatter={(value: number) => [`${value}%`, 'Share']}
                  />
                  <Legend 
                    layout="vertical" 
                    align="right" 
                    verticalAlign="middle"
                    iconSize={8}
                    iconType="circle"
                    formatter={(value) => <span className="text-xs">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Selling Items */}
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                Top Selling Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topItems.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                        index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                        index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700' :
                        'bg-gradient-to-br from-slate-400 to-slate-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.orders} orders</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-green-600">₹{item.revenue.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-violet-500"></div>
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground text-sm">Order</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground text-sm">Table</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground text-sm">Time</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground text-sm">Status</th>
                      <th className="text-right py-2 px-3 font-medium text-muted-foreground text-sm">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(recentOrders.length > 0 ? recentOrders : [
                      { id: "#001", table: "T5", time: "2 min ago", status: "preparing", total: 450 },
                      { id: "#002", table: "T3", time: "5 min ago", status: "ready", total: 680 },
                      { id: "#003", table: "T8", time: "8 min ago", status: "new", total: 320 },
                      { id: "#004", table: "T2", time: "12 min ago", status: "completed", total: 890 },
                      { id: "#005", table: "T10", time: "15 min ago", status: "preparing", total: 540 },
                    ]).map((order) => (
                      <tr key={order.id} className="border-b last:border-0">
                        <td className="py-2 px-3 font-medium">{order.id}</td>
                        <td className="py-2 px-3">{order.table}</td>
                        <td className="py-2 px-3 text-muted-foreground text-sm">{order.time}</td>
                        <td className="py-2 px-3">{getStatusBadge(order.status)}</td>
                        <td className="py-2 px-3 text-right font-semibold">₹{order.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

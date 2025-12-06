import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Phone, MapPin, Clock, Search, ArrowUpDown, Loader2, User, Plus } from "lucide-react";
import type { Order, OrderItem, DeliveryPerson } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const orderDate = new Date(date);
  const diffMs = now.getTime() - orderDate.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    saved: "PENDING",
    sent_to_kitchen: "PREPARING",
    ready_to_bill: "READY",
    billed: "OUT FOR DELIVERY",
    paid: "DELIVERED",
    completed: "COMPLETED",
  };
  return labels[status] || status.toUpperCase();
}

function isActiveStatus(status: string): boolean {
  return ["saved", "sent_to_kitchen", "ready_to_bill", "billed"].includes(status);
}

function isCompletedStatus(status: string): boolean {
  return ["paid", "completed"].includes(status);
}

export default function DeliveryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [activeTab, setActiveTab] = useState("active");
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [addDriverDialogOpen, setAddDriverDialogOpen] = useState(false);
  const [newDriverName, setNewDriverName] = useState("");
  const [newDriverPhone, setNewDriverPhone] = useState("");
  const { toast } = useToast();

  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ["/api/orders/delivery"],
  });

  const { data: deliveryPersons = [] } = useQuery<DeliveryPerson[]>({
    queryKey: ["/api/delivery-persons"],
  });

  const assignDriverMutation = useMutation({
    mutationFn: async ({ orderId, deliveryPersonId }: { orderId: string; deliveryPersonId: string }) => {
      return apiRequest("PATCH", `/api/orders/${orderId}/assign-driver`, { deliveryPersonId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders/delivery"] });
      setAssignDialogOpen(false);
      setSelectedOrderId(null);
      toast({
        title: "Driver Assigned",
        description: "The delivery driver has been assigned successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to assign driver. Please try again.",
        variant: "destructive",
      });
    },
  });

  const createDriverMutation = useMutation({
    mutationFn: async (data: { name: string; phone: string }) => {
      return apiRequest("POST", "/api/delivery-persons", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/delivery-persons"] });
      setAddDriverDialogOpen(false);
      setNewDriverName("");
      setNewDriverPhone("");
      toast({
        title: "Driver Added",
        description: "New delivery driver has been added successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add driver. Please try again.",
        variant: "destructive",
      });
    },
  });

  const filteredAndSortedOrders = useMemo(() => {
    let result = [...orders];

    const isActiveTab = activeTab === "active";
    result = result.filter((order) =>
      isActiveTab ? isActiveStatus(order.status) : isCompletedStatus(order.status)
    );

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.customerName?.toLowerCase().includes(query) ||
          order.customerPhone?.toLowerCase().includes(query) ||
          order.customerAddress?.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "highest":
          return (parseFloat(b.total) || 0) - (parseFloat(a.total) || 0);
        case "lowest":
          return (parseFloat(a.total) || 0) - (parseFloat(b.total) || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [orders, searchQuery, statusFilter, sortBy, activeTab]);

  const activeCount = useMemo(
    () => orders.filter((o) => isActiveStatus(o.status)).length,
    [orders]
  );
  const completedCount = useMemo(
    () => orders.filter((o) => isCompletedStatus(o.status)).length,
    [orders]
  );

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; className: string }> = {
      saved: { variant: "destructive", className: "" },
      sent_to_kitchen: { variant: "default", className: "bg-warning text-warning-foreground" },
      ready_to_bill: { variant: "default", className: "bg-primary" },
      billed: { variant: "default", className: "bg-blue-600 dark:bg-blue-500" },
      paid: { variant: "default", className: "bg-success" },
      completed: { variant: "secondary", className: "" },
    };

    const statusConfig = config[status] || { variant: "secondary" as const, className: "" };

    return (
      <Badge variant={statusConfig.variant} className={statusConfig.className}>
        {getStatusLabel(status)}
      </Badge>
    );
  };

  const statusOptions = activeTab === "active" 
    ? [
        { value: "all", label: "All Active" },
        { value: "saved", label: "Pending" },
        { value: "sent_to_kitchen", label: "Preparing" },
        { value: "ready_to_bill", label: "Ready" },
        { value: "billed", label: "Out for Delivery" },
      ]
    : [
        { value: "all", label: "All Completed" },
        { value: "paid", label: "Delivered" },
        { value: "completed", label: "Completed" },
      ];

  const handleAssignClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    setAssignDialogOpen(true);
  };

  const handleDriverSelect = (deliveryPersonId: string) => {
    if (selectedOrderId) {
      assignDriverMutation.mutate({ orderId: selectedOrderId, deliveryPersonId });
    }
  };

  const handleAddDriver = () => {
    if (newDriverName.trim() && newDriverPhone.trim()) {
      createDriverMutation.mutate({ name: newDriverName.trim(), phone: newDriverPhone.trim() });
    }
  };

  const getDriverName = (deliveryPersonId: string | null): string => {
    if (!deliveryPersonId) return "";
    const driver = deliveryPersons.find(p => p.id === deliveryPersonId);
    return driver?.name || "Unknown Driver";
  };

  const getActiveDeliveriesCount = (driverId: string): number => {
    return orders.filter(o => o.deliveryPersonId === driverId && isActiveStatus(o.status)).length;
  };

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Delivery Management" />

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={(val) => { setActiveTab(val); setStatusFilter("all"); }}>
            <div className="flex flex-col gap-4 mb-4">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="active" data-testid="tab-active-orders">
                  Active Orders ({activeCount})
                </TabsTrigger>
                <TabsTrigger value="completed" data-testid="tab-completed-orders">
                  Completed ({completedCount})
                </TabsTrigger>
              </TabsList>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[200px] max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, phone, address, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                    data-testid="input-search-delivery"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px]" data-testid="select-status-filter">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[150px]" data-testid="select-sort">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="highest">Highest Amount</SelectItem>
                    <SelectItem value="lowest">Lowest Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="active" className="mt-0">
              <OrdersList 
                orders={filteredAndSortedOrders} 
                isLoading={isLoading} 
                getStatusBadge={getStatusBadge}
                emptyMessage="No active delivery orders"
                onAssignClick={handleAssignClick}
                getDriverName={getDriverName}
              />
            </TabsContent>

            <TabsContent value="completed" className="mt-0">
              <OrdersList 
                orders={filteredAndSortedOrders} 
                isLoading={isLoading} 
                getStatusBadge={getStatusBadge}
                emptyMessage="No completed delivery orders"
                onAssignClick={handleAssignClick}
                getDriverName={getDriverName}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-80 border-l border-border p-6 bg-muted/30">
          <div className="flex items-center justify-between gap-2 mb-4">
            <h3 className="text-lg font-semibold">Delivery Personnel</h3>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => setAddDriverDialogOpen(true)}
              data-testid="button-add-driver"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            {deliveryPersons.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No delivery personnel</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3"
                  onClick={() => setAddDriverDialogOpen(true)}
                  data-testid="button-add-first-driver"
                >
                  Add Driver
                </Button>
              </div>
            ) : (
              deliveryPersons.map((driver) => {
                const activeDeliveries = getActiveDeliveriesCount(driver.id);
                return (
                  <div key={driver.id} className="bg-card border border-card-border rounded-lg p-4" data-testid={`driver-card-${driver.id}`}>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="font-medium">{driver.name}</h4>
                      <Badge 
                        variant="secondary" 
                        className={activeDeliveries > 0 ? "bg-warning/20 text-warning" : "bg-success/20 text-success"}
                      >
                        {activeDeliveries > 0 ? `${activeDeliveries} Active` : "Available"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        <span>{driver.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span>{activeDeliveries} active {activeDeliveries === 1 ? "delivery" : "deliveries"}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Delivery Driver</DialogTitle>
            <DialogDescription>
              Select a driver to assign to this delivery order.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            {deliveryPersons.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                <p className="mb-3">No drivers available. Add a driver first.</p>
                <Button onClick={() => { setAssignDialogOpen(false); setAddDriverDialogOpen(true); }}>
                  Add Driver
                </Button>
              </div>
            ) : (
              deliveryPersons.map((driver) => {
                const activeDeliveries = getActiveDeliveriesCount(driver.id);
                return (
                  <Button
                    key={driver.id}
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => handleDriverSelect(driver.id)}
                    disabled={assignDriverMutation.isPending}
                    data-testid={`select-driver-${driver.id}`}
                  >
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{driver.name}</span>
                    </div>
                    <Badge variant="secondary" className={activeDeliveries > 0 ? "bg-warning/20 text-warning" : "bg-success/20 text-success"}>
                      {activeDeliveries > 0 ? `${activeDeliveries} Active` : "Available"}
                    </Badge>
                  </Button>
                );
              })
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={addDriverDialogOpen} onOpenChange={setAddDriverDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Delivery Driver</DialogTitle>
            <DialogDescription>
              Add a new delivery driver to your team.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Name</label>
              <Input
                placeholder="Driver name"
                value={newDriverName}
                onChange={(e) => setNewDriverName(e.target.value)}
                data-testid="input-driver-name"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Phone</label>
              <Input
                placeholder="Phone number"
                value={newDriverPhone}
                onChange={(e) => setNewDriverPhone(e.target.value)}
                data-testid="input-driver-phone"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setAddDriverDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddDriver}
                disabled={!newDriverName.trim() || !newDriverPhone.trim() || createDriverMutation.isPending}
                data-testid="button-save-driver"
              >
                {createDriverMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add Driver"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface OrdersListProps {
  orders: Order[];
  isLoading: boolean;
  getStatusBadge: (status: string) => JSX.Element;
  emptyMessage: string;
  onAssignClick: (orderId: string) => void;
  getDriverName: (deliveryPersonId: string | null) => string;
}

function OrdersList({ orders, isLoading, getStatusBadge, emptyMessage, onAssignClick, getDriverName }: OrdersListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <MapPin className="h-12 w-12 mb-4 opacity-50" />
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <OrderCard 
          key={order.id} 
          order={order} 
          getStatusBadge={getStatusBadge} 
          onAssignClick={onAssignClick}
          getDriverName={getDriverName}
        />
      ))}
    </div>
  );
}

interface OrderCardProps {
  order: Order;
  getStatusBadge: (status: string) => JSX.Element;
  onAssignClick: (orderId: string) => void;
  getDriverName: (deliveryPersonId: string | null) => string;
}

function OrderCard({ order, getStatusBadge, onAssignClick, getDriverName }: OrderCardProps) {
  const { data: orderItems = [] } = useQuery<OrderItem[]>({
    queryKey: ["/api/orders", order.id, "items"],
  });

  const itemCount = orderItems.reduce((sum, item) => sum + item.quantity, 0);
  const hasAssignedDriver = !!order.deliveryPersonId;
  const driverName = getDriverName(order.deliveryPersonId);

  return (
    <div
      className="bg-card border border-card-border rounded-lg p-4 hover-elevate"
      data-testid={`delivery-order-${order.id}`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h4 className="font-semibold text-lg">#{order.id.slice(-6).toUpperCase()}</h4>
          <p className="text-sm text-muted-foreground">{formatRelativeTime(order.createdAt)}</p>
        </div>
        {getStatusBadge(order.status)}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">{order.customerName || "Guest"}</span>
        </div>
        {order.customerAddress && (
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{order.customerAddress}</span>
          </div>
        )}
        {order.customerPhone && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4 shrink-0" />
            <span>{order.customerPhone}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 pt-3 border-t border-border">
        <div className="text-sm">
          <span className="text-muted-foreground">{itemCount} item{itemCount !== 1 ? "s" : ""} </span>
          <span className="font-semibold">{"\u20B9"}{parseFloat(order.total).toFixed(2)}</span>
        </div>
        {!hasAssignedDriver && isActiveStatus(order.status) ? (
          <Button size="sm" onClick={() => onAssignClick(order.id)} data-testid={`button-assign-${order.id}`}>
            Assign Driver
          </Button>
        ) : hasAssignedDriver ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>Assigned to: <span className="font-medium text-foreground">{driverName}</span></span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

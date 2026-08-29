// ─── Navigation ──────────────────────────────────────────────────────────────
export type ViewKey =
  | 'overview'
  | 'inventory'
  | 'orders'
  | 'customers'
  | 'analytics'
  | 'settings';

export interface NavItem {
  key: ViewKey;
  label: string;
  icon: string;
}

// ─── Metric Cards ─────────────────────────────────────────────────────────────
export interface MetricCard {
  id: string;
  label: string;
  value: string;
  subtext: string;
  change: number;
  trend: 'up' | 'down';
  spark: number[];
  icon: 'sales' | 'orders' | 'drivers' | 'stock';
}

// ─── Charts ───────────────────────────────────────────────────────────────────
export interface DailyOrderPoint {
  day: string;
  revenue: number;
  orders: number;
}

export interface CategoryPerformance {
  name: string;
  sales: number;
}

// ─── Inventory / Products ─────────────────────────────────────────────────────
export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';
export type ProductCategory =
  | 'Fresh Produce'
  | 'Dairy & Bakery'
  | 'Grains & Rice'
  | 'Beverages'
  | 'Spices & Condiments'
  | 'Frozen & Chilled';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  stockQty: number;
  maxStock: number;
  price: number;        // LKR
  status: StockStatus;
}

// ─── Orders ───────────────────────────────────────────────────────────────────
export type OrderStatus = 'Pending' | 'Packing' | 'Out for Delivery' | 'Delivered';
export type PaymentMethod = 'Cash on Delivery' | 'LANKAQR' | 'Card';

export interface Order {
  id: string;
  customer: string;
  location: string;
  itemsSummary: string;
  total: number;        // LKR
  payment: PaymentMethod;
  status: OrderStatus;
  date: string;
}

// ─── Customers ────────────────────────────────────────────────────────────────
export type CustomerTier = 'New' | 'Regular' | 'Premium';
export type CustomerStatus = 'Active' | 'Inactive' | 'Blocked';

export interface CustomerRow {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  location: string;
  totalOrders: number;
  totalSpend: number;   // LKR
  lastOrder: string;
  tier: CustomerTier;
  status: CustomerStatus;
}

// ─── Notifications ────────────────────────────────────────────────────────────
export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'success' | 'warning' | 'info' | 'error';
}

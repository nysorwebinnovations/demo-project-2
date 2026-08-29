import type {
  MetricCard,
  Notification,
  DailyOrderPoint,
  CategoryPerformance,
  Product,
  Order,
  CustomerRow,
  NavItem,
} from '@/types';

// ─── Navigation ──────────────────────────────────────────────────────────────
export const navItems: NavItem[] = [
  { key: 'overview',   label: 'Overview',           icon: 'LayoutDashboard' },
  { key: 'inventory',  label: 'Inventory & Stock',  icon: 'Package' },
  { key: 'orders',     label: 'Orders & Delivery',  icon: 'ClipboardList' },
  { key: 'customers',  label: 'Customers',          icon: 'Users' },
  { key: 'analytics',  label: 'Analytics',          icon: 'BarChart3' },
  { key: 'settings',   label: 'Settings',           icon: 'Settings' },
];

// ─── Metric Cards ─────────────────────────────────────────────────────────────
export const metrics: MetricCard[] = [
  {
    id: 'sales',
    label: "Today's Sales",
    value: 'Rs. 185,400',
    subtext: '+12.4% vs yesterday',
    change: 12.4,
    trend: 'up',
    spark: [42, 55, 48, 62, 58, 70, 65, 78, 85],
    icon: 'sales',
  },
  {
    id: 'orders',
    label: 'Total Orders',
    value: '142 Orders',
    subtext: '28 Pending Packing',
    change: 8.7,
    trend: 'up',
    spark: [30, 35, 32, 40, 38, 45, 48, 52, 55],
    icon: 'orders',
  },
  {
    id: 'drivers',
    label: 'Active Drivers',
    value: '8 On-Road',
    subtext: '3 Returning Soon',
    change: 0,
    trend: 'up',
    spark: [5, 6, 7, 8, 8, 7, 8, 8, 8],
    icon: 'drivers',
  },
  {
    id: 'stock',
    label: 'Low Stock Alert',
    value: '5 Items',
    subtext: 'Require Restocking',
    change: -2,
    trend: 'down',
    spark: [2, 3, 2, 4, 3, 5, 4, 5, 5],
    icon: 'stock',
  },
];

// ─── Daily Orders Trend (Last 14 Days) ───────────────────────────────────────
export const dailyOrdersData: DailyOrderPoint[] = [
  { day: 'Mon',  revenue: 142500, orders: 98  },
  { day: 'Tue',  revenue: 168200, orders: 112 },
  { day: 'Wed',  revenue: 155800, orders: 105 },
  { day: 'Thu',  revenue: 193400, orders: 128 },
  { day: 'Fri',  revenue: 221600, orders: 147 },
  { day: 'Sat',  revenue: 285900, orders: 192 },
  { day: 'Sun',  revenue: 249300, orders: 168 },
  { day: 'Mon',  revenue: 158700, orders: 107 },
  { day: 'Tue',  revenue: 172400, orders: 116 },
  { day: 'Wed',  revenue: 164300, orders: 110 },
  { day: 'Thu',  revenue: 198800, orders: 133 },
  { day: 'Fri',  revenue: 231500, orders: 155 },
  { day: 'Sat',  revenue: 298400, orders: 199 },
  { day: 'Sun',  revenue: 185400, orders: 142 },
];

// ─── Category Performance ─────────────────────────────────────────────────────
export const categoryData: CategoryPerformance[] = [
  { name: 'Grains & Rice',       sales: 485200 },
  { name: 'Fresh Produce',       sales: 382600 },
  { name: 'Beverages',           sales: 298400 },
  { name: 'Dairy & Bakery',      sales: 264800 },
  { name: 'Spices & Condiments', sales: 178500 },
  { name: 'Frozen & Chilled',    sales: 132700 },
];

// ─── Products / Inventory ─────────────────────────────────────────────────────
export const products: Product[] = [
  { id: 'PRD-001', sku: 'GR-001', name: 'Keeri Samba Rice 5kg',            category: 'Grains & Rice',       stockQty: 245, maxStock: 300, price: 1450,  status: 'In Stock'     },
  { id: 'PRD-002', sku: 'GR-002', name: 'Nadu Rice 5kg',                   category: 'Grains & Rice',       stockQty: 18,  maxStock: 300, price: 1250,  status: 'Low Stock'    },
  { id: 'PRD-003', sku: 'GR-003', name: 'Red Raw Rice 5kg',                category: 'Grains & Rice',       stockQty: 182, maxStock: 300, price: 1350,  status: 'In Stock'     },
  { id: 'PRD-004', sku: 'FP-001', name: 'Fresh Carrots 500g',              category: 'Fresh Produce',       stockQty: 64,  maxStock: 200, price: 180,   status: 'In Stock'     },
  { id: 'PRD-005', sku: 'FP-002', name: 'Local Tomatoes 1kg',              category: 'Fresh Produce',       stockQty: 8,   maxStock: 150, price: 220,   status: 'Low Stock'    },
  { id: 'PRD-006', sku: 'FP-003', name: 'Green Beans 500g',                category: 'Fresh Produce',       stockQty: 0,   maxStock: 120, price: 195,   status: 'Out of Stock' },
  { id: 'PRD-007', sku: 'DB-001', name: 'Highland Fresh Milk 1L',          category: 'Dairy & Bakery',      stockQty: 112, maxStock: 200, price: 320,   status: 'In Stock'     },
  { id: 'PRD-008', sku: 'DB-002', name: 'Anchor Milk Powder 400g',         category: 'Dairy & Bakery',      stockQty: 55,  maxStock: 150, price: 890,   status: 'In Stock'     },
  { id: 'PRD-009', sku: 'DB-003', name: 'Munchee Super Cream Cracker',     category: 'Dairy & Bakery',      stockQty: 14,  maxStock: 100, price: 145,   status: 'Low Stock'    },
  { id: 'PRD-010', sku: 'BV-001', name: 'Ceylon Black Tea 500g',           category: 'Beverages',           stockQty: 198, maxStock: 250, price: 680,   status: 'In Stock'     },
  { id: 'PRD-011', sku: 'BV-002', name: 'Elephant House Ginger Beer 330ml',category: 'Beverages',           stockQty: 76,  maxStock: 200, price: 120,   status: 'In Stock'     },
  { id: 'PRD-012', sku: 'BV-003', name: 'Nestomalt 400g',                  category: 'Beverages',           stockQty: 0,   maxStock: 100, price: 540,   status: 'Out of Stock' },
  { id: 'PRD-013', sku: 'SP-001', name: 'Larich Unroasted Curry Powder',   category: 'Spices & Condiments', stockQty: 88,  maxStock: 150, price: 295,   status: 'In Stock'     },
  { id: 'PRD-014', sku: 'SP-002', name: 'Pure Ceylon Coconut Oil 1L',      category: 'Spices & Condiments', stockQty: 7,   maxStock: 100, price: 980,   status: 'Low Stock'    },
  { id: 'PRD-015', sku: 'FC-001', name: 'Frozen Chicken Breast 1kg',       category: 'Frozen & Chilled',    stockQty: 42,  maxStock: 80,  price: 1850,  status: 'In Stock'     },
];

// ─── Orders ───────────────────────────────────────────────────────────────────
export const orders: Order[] = [
  { id: '#CF-4089', customer: 'Kasun Perera',      location: 'Colombo 07',   itemsSummary: 'Rice 5kg, Milk, Tea', total: 4250,  payment: 'Cash on Delivery', status: 'Delivered',        date: '2026-08-28' },
  { id: '#CF-4088', customer: 'Dilani Fernando',   location: 'Nugegoda',     itemsSummary: 'Vegetables, Curry Powder', total: 1870, payment: 'LANKAQR',   status: 'Out for Delivery', date: '2026-08-28' },
  { id: '#CF-4087', customer: 'Mohamed Rizwan',    location: 'Wellawatte',   itemsSummary: 'Chicken, Coconut Oil', total: 3420,  payment: 'Card',           status: 'Packing',          date: '2026-08-28' },
  { id: '#CF-4086', customer: 'Nimali Silva',       location: 'Rajagiriya',   itemsSummary: 'Milk Powder, Biscuits', total: 1560, payment: 'Cash on Delivery', status: 'Pending',       date: '2026-08-28' },
  { id: '#CF-4085', customer: 'Nimal Jayawardena', location: 'Kotte',        itemsSummary: 'Black Tea, Ginger Beer', total: 2180, payment: 'LANKAQR',  status: 'Delivered',        date: '2026-08-27' },
  { id: '#CF-4084', customer: 'Sanduni Rathnayake',location: 'Dehiwala',     itemsSummary: 'Rice 5kg, Tomatoes', total: 1980,   payment: 'Cash on Delivery', status: 'Delivered',     date: '2026-08-27' },
  { id: '#CF-4083', customer: 'Pradeep Kumara',    location: 'Maharagama',   itemsSummary: 'Frozen Chicken, Curry Powder', total: 3640, payment: 'Card', status: 'Out for Delivery', date: '2026-08-27' },
  { id: '#CF-4082', customer: 'Iresha Madushani',  location: 'Moratuwa',     itemsSummary: 'Milk, Bread, Eggs', total: 890,    payment: 'LANKAQR',       status: 'Delivered',        date: '2026-08-27' },
  { id: '#CF-4081', customer: 'Chamara Bandara',   location: 'Gampaha',      itemsSummary: 'Keeri Samba 5kg, Oil', total: 2890, payment: 'Cash on Delivery', status: 'Packing',      date: '2026-08-27' },
  { id: '#CF-4080', customer: 'Sujeewa Gunasekara',location: 'Negombo',      itemsSummary: 'Nestomalt, Tea, Biscuits', total: 1480, payment: 'Card',    status: 'Pending',          date: '2026-08-26' },
  { id: '#CF-4079', customer: 'Tharindi Perera',   location: 'Kalutara',     itemsSummary: 'Fresh Vegetables Assorted', total: 2260, payment: 'LANKAQR', status: 'Delivered',       date: '2026-08-26' },
  { id: '#CF-4078', customer: 'Roshan Fernando',   location: 'Colombo 03',   itemsSummary: 'Anchor Milk Powder, Tea', total: 1870, payment: 'Card',     status: 'Delivered',        date: '2026-08-26' },
];

// ─── Customers ────────────────────────────────────────────────────────────────
export const customers: CustomerRow[] = [
  { id: 'CUS-001', name: 'Kasun Perera',       avatar: 'KP', phone: '+94 77 123 4567', location: 'Colombo 07',  totalOrders: 38, totalSpend: 142680, lastOrder: '2026-08-28', tier: 'Premium', status: 'Active'   },
  { id: 'CUS-002', name: 'Dilani Fernando',    avatar: 'DF', phone: '+94 71 234 5678', location: 'Nugegoda',    totalOrders: 22, totalSpend: 78450,  lastOrder: '2026-08-28', tier: 'Regular', status: 'Active'   },
  { id: 'CUS-003', name: 'Mohamed Rizwan',     avatar: 'MR', phone: '+94 76 345 6789', location: 'Wellawatte',  totalOrders: 15, totalSpend: 54200,  lastOrder: '2026-08-28', tier: 'Regular', status: 'Active'   },
  { id: 'CUS-004', name: 'Nimali Silva',        avatar: 'NS', phone: '+94 70 456 7890', location: 'Rajagiriya',  totalOrders: 3,  totalSpend: 8750,   lastOrder: '2026-08-28', tier: 'New',     status: 'Active'   },
  { id: 'CUS-005', name: 'Nimal Jayawardena',  avatar: 'NJ', phone: '+94 77 567 8901', location: 'Kotte',       totalOrders: 47, totalSpend: 198300, lastOrder: '2026-08-27', tier: 'Premium', status: 'Active'   },
  { id: 'CUS-006', name: 'Sanduni Rathnayake', avatar: 'SR', phone: '+94 75 678 9012', location: 'Dehiwala',    totalOrders: 19, totalSpend: 65100,  lastOrder: '2026-08-27', tier: 'Regular', status: 'Active'   },
  { id: 'CUS-007', name: 'Pradeep Kumara',     avatar: 'PK', phone: '+94 72 789 0123', location: 'Maharagama',  totalOrders: 8,  totalSpend: 32400,  lastOrder: '2026-08-27', tier: 'Regular', status: 'Inactive' },
  { id: 'CUS-008', name: 'Iresha Madushani',   avatar: 'IM', phone: '+94 78 890 1234', location: 'Moratuwa',    totalOrders: 1,  totalSpend: 890,    lastOrder: '2026-08-27', tier: 'New',     status: 'Active'   },
];

// ─── Notifications ────────────────────────────────────────────────────────────
export const notifications: Notification[] = [
  { id: 'N-1', title: 'New Order #CF-4089',          description: 'Kasun Perera placed an order — Rs. 4,250', time: '2m ago',  read: false, type: 'success' },
  { id: 'N-2', title: 'Low Stock: Local Tomatoes',   description: 'Only 8 units remaining — reorder now.',   time: '14m ago', read: false, type: 'warning' },
  { id: 'N-3', title: 'Driver Update',               description: 'Suresh is out for delivery — 3 orders.',  time: '1h ago',  read: false, type: 'info'    },
  { id: 'N-4', title: 'Payment Received',            description: 'LANKAQR payment confirmed for #CF-4085.', time: '3h ago',  read: true,  type: 'success' },
  { id: 'N-5', title: 'Out of Stock: Nestomalt',     description: 'BV-003 is out of stock — update catalog.',time: '5h ago',  read: true,  type: 'error'   },
];

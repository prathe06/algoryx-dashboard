export const statCardsData = [
  {
    id: 'revenue',
    title: 'Total Revenue',
    value: '₹48,57,400',
    change: '+12.5%',
    isPositive: true,
    timeframe: 'vs last month',
    icon: 'IndianRupee',
    description: 'Gross recurring and one-time sales'
  },
  {
    id: 'users',
    title: 'Total Users',
    value: '12,849',
    change: '+8.2%',
    isPositive: true,
    timeframe: 'vs last month',
    icon: 'Users',
    description: 'Active authenticated accounts'
  },
  {
    id: 'orders',
    title: 'Total Orders',
    value: '3,642',
    change: '+5.4%',
    isPositive: true,
    timeframe: 'vs last month',
    icon: 'ShoppingCart',
    description: 'Processed product checkouts'
  },
  {
    id: 'conversion',
    title: 'Conversion Rate',
    value: '4.82%',
    change: '-1.2%',
    isPositive: false,
    timeframe: 'vs last month',
    icon: 'TrendingUp',
    description: 'Visitor to paid conversion'
  }
];

export const revenueDataByYear = {
  '2026': [
    { month: 'Jan', revenue: 2840000, target: 2600000, orders: 210 },
    { month: 'Feb', revenue: 3120000, target: 2800000, orders: 245 },
    { month: 'Mar', revenue: 3680000, target: 3200000, orders: 310 },
    { month: 'Apr', revenue: 3450000, target: 3300000, orders: 290 },
    { month: 'May', revenue: 4120000, target: 3600000, orders: 380 },
    { month: 'Jun', revenue: 3980000, target: 3800000, orders: 340 },
    { month: 'Jul', revenue: 4460000, target: 4000000, orders: 410 },
    { month: 'Aug', revenue: 4320000, target: 4100000, orders: 395 },
    { month: 'Sep', revenue: 4710000, target: 4300000, orders: 430 },
    { month: 'Oct', revenue: 4857400, target: 4500000, orders: 462 },
    { month: 'Nov', revenue: 5240000, target: 4800000, orders: 490 },
    { month: 'Dec', revenue: 5890000, target: 5200000, orders: 540 }
  ],
  '2025': [
    { month: 'Jan', revenue: 2100000, target: 2000000, orders: 170 },
    { month: 'Feb', revenue: 2350000, target: 2200000, orders: 190 },
    { month: 'Mar', revenue: 2700000, target: 2400000, orders: 220 },
    { month: 'Apr', revenue: 2620000, target: 2500000, orders: 210 },
    { month: 'May', revenue: 3010000, target: 2800000, orders: 260 },
    { month: 'Jun', revenue: 2940000, target: 2800000, orders: 250 },
    { month: 'Jul', revenue: 3320000, target: 3000000, orders: 295 },
    { month: 'Aug', revenue: 3280000, target: 3100000, orders: 280 },
    { month: 'Sep', revenue: 3610000, target: 3300000, orders: 320 },
    { month: 'Oct', revenue: 3820000, target: 3500000, orders: 345 },
    { month: 'Nov', revenue: 4150000, target: 3800000, orders: 380 },
    { month: 'Dec', revenue: 4590000, target: 4000000, orders: 420 }
  ],
  '2024': [
    { month: 'Jan', revenue: 1520000, target: 1400000, orders: 120 },
    { month: 'Feb', revenue: 1680000, target: 1550000, orders: 135 },
    { month: 'Mar', revenue: 1940000, target: 1700000, orders: 160 },
    { month: 'Apr', revenue: 1890000, target: 1800000, orders: 155 },
    { month: 'May', revenue: 2210000, target: 2000000, orders: 190 },
    { month: 'Jun', revenue: 2180000, target: 2050000, orders: 185 },
    { month: 'Jul', revenue: 2430000, target: 2200000, orders: 210 },
    { month: 'Aug', revenue: 2390000, target: 2300000, orders: 205 },
    { month: 'Sep', revenue: 2650000, target: 2400000, orders: 230 },
    { month: 'Oct', revenue: 2810000, target: 2500000, orders: 245 },
    { month: 'Nov', revenue: 3040000, target: 2700000, orders: 270 },
    { month: 'Dec', revenue: 3420000, target: 2900000, orders: 310 }
  ]
};

export const initialOrders = [
  {
    id: '#ORD-1001',
    customer: 'Arun Kumar',
    email: 'arun.kumar@example.com',
    avatarText: 'AK',
    product: 'Premium Plan',
    amount: 24900,
    status: 'Completed',
    date: 'Oct 01, 2026',
    paymentMethod: 'UPI / GPay',
    city: 'Bengaluru'
  },
  {
    id: '#ORD-1002',
    customer: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    avatarText: 'PS',
    product: 'Business Plan',
    amount: 49900,
    status: 'Pending',
    date: 'Sep 30, 2026',
    paymentMethod: 'Net Banking (HDFC)',
    city: 'Mumbai'
  },
  {
    id: '#ORD-1003',
    customer: 'Rahul Singh',
    email: 'rahul.singh@example.com',
    avatarText: 'RS',
    product: 'Starter Plan',
    amount: 9900,
    status: 'Completed',
    date: 'Sep 29, 2026',
    paymentMethod: 'Credit Card (Razorpay)',
    city: 'Delhi NCR'
  },
  {
    id: '#ORD-1004',
    customer: 'Divya Raj',
    email: 'divya.raj@example.com',
    avatarText: 'DR',
    product: 'Premium Plan',
    amount: 24900,
    status: 'Cancelled',
    date: 'Sep 28, 2026',
    paymentMethod: 'Debit Card',
    city: 'Chennai'
  },
  {
    id: '#ORD-1005',
    customer: 'Karthik M',
    email: 'karthik.m@example.com',
    avatarText: 'KM',
    product: 'Business Plan',
    amount: 49900,
    status: 'Completed',
    date: 'Sep 27, 2026',
    paymentMethod: 'UPI / PhonePe',
    city: 'Hyderabad'
  },
  {
    id: '#ORD-1006',
    customer: 'Sneha Patel',
    email: 'sneha.patel@example.com',
    avatarText: 'SP',
    product: 'Enterprise Suite',
    amount: 89900,
    status: 'Completed',
    date: 'Sep 26, 2026',
    paymentMethod: 'Corporate Card',
    city: 'Ahmedabad'
  },
  {
    id: '#ORD-1007',
    customer: 'Vikram Rao',
    email: 'vikram.rao@example.com',
    avatarText: 'VR',
    product: 'Starter Plan',
    amount: 9900,
    status: 'Pending',
    date: 'Sep 25, 2026',
    paymentMethod: 'UPI / Paytm',
    city: 'Pune'
  },
  {
    id: '#ORD-1008',
    customer: 'Ananya Deshmukh',
    email: 'ananya.d@example.com',
    avatarText: 'AD',
    product: 'Business Plan',
    amount: 49900,
    status: 'Processing',
    date: 'Sep 24, 2026',
    paymentMethod: 'Net Banking (ICICI)',
    city: 'Mumbai'
  },
  {
    id: '#ORD-1009',
    customer: 'Rohan Mehra',
    email: 'rohan.mehra@example.com',
    avatarText: 'RM',
    product: 'Enterprise Suite',
    amount: 89900,
    status: 'Completed',
    date: 'Sep 23, 2026',
    paymentMethod: 'NEFT / RTGS',
    city: 'Gurugram'
  },
  {
    id: '#ORD-1010',
    customer: 'Meera Nambiar',
    email: 'meera.nambiar@example.com',
    avatarText: 'MN',
    product: 'Starter Plan',
    amount: 9900,
    status: 'Refunded',
    date: 'Sep 22, 2026',
    paymentMethod: 'UPI / GPay',
    city: 'Kochi'
  },
  {
    id: '#ORD-1011',
    customer: 'Tanmay Bhatia',
    email: 'tanmay.bhatia@example.com',
    avatarText: 'TB',
    product: 'Premium Plan',
    amount: 24900,
    status: 'Processing',
    date: 'Sep 21, 2026',
    paymentMethod: 'Credit Card',
    city: 'Kolkata'
  },
  {
    id: '#ORD-1012',
    customer: 'Siddharth Joshi',
    email: 'siddharth.j@example.com',
    avatarText: 'SJ',
    product: 'Business Plan',
    amount: 49900,
    status: 'Completed',
    date: 'Sep 20, 2026',
    paymentMethod: 'UPI / CRED',
    city: 'Bengaluru'
  }
];

export const userProfile = {
  name: 'Prathekaa',
  role: 'Administrator',
  avatarChar: 'P',
  email: 'prathekaa@example.com',
  phone: '+91 98765 43210',
  country: 'India',
  department: 'Product & Operations',
  joinedDate: 'January 2024'
};

export const initialActivities = [
  {
    id: 1,
    title: 'New user registered',
    description: 'Priya Sharma joined the platform',
    timestamp: '10 min ago',
    type: 'user',
    icon: 'UserPlus'
  },
  {
    id: 2,
    title: 'New order received',
    description: 'Order #ORD-1005 was placed',
    timestamp: '32 min ago',
    type: 'order',
    icon: 'ShoppingBag'
  },
  {
    id: 3,
    title: 'Payment received',
    description: '₹49,900 payment successfully processed',
    timestamp: '1 hour ago',
    type: 'payment',
    icon: 'CreditCard'
  },
  {
    id: 4,
    title: 'New message',
    description: 'You received a new customer message',
    timestamp: '2 hours ago',
    type: 'message',
    icon: 'MessageSquare'
  }
];

export const initialNotifications = [
  {
    id: 'notif-1',
    title: 'Payment completed',
    message: 'Order #ORD-1005 payment of ₹49,900 received.',
    time: '5 min ago',
    unread: true,
    type: 'payment'
  },
  {
    id: 'notif-2',
    title: 'New user registered',
    message: 'A new customer joined.',
    time: '20 min ago',
    unread: true,
    type: 'user'
  },
  {
    id: 'notif-3',
    title: 'New order',
    message: 'Order #ORD-1006 was placed.',
    time: '1 hour ago',
    unread: true,
    type: 'order'
  }
];

export const navMenuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
  { id: 'users', label: 'Users', icon: 'Users' },
  { id: 'orders', label: 'Orders', icon: 'ShoppingBag' },
  { id: 'products', label: 'Products', icon: 'Package' },
  { id: 'messages', label: 'Messages', icon: 'MessageSquare' },
  { id: 'settings', label: 'Settings', icon: 'Settings' }
];

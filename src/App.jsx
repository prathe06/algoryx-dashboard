import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import Dashboard from './pages/Dashboard';
import RecentOrders from './components/RecentOrders';
import {
  userProfile as initialProfile,
  initialOrders,
  initialActivities,
  initialNotifications
} from './data/dashboardData';
import {
  X,
  Check,
  Download,
  AlertTriangle,
  Mail,
  User,
  Phone,
  MapPin,
  Building,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  IndianRupee,
  ShoppingBag,
  ArrowUpRight,
  TrendingUp,
  Package
} from 'lucide-react';

export default function App() {
  // Theme state persisted in localStorage
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('algoryx_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Mobile sidebar open state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Active navigation menu tab
  const [activeTab, setActiveTab] = useState('dashboard');

  // Search query synchronized from TopNavbar to RecentOrders
  const [searchQuery, setSearchQuery] = useState('');

  // Editable user profile state
  const [userProfile, setUserProfile] = useState(initialProfile);

  // Interactive orders state
  const [orders, setOrders] = useState(initialOrders);

  // Interactive activities state
  const [activities, setActivities] = useState(initialActivities);

  // Interactive notifications state
  const [notifications, setNotifications] = useState(initialNotifications);

  // Modal states
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profileFormData, setProfileFormData] = useState({ ...initialProfile });
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync theme with document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    localStorage.setItem('algoryx_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      showToast(next === 'dark' ? 'Switched to Dark Mode 🌙' : 'Switched to Light Mode ☀️');
      return next;
    });
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast('All notifications marked as read.');
  };

  const handleAddActivity = (newActivity) => {
    setActivities((prev) => [newActivity, ...prev]);
    showToast('New activity logged.');
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    handleAddActivity({
      id: Date.now(),
      title: 'Order status updated',
      description: `${orderId} marked as ${newStatus}`,
      timestamp: 'Just now',
      type: 'order',
      icon: 'ShoppingBag'
    });
    showToast(`Order ${orderId} updated to ${newStatus}`);
  };

  const handleAddNewOrder = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    handleAddActivity({
      id: Date.now(),
      title: 'New order received',
      description: `${newOrder.id} placed for ₹${newOrder.amount.toLocaleString('en-IN')}`,
      timestamp: 'Just now',
      type: 'order',
      icon: 'ShoppingBag'
    });
    showToast(`Order ${newOrder.id} created successfully`);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUserProfile({
      ...profileFormData,
      avatarChar: profileFormData.name.trim().charAt(0).toUpperCase() || 'P'
    });
    setIsEditProfileOpen(false);
    showToast('Profile updated successfully.');
  };

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    showToast('Session logged out. Logged in as demo admin.');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Fixed Desktop Sidebar & Sliding Mobile Drawer */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeItem={activeTab}
        onSelectItem={(tabId) => {
          setActiveTab(tabId);
          if (tabId !== 'dashboard') {
            showToast(`Navigated to ${tabId.charAt(0).toUpperCase() + tabId.slice(1)} view`);
          }
        }}
        onLogout={() => setIsLogoutModalOpen(true)}
      />

      {/* Main Content Area: Offset by sidebar width (w-64 = 256px) on lg screens */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        {/* Sticky Top Navbar */}
        <TopNavbar
          onToggleSidebar={() => setIsSidebarOpen(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          notifications={notifications}
          onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
          onOpenNotificationsModal={() => setIsNotificationsModalOpen(true)}
          userProfile={userProfile}
          onEditProfile={() => {
            setProfileFormData({ ...userProfile });
            setIsEditProfileOpen(true);
          }}
          onLogout={() => setIsLogoutModalOpen(true)}
        />

        {/* View Switcher Banner if non-dashboard selected and not orders */}
        {activeTab !== 'dashboard' && activeTab !== 'orders' && (
          <div className="px-4 sm:px-6 lg:px-8 pt-4">
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200 capitalize">
                  {activeTab} Management View
                </p>
                <p className="text-xs text-indigo-700 dark:text-indigo-400">
                  Viewing filtered metrics for {activeTab}. Primary overview remains below.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-xs"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}

        {/* Primary Page Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl w-full mx-auto min-w-0">
          {activeTab === 'orders' ? (
            <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
              {/* Orders Header & Summary Metric Cards */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Orders & Transaction Console
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Complete records of customer subscriptions, invoices, and fulfillment in INR (₹)
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('dashboard')}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    ← Back to Dashboard
                  </button>
                </div>
              </div>

              {/* Quick High-level Order Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                    <span>Total Orders</span>
                    <ShoppingBag className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    {orders.length}
                  </div>
                  <span className="text-[11px] text-emerald-500 font-medium">+14.2% this month</span>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                    <span>Gross Volume</span>
                    <IndianRupee className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    ₹{orders.reduce((sum, o) => sum + o.amount, 0).toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-emerald-500 font-medium">+12.5% vs last month</span>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                    <span>Completed</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    {orders.filter((o) => o.status === 'Completed').length}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">Successfully billed</span>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                    <span>Pending Action</span>
                    <Clock className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    {orders.filter((o) => o.status === 'Pending' || o.status === 'Processing').length}
                  </div>
                  <span className="text-[11px] text-amber-500 font-medium">Requires verification</span>
                </div>
              </div>

              {/* Full Width Order Management Table */}
              <RecentOrders
                orders={orders}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onViewOrderDetails={(order) => setSelectedOrderDetails(order)}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onAddNewOrder={handleAddNewOrder}
              />
            </div>
          ) : (
            <Dashboard
              userProfile={userProfile}
              onEditProfile={() => {
                setProfileFormData({ ...userProfile });
                setIsEditProfileOpen(true);
              }}
              orders={orders}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onViewOrderDetails={(order) => setSelectedOrderDetails(order)}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onAddNewOrder={handleAddNewOrder}
              activities={activities}
              onAddActivity={handleAddActivity}
              isDarkMode={theme === 'dark'}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="px-4 sm:px-6 lg:px-8 py-5 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl w-full mx-auto">
          <p>© 2026 Algoryx Systems Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              type="button"
              onClick={() => showToast('Algoryx v2.4.0 (Build 2026.10)')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              System v2.4.0
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => showToast('Privacy Policy & Compliance Verified')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Privacy & Security
            </button>
          </div>
        </footer>
      </div>

      {/* Interactive Edit Profile Modal */}
      {isEditProfileOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-profile-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setIsEditProfileOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 id="edit-profile-title" className="text-lg font-bold text-slate-900 dark:text-white">
              Edit Administrator Profile
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Update your account details displayed on the dashboard.
            </p>

            <form onSubmit={handleSaveProfile} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={profileFormData.name}
                    onChange={(e) => setProfileFormData({ ...profileFormData, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={profileFormData.email}
                    onChange={(e) => setProfileFormData({ ...profileFormData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={profileFormData.phone}
                    onChange={(e) => setProfileFormData({ ...profileFormData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Country
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={profileFormData.country}
                      onChange={(e) => setProfileFormData({ ...profileFormData, country: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Department
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={profileFormData.department}
                      onChange={(e) => setProfileFormData({ ...profileFormData, department: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Order Details Modal */}
      {selectedOrderDetails && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setSelectedOrderDetails(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
                {selectedOrderDetails.id}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                  selectedOrderDetails.status === 'Completed'
                    ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300'
                    : selectedOrderDetails.status === 'Pending'
                    ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300'
                    : 'bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300'
                }`}
              >
                {selectedOrderDetails.status}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Order Transaction Summary
            </h3>

            <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Customer</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {selectedOrderDetails.customer}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Customer Email</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">
                  {selectedOrderDetails.email}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Plan / Item</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {selectedOrderDetails.product}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Total Billed</span>
                <span className="font-bold text-slate-900 dark:text-white tabular-nums text-sm">
                  ₹{selectedOrderDetails.amount.toLocaleString('en-IN')}.00 INR
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Billing Date</span>
                <span className="text-slate-700 dark:text-slate-300">{selectedOrderDetails.date}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  showToast(`Invoice downloaded for ${selectedOrderDetails.id}`);
                  setSelectedOrderDetails(null);
                }}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Invoice</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedOrderDetails(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {isNotificationsModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setIsNotificationsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              All Notification History
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              System alerts, billing notifications, and user registrations
            </p>

            <div className="mt-4 max-h-80 overflow-y-auto space-y-2.5 custom-scrollbar pr-1">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{notif.title}</p>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">{notif.message}</p>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 inline-block">
                      {notif.time}
                    </span>
                  </div>
                  {notif.unread && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-1 shrink-0" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={handleMarkAllNotificationsRead}
                className="px-3.5 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Mark all as read
              </button>

              <button
                type="button"
                onClick={() => setIsNotificationsModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl relative text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Confirm Logout
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Are you sure you want to end your active administrator session?
            </p>

            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogoutConfirm}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium shadow-xl shadow-slate-900/20 dark:shadow-black/40 animate-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

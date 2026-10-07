import React, { useState, useMemo } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCw,
  RotateCcw,
  MoreVertical,
  Eye,
  Copy,
  Check,
  Download,
  Plus,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter,
  X,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
  IndianRupee,
  SlidersHorizontal
} from 'lucide-react';

export default function RecentOrders({
  orders,
  searchQuery,
  onSearchChange,
  onViewOrderDetails,
  onUpdateOrderStatus,
  onAddNewOrder
}) {
  // Local state for filters and pagination
  const [statusFilter, setStatusFilter] = useState('All');
  const [amountRangeFilter, setAmountRangeFilter] = useState('All');
  const [sortField, setSortField] = useState('date'); // 'date' | 'amount' | 'customer' | 'status'
  const [sortDirection, setSortDirection] = useState('desc'); // 'asc' | 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [copiedOrderId, setCopiedOrderId] = useState(null);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);

  // New order form state
  const [newOrderForm, setNewOrderForm] = useState({
    customer: '',
    email: '',
    product: 'Premium Plan',
    amount: 24900,
    status: 'Completed',
    city: 'Bengaluru'
  });

  // Calculate status counts
  const statusCounts = useMemo(() => {
    const counts = { All: orders.length };
    orders.forEach((o) => {
      const s = o.status;
      counts[s] = (counts[s] || 0) + 1;
    });
    return counts;
  }, [orders]);

  // Filtering & Sorting
  const filteredAndSortedOrders = useMemo(() => {
    let result = orders.filter((order) => {
      // Search matching across ID, customer, product, email, and city
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.product.toLowerCase().includes(query) ||
        (order.email && order.email.toLowerCase().includes(query)) ||
        (order.city && order.city.toLowerCase().includes(query)) ||
        order.status.toLowerCase().includes(query);

      // Status filter
      const matchesStatus =
        statusFilter === 'All' || order.status.toLowerCase() === statusFilter.toLowerCase();

      // Amount range filter
      let matchesAmount = true;
      if (amountRangeFilter === 'low') {
        matchesAmount = order.amount < 20000;
      } else if (amountRangeFilter === 'mid') {
        matchesAmount = order.amount >= 20000 && order.amount <= 50000;
      } else if (amountRangeFilter === 'high') {
        matchesAmount = order.amount > 50000;
      }

      return matchesSearch && matchesStatus && matchesAmount;
    });

    // Sorting
    result.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'amount') {
        comparison = a.amount - b.amount;
      } else if (sortField === 'customer') {
        comparison = a.customer.localeCompare(b.customer);
      } else if (sortField === 'status') {
        comparison = a.status.localeCompare(b.status);
      } else if (sortField === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [orders, searchQuery, statusFilter, amountRangeFilter, sortField, sortDirection]);

  // Pagination calculation
  const totalOrders = filteredAndSortedOrders.length;
  const totalPages = Math.ceil(totalOrders / pageSize) || 1;
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * pageSize;
  const displayedOrders = filteredAndSortedOrders.slice(startIndex, startIndex + pageSize);

  // Total filtered INR amount
  const totalFilteredAmount = useMemo(() => {
    return filteredAndSortedOrders.reduce((sum, order) => sum + (order.amount || 0), 0);
  }, [filteredAndSortedOrders]);

  // Handle column header sorting toggle
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  // Status Badge Component with distinct colors & accessible labels
  const getStatusBadge = (status) => {
    const s = status.toLowerCase();
    switch (s) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Completed</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Pending</span>
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60 shadow-2xs">
            <RefreshCw className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-spin" style={{ animationDuration: '3s' }} />
            <span>Processing</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/60 shadow-2xs">
            <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Cancelled</span>
          </span>
        );
      case 'refunded':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/60 shadow-2xs">
            <RotateCcw className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Refunded</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {status}
          </span>
        );
    }
  };

  // Copy Order ID
  const handleCopyId = (id) => {
    navigator.clipboard?.writeText(id);
    setCopiedOrderId(id);
    setTimeout(() => {
      setCopiedOrderId(null);
      setActiveDropdownId(null);
    }, 1500);
  };

  // Export filtered orders as real CSV
  const handleExportCSV = () => {
    const headers = ['Order ID', 'Customer Name', 'Customer Email', 'City', 'Product / Plan', 'Amount (INR)', 'Status', 'Date', 'Payment Method'];
    const rows = filteredAndSortedOrders.map((o) => [
      o.id,
      `"${o.customer}"`,
      `"${o.email || ''}"`,
      `"${o.city || ''}"`,
      `"${o.product}"`,
      o.amount,
      o.status,
      `"${o.date}"`,
      `"${o.paymentMethod || 'Online'}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `algoryx_orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Submit new order form
  const handleCreateOrderSubmit = (e) => {
    e.preventDefault();
    if (!newOrderForm.customer.trim()) return;

    const initials = newOrderForm.customer
      .trim()
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'CU';

    const newOrder = {
      id: `#ORD-${1000 + orders.length + 1}`,
      customer: newOrderForm.customer,
      email: newOrderForm.email || `${newOrderForm.customer.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      avatarText: initials,
      product: newOrderForm.product,
      amount: Number(newOrderForm.amount) || 24900,
      status: newOrderForm.status,
      date: 'Oct 05, 2026',
      city: newOrderForm.city || 'Bengaluru',
      paymentMethod: 'UPI / Instant Pay'
    };

    onAddNewOrder?.(newOrder);
    setIsNewOrderModalOpen(false);
    setNewOrderForm({
      customer: '',
      email: '',
      product: 'Premium Plan',
      amount: 24900,
      status: 'Completed',
      city: 'Bengaluru'
    });
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm transition-colors min-w-0 overflow-hidden">
      {/* 1. Header Zone: Title, Overview Stats & Primary Actions */}
      <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Order Management
              </h2>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                {orders.length} Total
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Manage transactions, customer details, fulfillment status, and revenue in INR
            </p>
          </div>

          {/* Quick Actions: Export CSV & + New Order */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 transition-colors"
              title="Export current table to CSV file"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={() => setIsNewOrderModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs shadow-indigo-600/30 transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Order</span>
            </button>
          </div>
        </div>

        {/* Quick Filter Summaries Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              Filtered Volume:{' '}
              <strong className="text-slate-900 dark:text-white font-semibold tabular-nums">
                ₹{totalFilteredAmount.toLocaleString('en-IN')}
              </strong>
            </span>
            <span>·</span>
            <span>
              Matching Orders:{' '}
              <strong className="text-slate-900 dark:text-white font-semibold tabular-nums">
                {filteredAndSortedOrders.length}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Sort:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300 capitalize">
              {sortField} ({sortDirection === 'asc' ? 'Ascending' : 'Descending'})
            </span>
          </div>
        </div>
      </div>

      {/* 2. Search & Filter Toolbars */}
      <div className="p-4 sm:p-5 bg-slate-50/70 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800/80 space-y-3">
        {/* Row 1: Search Input & Amount Range Filter */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Real-time Search input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by customer name, order ID, plan, or email..."
              className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Amount Range Filter Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap flex items-center gap-1">
              <IndianRupee className="w-3.5 h-3.5 text-indigo-500" />
              <span>Amount:</span>
            </span>
            <select
              value={amountRangeFilter}
              onChange={(e) => {
                setAmountRangeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="All">All Amounts</option>
              <option value="low">Under ₹20,000</option>
              <option value="mid">₹20,000 - ₹50,000</option>
              <option value="high">Above ₹50,000</option>
            </select>
          </div>
        </div>

        {/* Row 2: Status Filter Tabs with Counts */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 custom-scrollbar">
          <div className="inline-flex p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 text-xs shrink-0">
            {['All', 'Completed', 'Pending', 'Processing', 'Cancelled', 'Refunded'].map((status) => {
              const count = status === 'All' ? orders.length : statusCounts[status] || 0;
              const isActive = statusFilter === status;

              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => {
                    setStatusFilter(status);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{status}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Reset Filters button if active */}
          {(statusFilter !== 'All' || amountRangeFilter !== 'All' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setStatusFilter('All');
                setAmountRangeFilter('All');
                onSearchChange('');
                setCurrentPage(1);
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline whitespace-nowrap shrink-0 px-2"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* 3. The Order Management Table - Scrollable horizontally on small screens */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-800/50 text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase select-none">
              {/* Order ID */}
              <th scope="col" className="py-3.5 pl-6 pr-3">
                Order ID
              </th>

              {/* Customer Name */}
              <th
                scope="col"
                onClick={() => handleSort('customer')}
                className="px-3 py-3.5 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Customer Name</span>
                  {sortField === 'customer' ? (
                    sortDirection === 'asc' ? <ArrowUp className="w-3 h-3 text-indigo-500" /> : <ArrowDown className="w-3 h-3 text-indigo-500" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  )}
                </div>
              </th>

              {/* Product / Plan */}
              <th scope="col" className="px-3 py-3.5">
                Product / Plan
              </th>

              {/* Amount in INR */}
              <th
                scope="col"
                onClick={() => handleSort('amount')}
                className="px-3 py-3.5 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Amount (INR)</span>
                  {sortField === 'amount' ? (
                    sortDirection === 'asc' ? <ArrowUp className="w-3 h-3 text-indigo-500" /> : <ArrowDown className="w-3 h-3 text-indigo-500" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  )}
                </div>
              </th>

              {/* Status */}
              <th
                scope="col"
                onClick={() => handleSort('status')}
                className="px-3 py-3.5 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Status</span>
                  {sortField === 'status' ? (
                    sortDirection === 'asc' ? <ArrowUp className="w-3 h-3 text-indigo-500" /> : <ArrowDown className="w-3 h-3 text-indigo-500" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  )}
                </div>
              </th>

              {/* Date */}
              <th
                scope="col"
                onClick={() => handleSort('date')}
                className="px-3 py-3.5 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Date</span>
                  {sortField === 'date' ? (
                    sortDirection === 'asc' ? <ArrowUp className="w-3 h-3 text-indigo-500" /> : <ArrowDown className="w-3 h-3 text-indigo-500" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  )}
                </div>
              </th>

              {/* Actions */}
              <th scope="col" className="py-3.5 pl-3 pr-6 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs sm:text-sm">
            {displayedOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-14 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                    <Search className="w-9 h-9 mb-2 opacity-40 text-slate-400" />
                    <p className="font-semibold text-sm text-slate-700 dark:text-slate-200">
                      No orders found.
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                      {searchQuery
                        ? `No transactions matching "${searchQuery}". Try adjusting your keywords or clearing the status filter.`
                        : 'No orders match the current filter selection.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        onSearchChange('');
                        setStatusFilter('All');
                        setAmountRangeFilter('All');
                      }}
                      className="mt-3.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                    >
                      Clear all search & filter parameters
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              displayedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                >
                  {/* Order ID */}
                  <td className="py-4 pl-6 pr-3 font-mono font-medium text-slate-900 dark:text-slate-100 tabular-nums">
                    <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md text-xs">
                      {order.id}
                    </span>
                  </td>

                  {/* Customer Name & Details */}
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-2xs shrink-0">
                        {order.avatarText}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-slate-900 dark:text-white truncate">
                          {order.customer}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {order.email} {order.city ? `· ${order.city}` : ''}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Product / Plan */}
                  <td className="px-3 py-4">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {order.product}
                    </span>
                    {order.paymentMethod && (
                      <span className="block text-[11px] text-slate-400">
                        {order.paymentMethod}
                      </span>
                    )}
                  </td>

                  {/* Amount in INR */}
                  <td className="px-3 py-4 font-bold text-slate-900 dark:text-white tabular-nums text-sm">
                    ₹{order.amount.toLocaleString('en-IN')}
                  </td>

                  {/* Status */}
                  <td className="px-3 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>

                  {/* Date */}
                  <td className="px-3 py-4 text-slate-500 dark:text-slate-400 whitespace-nowrap font-medium text-xs">
                    {order.date}
                  </td>

                  {/* Actions Dropdown */}
                  <td className="py-4 pl-3 pr-6 text-right relative">
                    <div className="inline-block text-left">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdownId(
                            activeDropdownId === order.id ? null : order.id
                          );
                        }}
                        className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        aria-label={`Actions for order ${order.id}`}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Dropdown menu */}
                      {activeDropdownId === order.id && (
                        <div
                          className="absolute right-6 top-10 w-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/15 dark:shadow-black/50 z-30 py-1 text-xs"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              onViewOrderDetails(order);
                              setActiveDropdownId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3.5 py-2 font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-400" />
                            <span>View Full Details</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopyId(order.id)}
                            className="w-full flex items-center gap-2 px-3.5 py-2 font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          >
                            {copiedOrderId === order.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5 text-slate-400" />
                            )}
                            <span>{copiedOrderId === order.id ? 'Copied ID!' : 'Copy Order ID'}</span>
                          </button>

                          {/* Quick Status Toggles */}
                          <div className="border-t border-slate-100 dark:border-slate-800 my-1 pt-1">
                            <span className="px-3.5 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                              Change Status
                            </span>
                            {['Completed', 'Pending', 'Processing', 'Cancelled'].map((st) => (
                              <button
                                key={st}
                                type="button"
                                disabled={order.status === st}
                                onClick={() => {
                                  onUpdateOrderStatus?.(order.id, st);
                                  setActiveDropdownId(null);
                                }}
                                className={`w-full flex items-center justify-between px-3.5 py-1.5 text-left font-medium transition-colors ${
                                  order.status === st
                                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30 font-semibold'
                                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}
                              >
                                <span>Mark as {st}</span>
                                {order.status === st && <Check className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 4. Pagination & Status Bar Footer */}
      <div className="px-5 sm:px-6 py-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-3">
          <span>
            Showing <strong className="text-slate-900 dark:text-white">{totalOrders === 0 ? 0 : startIndex + 1}</strong> to{' '}
            <strong className="text-slate-900 dark:text-white">{Math.min(startIndex + pageSize, totalOrders)}</strong> of{' '}
            <strong className="text-slate-900 dark:text-white">{totalOrders}</strong> orders
          </span>

          {/* Rows per page selector */}
          <div className="hidden sm:flex items-center gap-1.5 ml-2">
            <span className="text-slate-400">Per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="py-1 px-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
        </div>

        {/* Pagination Nav Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={validCurrentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="px-2.5 py-1 text-xs font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
            Page {validCurrentPage} of {totalPages}
          </span>

          <button
            type="button"
            disabled={validCurrentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5. Create Order Modal */}
      {isNewOrderModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setIsNewOrderModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Create New Order
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Add a customer purchase with amount in INR
            </p>

            <form onSubmit={handleCreateOrderSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Varma"
                  value={newOrderForm.customer}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, customer: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Customer Email
                </label>
                <input
                  type="email"
                  placeholder="e.g. ramesh.varma@example.com"
                  value={newOrderForm.email}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Plan / Product
                  </label>
                  <select
                    value={newOrderForm.product}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, product: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Starter Plan">Starter Plan</option>
                    <option value="Premium Plan">Premium Plan</option>
                    <option value="Business Plan">Business Plan</option>
                    <option value="Enterprise Suite">Enterprise Suite</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Amount (INR ₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newOrderForm.amount}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={newOrderForm.status}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, status: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    City / Region
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hyderabad"
                    value={newOrderForm.city}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewOrderModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 transition-colors"
                >
                  Save & Add Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

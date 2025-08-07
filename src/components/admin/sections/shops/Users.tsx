import React, { useState } from 'react';
import UsersTable from './component/UsersTable';
import StateSummaryCard from './component/StateSummaryCard';

interface Shop {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  joined: string;
}

const Shops = () => {
  const [shops, setShops] = useState<Shop[]>([
    { id: 1, name: 'Tharindu Stores', email: 'rahul@example.com', phone: '+91 9876543210', status: 'active', joined: '2023-10-15' },
    { id: 2, name: 'Kasun Stores', email: 'priya@example.com', phone: '+91 9876543211', status: 'pending', joined: '2023-10-10' },
    { id: 3, name: 'Nihal PVT', email: 'vikram@example.com', phone: '+91 9876543212', status: 'active', joined: '2023-10-05' },
    { id: 4, name: 'Suwa Piyasa', email: 'ananya@example.com', phone: '+91 9876543213', status: 'inactive', joined: '2023-09-28' },
    { id: 5, name: 'KFC', email: 'arjun@example.com', phone: '+91 9876543214', status: 'suspended', joined: '2023-09-20' },
    { id: 6, name: 'Pizza hut', email: 'meera@example.com', phone: '+91 9876543215', status: 'active', joined: '2023-09-15' },
    { id: 7, name: 'Odel', email: 'kiran@example.com', phone: '+91 9876543216', status: 'pending', joined: '2023-09-10' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Handle status change for a user
  const handleStatusChange = (userId: number, newStatus: Shop['status']) => {
    setShops(shops.map(shop =>
      shop.id === userId ? { ...shop, status: newStatus } : shop
    ));
  };

  // Filter users based on search term and status filter
  const filteredUsers = shops.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Status badge component
  const StatusBadge = ({ status }: { status: Shop['status'] }) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      suspended: 'bg-red-100 text-red-800',
    };

    const statusText = {
      active: 'Active',
      inactive: 'Inactive',
      pending: 'Pending',
      suspended: 'Suspended',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {statusText[status]}
      </span>
    );
  };

  return (
    <div className="animate-fadeInUp p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Shop Management</h1>
       
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, email or phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-helixaa-blue focus:border-helixaa-blue"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-helixaa-blue focus:border-helixaa-blue"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Joined</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-helixaa-blue focus:border-helixaa-blue"
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <UsersTable
        filteredUsers={filteredUsers}
        StatusBadge={StatusBadge}
        handleStatusChange={handleStatusChange}
      />
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <StateSummaryCard title={"Total Users"} value={"24,589"} />
        <StateSummaryCard title={"Active Usets"} value={"18,245"} />
        <StateSummaryCard title={"Pending Verification"} value={"3,458"} />
        <StateSummaryCard title={"Suspended Users"} value={"1,245"} />
      </div>
    </div>
  );
};

export default Shops;
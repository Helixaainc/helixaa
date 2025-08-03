import React, { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  joined: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 9876543210', status: 'active', joined: '2023-10-15' },
    { id: 2, name: 'Priya Patel', email: 'priya@example.com', phone: '+91 9876543211', status: 'pending', joined: '2023-10-10' },
    { id: 3, name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 9876543212', status: 'active', joined: '2023-10-05' },
    { id: 4, name: 'Ananya Reddy', email: 'ananya@example.com', phone: '+91 9876543213', status: 'inactive', joined: '2023-09-28' },
    { id: 5, name: 'Arjun Kumar', email: 'arjun@example.com', phone: '+91 9876543214', status: 'suspended', joined: '2023-09-20' },
    { id: 6, name: 'Meera Desai', email: 'meera@example.com', phone: '+91 9876543215', status: 'active', joined: '2023-09-15' },
    { id: 7, name: 'Kiran Joshi', email: 'kiran@example.com', phone: '+91 9876543216', status: 'pending', joined: '2023-09-10' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Handle status change for a user
  const handleStatusChange = (userId: number, newStatus: User['status']) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  // Filter users based on search term and status filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Status badge component
  const StatusBadge = ({ status }: { status: User['status'] }) => {
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
        <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
        <button className="bg-helixaa-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <i className="fas fa-plus mr-2"></i> Add New User
        </button>
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
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Joined</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-helixaa-blue/10 flex items-center justify-center text-helixaa-blue font-bold mr-3">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-gray-500 text-sm">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900">{user.email}</div>
                    <div className="text-gray-500 text-sm">{user.phone}</div>
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="py-4 px-6 text-gray-500">
                    {new Date(user.joined).toLocaleDateString('en-IN')}
                  </td>
                  <td className="py-4 px-6">
                    <div className="relative">
                      <select
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-helixaa-blue focus:border-helixaa-blue sm:text-sm"
                        value={user.status}
                        onChange={(e) => handleStatusChange(user.id, e.target.value as User['status'])}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-gray-700 mb-4 md:mb-0">
              Showing <span className="font-medium">1</span> to <span className="font-medium">7</span> of{' '}
              <span className="font-medium">24</span> users
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300">
                Previous
              </button>
              <button className="px-4 py-2 bg-helixaa-blue text-white rounded-lg hover:bg-blue-700">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <h3 className="text-2xl font-bold mt-1">24,589</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
              <i className="fas fa-users text-xl"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Active Users</p>
              <h3 className="text-2xl font-bold mt-1">18,245</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <i className="fas fa-user-check text-xl"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Pending Verification</p>
              <h3 className="text-2xl font-bold mt-1">3,458</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600">
              <i className="fas fa-user-clock text-xl"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Suspended Users</p>
              <h3 className="text-2xl font-bold mt-1">1,245</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
              <i className="fas fa-user-slash text-xl"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
import React from 'react'


// Define the UserStatus type
type ShopStatus = 'active' | 'inactive' | 'pending' | 'suspended';

// Define the User interface
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: ShopStatus;
  joined: string;
}

// Define the component props
interface ShopsTableProps {
  filteredUsers: User[];
  StatusBadge: React.FC<{ status: ShopStatus }>;
  handleStatusChange: (userId: number, newStatus: ShopStatus) => void;
}

function ShopsTable({ filteredUsers, StatusBadge, handleStatusChange }: ShopsTableProps) {
  return (
<div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shop</th>
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
                  onChange={(e) => handleStatusChange(user.id, e.target.value as ShopStatus)}
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
  )
}

export default ShopsTable
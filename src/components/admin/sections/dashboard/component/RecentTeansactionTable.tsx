import React from 'react'

function RecentTeansactionTable({transactions}) {
  return (
    <div className="bg-white rounded-xl shadow mb-6 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
        <div className="p-5 border-b">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Recent Transactions</h3>
            <button className="text-helixaa-blue text-sm font-medium">View All</button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Merchant</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction, index) => (
                <tr key={index} className="transaction-row">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-helixaa-blue/10 flex items-center justify-center text-helixaa-blue mr-3">
                        <i className="fas fa-user"></i>
                      </div>
                      <span>{transaction.user}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">{transaction.merchant}</td>
                  <td className="py-4 px-6 font-medium">{transaction.amount}</td>
                  <td className="py-4 px-6 text-gray-500">{transaction.date}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 text-xs rounded-full bg-${transaction.statusColor}-100 text-${transaction.statusColor}-800`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  )
}

export default RecentTeansactionTable
'use client';

import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import type { ChartType, ChartData, ChartOptions } from 'chart.js';

// Define types for our data structures
type StatCard = {
  title: string;
  value: string;
  icon: string;
  color: 'blue' | 'green';
  change: { value: string; direction: 'up' | 'down' };
};

type UserActivity = {
  title: string;
  icon: string;
  color: 'blue' | 'green';
  percentage: number;
};

type Transaction = {
  user: string;
  merchant: string;
  amount: string;
  date: string;
  status: string;
  statusColor: 'green' | 'yellow' | 'red';
};

type QuickAction = {
  title: string;
  icon: string;
  color: 'blue';
};

type SystemStatus = {
  title: string;
  status: string;
  percentage: number;
};

const DashBoard = () => {
  const revenueChartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    // Cleanup previous chart if exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    if (!revenueChartRef.current) return;

    const ctx = revenueChartRef.current.getContext('2d');
    if (!ctx) return;

    // Create new chart instance
    chartInstance.current = new Chart(ctx, {
      type: 'line' as ChartType,
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [
          {
            label: 'Users (in)',
            data: [150000, 165000, 180000, 175000, 190000, 210000, 230000, 250000, 265000, 284000],
            borderColor: '#082C38',
            backgroundColor: 'rgba(8, 44, 56, 0.05)',
            borderWidth: 2,
            fill: true,
            tension: 0.3,
          },
          {
            label: 'App Downloads',
            data: [4200, 4500, 4700, 4600, 4800, 5000, 5200, 5100, 5300, 5248],
            borderColor: '#C19976',
            borderWidth: 2,
            fill: false,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              lineWidth: 0,
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      } as ChartOptions<'line'>,
    });

    // Cleanup function to destroy chart on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, []);

  // Data arrays with explicit types
  const statCards: StatCard[] = [
    { 
      title: 'Total Revenue', 
      value: ' LKR : 2,84,760', 
      icon: 'fas fa-rupee-sign', 
      color: 'blue', 
      change: { value: '12.5%', direction: 'up' } 
    },
    { 
      title: 'Active Users', 
      value: '24,589', 
      icon: 'fas fa-users', 
      color: 'green', 
      change: { value: '8.3%', direction: 'up' } 
    },
    { 
      title: 'Transactions', 
      value: '5,248', 
      icon: 'fas fa-exchange-alt', 
      color: 'blue', 
      change: { value: '5.2%', direction: 'up' } 
    },
    { 
      title: 'Avg. Transaction', 
      value: 'LKR : 2,450', 
      icon: 'fas fa-wallet', 
      color: 'green', 
      change: { value: '1.7%', direction: 'down' } 
    },
  ];

  const userActivities: UserActivity[] = [
    { title: 'App Downloads', icon: 'fas fa-download', color: 'blue', percentage: 78 },
    { title: 'Transactions', icon: 'fas fa-credit-card', color: 'green', percentage: 65 },
    { title: 'New Users', icon: 'fas fa-user-plus', color: 'blue', percentage: 92 },
    { title: 'KYC Completed', icon: 'fas fa-shield-alt', color: 'green', percentage: 56 },
  ];

  const transactions: Transaction[] = [
    { user: 'Rahul Sharma', merchant: 'Amazon India', amount: 'LKR : 8,499', date: 'Oct 12, 2023', status: 'Completed', statusColor: 'green' },
    { user: 'Priya Patel', merchant: 'Flipkart', amount: 'LKR : 12,250', date: 'Oct 11, 2023', status: 'Pending', statusColor: 'yellow' },
    { user: 'Vikram Singh', merchant: 'Myntra', amount: 'LKR : 5,799', date: 'Oct 10, 2023', status: 'Completed', statusColor: 'green' },
    { user: 'Ananya Reddy', merchant: 'Croma', amount: 'LKR : 18,990', date: 'Oct 9, 2023', status: 'Declined', statusColor: 'red' },
  ];

  const quickActions: QuickAction[] = [
    { title: 'Add User', icon: 'fas fa-user-plus', color: 'blue' },
    { title: 'Add Merchant', icon: 'fas fa-store', color: 'blue' },
    { title: 'Generate Report', icon: 'fas fa-file-invoice', color: 'blue' },
    { title: 'Settings', icon: 'fas fa-cog', color: 'blue' },
  ];

  const systemStatuses: SystemStatus[] = [
    { title: 'API Server', status: 'Online', percentage: 100 },
    { title: 'Database', status: 'Online', percentage: 100 },
    { title: 'Payment Gateway', status: 'Online', percentage: 100 },
    { title: 'Uptime', status: '99.97%', percentage: 99.97 },
  ];

  return (
    <div className="animate-fadeInUp">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statCards.map((card, index) => (
          <div 
            key={index}
            className="stat-card bg-white rounded-xl shadow p-5 transition-all duration-300 animate-fadeInUp"
            style={{ animationDelay: `${0.1 * index}s` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>
                <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-helixaa-${card.color}/10 flex items-center justify-center text-helixaa-${card.color}`}>
                <i className={`${card.icon} text-xl`}></i>
              </div>
            </div>
            <div className="mt-3">
              <span className={`text-${card.change.direction === 'up' ? 'green' : 'red'}-500 text-sm font-medium`}>
                <i className={`fas fa-arrow-${card.change.direction}`}></i> {card.change.value}
              </span>
              <span className="text-gray-500 text-sm ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Charts and Data Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-5 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-gray-800">Users Overview</h3>
            <div>
              <button className="text-sm bg-gray-100 px-3 py-1 rounded-lg mr-2">Month</button>
              <button className="text-sm bg-helixaa-blue text-white px-3 py-1 rounded-lg">Quarter</button>
            </div>
          </div>
          <div className="h-72">
            <canvas ref={revenueChartRef} id="revenueChart"></canvas>
          </div>
        </div>
        
        {/* User Activity */}
        <div className="bg-white rounded-xl shadow p-5 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <h3 className="font-bold text-gray-800 mb-5">User Activity</h3>
          <div className="space-y-4">
            {userActivities.map((activity, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-10 h-10 rounded-full bg-helixaa-${activity.color}/10 flex items-center justify-center text-helixaa-${activity.color} mr-3`}>
                  <i className={activity.icon}></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.title}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className={`bg-helixaa-${activity.color === 'blue' ? 'blue' : 'green'} h-2 rounded-full`} 
                      style={{ width: `${activity.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-gray-500 text-sm">{activity.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Recent Transactions */}
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
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-bold text-gray-800 mb-5">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <button 
                key={index}
                className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-helixaa-blue hover:bg-helixaa-blue/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-helixaa-blue/10 flex items-center justify-center text-helixaa-blue mb-2">
                  <i className={action.icon}></i>
                </div>
                <span className="text-sm">{action.title}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-helixaa-blue rounded-xl shadow p-5 text-white">
          <h3 className="font-bold text-xl mb-3">System Status</h3>
          <p className="text-helixaa-green/80 mb-5">All systems are operational</p>
          
          <div className="space-y-4">
            {systemStatuses.map((status, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span>{status.title}</span>
                  <span className="text-green-400">{status.status}</span>
                </div>
                <div className="w-full bg-helixaa-green/20 rounded-full h-2">
                  <div 
                    className="bg-helixaa-green h-2 rounded-full" 
                    style={{ width: `${status.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
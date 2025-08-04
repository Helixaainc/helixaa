'use client';

import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import type { ChartType, ChartData, ChartOptions } from 'chart.js';
import StatsCard from './component/StatsCard';
import LineChart from './component/LineChart';
import UserActivity from './component/UserActivity';
import RecentTeansactionTable from './component/RecentTeansactionTable';
import QuickActions from './component/QuickActions';
import SystemStatus from './component/SystemStatus';

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

          <StatsCard 
          index={index} 
          title={card.title} 
          value={card.value} 
          changeDirection={card.change.direction} 
          changeValue={card.change.value}
          color={card.color}
          icon={card.icon}
          key={index}
          />

          
        ))}
      </div>
      
      {/* Charts and Data Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart */}
        <LineChart Ref={revenueChartRef} />
        
        {/* User Activity */}
        <UserActivity userActivities={userActivities} />
      </div>
      
      {/* Recent Transactions */}
      <RecentTeansactionTable transactions={transactions} />
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
        <QuickActions quickActions={quickActions}/>
        
        <SystemStatus systemStatuses={systemStatuses} />
        
      </div>
    </div>
  );
};

export default DashBoard;
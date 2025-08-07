import React from 'react'

function StateSummaryCard({ title, value }) {
    return (
        <div className="bg-white rounded-xl shadow p-5">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-gray-500 text-sm">{title}</p>
                    <h3 className="text-2xl font-bold mt-1">{value}</h3>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    <i className="fas fa-user-check text-xl"></i>
                </div>
            </div>

        </div>
    )
}

export default StateSummaryCard
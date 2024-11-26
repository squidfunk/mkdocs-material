# ASA Test Position Monitoring Dashboard

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, CheckCircle, Filter } from 'lucide-react';

const ASAMonitoringDashboard = () => {
  // State for filters
  const [timeRange, setTimeRange] = useState('1h'); // 1h, 8h, 24h, 7d
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedInspectionType, setSelectedInspectionType] = useState('all');
  const [showFailedOnly, setShowFailedOnly] = useState(false);
  
  // State for pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);

  // Inspection metadata
  const inspectionTypes = {
    quality: {
      name: "Quality Check",
      inspections: [1],
      color: "#8884d8"
    },
    mechanical: {
      name: "Mechanical",
      inspections: [2, 9, 10, 11, 12, 13, 14],
      color: "#82ca9d"
    },
    welding: {
      name: "Welding",
      inspections: [3, 4, 5, 6, 7, 8],
      color: "#ffc658"
    },
    electrical: {
      name: "Electrical",
      inspections: [15, 16, 17, 18],
      color: "#ff7300"
    }
  };

  // Filter UI
  const FilterBar = () => (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
      {/* Time Range Filter */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Time Range</label>
        <select 
          className="p-2 border rounded"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="1h">Last Hour</option>
          <option value="8h">Last 8 Hours</option>
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
        </select>
      </div>

      {/* Order ID Filter */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Order ID</label>
        <input 
          type="text"
          className="p-2 border rounded"
          placeholder="Filter by Order ID"
          onChange={(e) => setSelectedOrderId(e.target.value)}
        />
      </div>

      {/* Inspection Type Filter */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Inspection Type</label>
        <select 
          className="p-2 border rounded"
          value={selectedInspectionType}
          onChange={(e) => setSelectedInspectionType(e.target.value)}
        >
          <option value="all">All Types</option>
          {Object.entries(inspectionTypes).map(([key, type]) => (
            <option key={key} value={key}>{type.name}</option>
          ))}
        </select>
      </div>

      {/* Failed Only Toggle */}
      <div className="flex items-center gap-2">
        <input 
          type="checkbox"
          id="failedOnly"
          checked={showFailedOnly}
          onChange={(e) => setShowFailedOnly(e.target.checked)}
        />
        <label htmlFor="failedOnly" className="text-sm font-medium">
          Show Failed Only
        </label>
      </div>
    </div>
  );

  // Results Table
  const ResultsTable = ({ data }) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Timestamp
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Item ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Inspection
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Value
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Result
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, idx) => (
            <tr key={idx} className={row.result ? 'bg-white' : 'bg-red-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(row.timestamp).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {row.orderId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.itemId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.inspection}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.value} {row.uom}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {row.result ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Trend Chart
  const TrendChart = ({ data }) => (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(value) => new Date(value).toLocaleTimeString()}
          />
          <YAxis />
          <Tooltip 
            labelFormatter={(value) => new Date(value).toLocaleString()}
            formatter={(value, name) => [value.toFixed(3), name]}
          />
          <Legend />
          {Object.entries(inspectionTypes).map(([key, type]) => (
            type.inspections.map(inspectionNum => (
              <Line
                key={`inspection${inspectionNum}`}
                type="monotone"
                dataKey={`inspection${inspectionNum}.value`}
                name={`Inspection ${inspectionNum}`}
                stroke={type.color}
                dot={false}
                hide={selectedInspectionType !== 'all' && selectedInspectionType !== key}
              />
            ))
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  // Pagination Controls
  const PaginationControls = () => (
    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Rows per page:</span>
        <select
          className="p-1 border rounded"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={250}>250</option>
          <option value={500}>500</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="px-3 py-1">Page {page}</span>
        <button
          className="px-3 py-1 border rounded"
          onClick={() => setPage(p => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>ASA Inspection Results</span>
            <Filter className="h-5 w-5" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FilterBar />
          <TrendChart data={[]} /> {/* Pass your filtered data here */}
          <ResultsTable data={[]} /> {/* Pass your filtered data here */}
          <PaginationControls />
        </CardContent>
      </Card>
    </div>
  );
};

export default ASAMonitoringDashboard;
# Device-Dashboard Import Script CVS GLPI


``` TypeScript
import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const DeviceManagementDashboard = () => {
  // Status Distribution Data
  const statusData = [
    { name: 'In Use', value: 365 },
    { name: 'In Stock', value: 11 },
    { name: 'In Repair', value: 1 },
    { name: 'Retired', value: 2 }
  ];

  // Manufacturer Distribution (top 5)
  const manufacturerData = [
    { name: 'HP', value: 286 },
    { name: 'Dell Inc.', value: 39 },
    { name: 'Microsoft', value: 21 },
    { name: 'Other', value: 33 }
  ];

  // Type Distribution (cleaned and grouped)
  const typeData = [
    { name: 'Notebook/Laptop', value: 134 },
    { name: 'Convertible', value: 94 },
    { name: 'Desktop/Mini PC', value: 105 },
    { name: 'Detachable', value: 14 },
    { name: 'Other', value: 32 }
  ];

  // OS Distribution
  const osData = [
    { name: 'Windows 10', value: 338 },
    { name: 'Windows 11', value: 7 },
    { name: 'Windows Server', value: 4 },
    { name: 'Other/Unspecified', value: 30 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="w-full p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Device Status */}
        <Card>
          <CardHeader>
            <CardTitle>Device Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Manufacturer Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Manufacturer Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={manufacturerData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Device Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Device Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {typeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Operating System Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Operating System Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={osData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Key Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-100 rounded-lg">
              <div className="text-2xl font-bold">379</div>
              <div className="text-sm text-gray-600">Total Devices</div>
            </div>
            <div className="p-4 bg-green-100 rounded-lg">
              <div className="text-2xl font-bold">242</div>
              <div className="text-sm text-gray-600">Active Devices (30 days)</div>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg">
              <div className="text-2xl font-bold">96.3%</div>
              <div className="text-sm text-gray-600">Devices In Use</div>
            </div>
            <div className="p-4 bg-purple-100 rounded-lg">
              <div className="text-2xl font-bold">11</div>
              <div className="text-sm text-gray-600">Available Stock</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceManagementDashboard;
```
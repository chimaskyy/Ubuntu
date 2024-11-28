

function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500">Total Sales</h3>
            <h1 className="w-6 h-6 text-blue-600"> ₦</h1>
            {/* <DollarSign className="w-6 h-6 text-blue-600" /> */}
          </div>
          <p className="text-2xl font-bold">$24,780</p>
          <p className="text-green-600 text-sm">+12% from last month</p>
        </div>
        {/* More stat cards... */}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Recent Orders</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="px-6 py-4">#12345</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Delivered
                </span>
              </td>
              <td className="px-6 py-4">$129.99</td>
            </tr>
            {/* More rows... */}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard
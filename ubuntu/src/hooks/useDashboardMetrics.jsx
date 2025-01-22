// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {fetchAllOrders} from "@/reducers/orderSlice"
// import { fetchUsers } from "@/reducers/userSlice";



// const formatCurrency = (amount) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'NGN',
//   }).format(amount);
// };

// const calculateMonthlyChange = (current, previous) => {
//   if (previous === 0) return '+100%';
//   const percentageChange = ((current - previous) / previous) * 100;
//   return `${percentageChange >= 0 ? '+' : ''}${percentageChange.toFixed(1)}%`;
// };

// const getMonthName = (date) => {
//   return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
// };

// export const useDashboardMetrics = () => {
//   const dispatch = useDispatch();
//   const { orders, loading: ordersLoading } = useSelector((state) => state.orders);
//   const { users, status: usersStatus } = useSelector((state) => state.users);

//   useEffect(() => {
//     dispatch(fetchAllOrders());
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   const calculateMetrics = () => {
//     if (ordersLoading || usersStatus === 'loading') {
//       return { metrics: [], isLoading: true, error: null };
//     }

//     const now = new Date();
//     const currentMonth = now.getMonth();
//     const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
//     const currentYear = now.getFullYear();
//     const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

//     // Filter orders
//     const activeOrders = orders.filter((order) => order.status !== 'cancelled');
//     const currentMonthOrders = activeOrders.filter((order) => {
//       const orderDate = new Date(order.createdAt);
//       return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
//     });
//     const previousMonthOrders = activeOrders.filter((order) => {
//       const orderDate = new Date(order.createdAt);
//       return orderDate.getMonth() === previousMonth && orderDate.getFullYear() === previousYear;
//     });

//     // Calculate customers (users with shipped orders)
//     const shippedOrderCustomers = new Set(
//       orders
//         .filter((order) => order.status === 'shipped')
//         .map((order) => order.userId)
//     );
//     const currentMonthCustomers = new Set(
//       currentMonthOrders.map((order) => order.userId)
//     );
//     const previousMonthCustomers = new Set(
//       previousMonthOrders.map((order) => order.userId)
//     );

//     // Calculate revenue
//     const currentMonthRevenue = currentMonthOrders.reduce(
//       (sum, order) => sum + (parseFloat(order.totalAmount) || 0),
//       0
//     );
//     const previousMonthRevenue = previousMonthOrders.reduce(
//       (sum, order) => sum + (parseFloat(order.totalAmount) || 0),
//       0
//     );

//     const metrics = [
//       {
//         title: 'Total Revenue',
//         value: formatCurrency(currentMonthRevenue),
//         change: {
//           value: `${calculateMonthlyChange(currentMonthRevenue, previousMonthRevenue)} from last month`,
//           trend: currentMonthRevenue >= previousMonthRevenue ? 'positive' : 'negative',
//         },
//       },
//       {
//         title: 'Active Customers',
//         value: shippedOrderCustomers.size.toString(),
//         change: {
//           value: `${calculateMonthlyChange(
//             currentMonthCustomers.size,
//             previousMonthCustomers.size
//           )} from last month`,
//           trend: currentMonthCustomers.size >= previousMonthCustomers.size ? 'positive' : 'negative',
//         },
//       },
//       {
//         title: 'Total Orders',
//         value: activeOrders.length.toString(),
//         change: {
//           value: `${calculateMonthlyChange(
//             currentMonthOrders.length,
//             previousMonthOrders.length
//           )} from last month`,
//           trend: currentMonthOrders.length >= previousMonthOrders.length ? 'positive' : 'negative',
//         },
//       },
//       {
//         title: 'Shipped Orders',
//         value: orders.filter((order) => order.status === 'shipped').length.toString(),
//         change: {
//           value: `${calculateMonthlyChange(
//             currentMonthOrders.filter((order) => order.status === 'shipped').length,
//             previousMonthOrders.filter((order) => order.status === 'shipped').length
//           )} from last month`,
//           trend:
//             currentMonthOrders.filter((order) => order.status === 'shipped').length >=
//             previousMonthOrders.filter((order) => order.status === 'shipped').length
//               ? 'positive'
//               : 'negative',
//         },
//       },
//     ];

//     return { metrics, isLoading: false, error: null };
//   };

//   return calculateMetrics();
// };

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '@/reducers/orderSlice';
import { fetchUsers } from '@/reducers/userSlice';



const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);
};

const calculateMonthlyChange = (current, previous) => {
  if (previous === 0) return '+100%';
  const percentageChange = ((current - previous) / previous) * 100;
  return `${percentageChange >= 0 ? '+' : ''}${percentageChange.toFixed(1)}%`;
};

const getMonthName = (date) => {
  return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
};

export const useDashboardMetrics = () => {
  const dispatch = useDispatch();
  const { orders, loading: ordersLoading } = useSelector((state) => state.orders);
  const { users, status: usersStatus } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchAllOrders());
    dispatch(fetchUsers());
  }, [dispatch]);

  const calculateMetrics = ()=> {
    if (ordersLoading || usersStatus === 'loading') {
      return { metrics: [], monthlyData: [], isLoading: true, error: null };
    }

    const now = new Date();
    const currentMonth = now.getMonth();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const currentYear = now.getFullYear();
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    // Filter active orders (not cancelled)
    const activeOrders = orders.filter((order) => order.status !== 'cancelled');

    // Calculate total revenue from all active orders
    const totalRevenue = activeOrders.reduce(
      (sum, order) => sum + (parseFloat(order.totalAmount) || 0),
      0
    );

    // Get current and previous month data
    const currentMonthOrders = activeOrders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
    });

    const previousMonthOrders = activeOrders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate.getMonth() === previousMonth && orderDate.getFullYear() === previousYear;
    });

    // Calculate monthly data for the chart (last 6 months)
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - i, 1);
      const monthOrders = activeOrders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return (
          orderDate.getMonth() === date.getMonth() &&
          orderDate.getFullYear() === date.getFullYear()
        );
      });

      const monthlyCustomers = new Set(monthOrders.map((order) => order.userId));
      const monthlyRevenue = monthOrders.reduce(
        (sum, order) => sum + (parseFloat(order.totalAmount) || 0),
        0
      );

      monthlyData.push({
        name: getMonthName(date),
        revenue: monthlyRevenue,
        orders: monthOrders.length,
        customers: monthlyCustomers.size,
      });
    }

    // Calculate current month metrics
    const currentMonthRevenue = currentMonthOrders.reduce(
      (sum, order) => sum + (parseFloat(order.totalAmount) || 0),
      0
    );
    const previousMonthRevenue = previousMonthOrders.reduce(
      (sum, order) => sum + (parseFloat(order.totalAmount) || 0),
      0
    );

    const currentMonthCustomers = new Set(currentMonthOrders.map((order) => order.userId));
    const previousMonthCustomers = new Set(previousMonthOrders.map((order) => order.userId));

    const metrics = [
      {
        title: 'Total Revenue',
        value: formatCurrency(totalRevenue),
        change: {
          value: `${calculateMonthlyChange(currentMonthRevenue, previousMonthRevenue)} from last month`,
          trend: currentMonthRevenue >= previousMonthRevenue ? 'positive' : 'negative',
        },
      },
      {
        title: 'Active Customers',
        value: currentMonthCustomers.size.toString(),
        change: {
          value: `${calculateMonthlyChange(
            currentMonthCustomers.size,
            previousMonthCustomers.size
          )} from last month`,
          trend: currentMonthCustomers.size >= previousMonthCustomers.size ? 'positive' : 'negative',
        },
      },
      {
        title: 'Total Orders',
        value: activeOrders.length.toString(),
        change: {
          value: `${calculateMonthlyChange(
            currentMonthOrders.length,
            previousMonthOrders.length
          )} from last month`,
          trend: currentMonthOrders.length >= previousMonthOrders.length ? 'positive' : 'negative',
        },
      },
      {
        title: 'Shipped Orders',
        value: orders.filter((order) => order.status === 'shipped').length.toString(),
        change: {
          value: `${calculateMonthlyChange(
            currentMonthOrders.filter((order) => order.status === 'shipped').length,
            previousMonthOrders.filter((order) => order.status === 'shipped').length
          )} from last month`,
          trend:
            currentMonthOrders.filter((order) => order.status === 'shipped').length >=
            previousMonthOrders.filter((order) => order.status === 'shipped').length
              ? 'positive'
              : 'negative',
        },
      },
    ];

    return { metrics, monthlyData, isLoading: false, error: null };
  };

  return calculateMetrics();
};
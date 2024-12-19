import React, { useState, useEffect } from "react";
import { adminRevenueAPI } from "../../api/admin";
import Layout from "../../components/admin/Layout";
import PageInfo from "../../components/common/PageInfo";


const Revenue = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminRevenue = async () => {
      try {
        const response = await adminRevenueAPI();
        setRevenueData(response.data.revenue);
        setTotalRevenue(response.data.totalRevenue);
      } catch (error) {
        console.error("Error fetching admin revenue:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminRevenue();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
        <PageInfo admin pageName={"Admin Revenue"}/>
        <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">Total Revenue</h1>
      <p className="text-2xl font-bold mb-6 text-green-800">{totalRevenue.toFixed(2)} INR</p>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Course</th>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {revenueData.map((item) => (
            <tr key={item.orderId}>
              <td className="border px-4 py-2">{item.courseTitle}</td>
              <td className="border px-4 py-2">{item.orderId}</td>
              <td className="border px-4 py-2">${item.adminRevenue.toFixed(2)}</td>
              <td className="border px-4 py-2">{new Date(item.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </Layout>
  
  );
};

export default Revenue;




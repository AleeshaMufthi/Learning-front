import React, {useState, useEffect} from "react";
import { tutorRevenueAPI } from "../../api/tutor";
import ProfileLayout from "../../components/tutor/ProfileLayout";
import PageInfo from "../../components/common/PageInfo";

const Revenue = ({ tutorId }) => {
    const [revenueData, setRevenueData] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchTutorRevenue = async () => {
        try {
          const response = await tutorRevenueAPI();
          
          setRevenueData(response.data.revenue);
          setTotalRevenue(response.data.totalRevenue);
        } catch (error) {
          console.error("Error fetching tutor revenue:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchTutorRevenue();
    }, [tutorId]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
        <>
        <ProfileLayout tutor>
        <PageInfo pageName={"Tutor Revenue"} tutor />
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-xl font-bold mb-4">Total Revenue: </h1>
        <p className="text-2xl text-green-800 font-bold mb-6">{totalRevenue.toFixed(2)} INR</p>
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
                <td className="border px-4 py-2">{item.tutorRevenue.toFixed(2)} INR</td>
                <td className="border px-4 py-2">{new Date(item.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </ProfileLayout>
      </>
    );
  };
  
  export default Revenue;

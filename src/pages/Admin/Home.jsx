import Layout from "../../components/admin/Layout";
import React, { useState, useEffect } from "react";
import CardOne from "../../components/admin/CardOne";
import ChartOne from "../../components/admin/ChartOne";
import ChartTwo from "../../components/admin/ChartTwo";
import { adminDasboardAPI } from "../../api/admin";

export default function Home() {

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTutors, setTotalTutors] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalPurchases, setTotalPurchases] = useState(0);

    const dataValues = {
      title1: "Tutors Registration",
      title2: "Users Registration",
      data1: [0, 0, 19, 0, 0, 2, 0, 0, 6, 0, 0, 0],
      data2: [0, 0, 31, 0, 0, 0, 0, 0, 16, 0, 0, 0],
    };
    const profits = {
      title1: "Total Course Sales",
      data1: [13, 23, 20, 8, 13, 27, 15],
    };

    useEffect(() => {
      const fetchDashboardCounts = async () => {
        try {
          const response = await adminDasboardAPI();
          const { users, tutors, courses, purchases } = response.data;
          setTotalUsers(users);
          setTotalTutors(tutors);
          setTotalCourses(courses);
          setTotalPurchases(purchases);
        } catch (error) {
          console.error("Error fetching dashboard counts:", error);
        }
      };
  
      fetchDashboardCounts();
    }, []);

    return (
      <Layout>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <CardOne
            title="Total Courses"
            count={totalCourses}
            percentage="1.41"
            type="eye"
          />
          <CardOne
            title="Total Purchased"
            count={totalPurchases}
            percentage="-1.41"
            type="purchase"
          />
          <CardOne 
          title="Total Users" 
          count={totalUsers} 
          percentage="1.41" 
          type="users" />
          <CardOne
            title="Total Tutors"
            count={totalTutors}
            percentage="2.41"
            type="users"
          />
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartOne dataValues={dataValues} />
          <ChartTwo profits={profits} />
        </div>
      </Layout>
    );
  }
  
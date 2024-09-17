import Layout from "../../components/admin/Layout";
import React from "react";
import CardOne from "../../components/admin/CardOne";
import ChartOne from "../../components/admin/ChartOne";
import ChartTwo from "../../components/admin/ChartTwo";

export default function Home() {
    const dataValues = {
      title1: "Tutors Registration",
      title2: "Users Registration",
      data1: [0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0],
      data2: [0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0],
    };
    const profits = {
      title1: "Total Course Sales",
      data1: [13, 23, 20, 8, 13, 27, 15],
    };
    return (
      <Layout>
        {/* <Breadcrumb pageName={'Dashboard'} /> */}
        <div className="grid grid-cols-1 rounded-lg gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardOne
            title="Total Courses"
            count="20"
            percentage="1.41"
            type="eye"
            tutor
          />
          <CardOne
            title="Total Purchased"
            count="7"
            percentage="-1.41"
            type="purchase"
            tutor
          />
          <CardOne title="Total Users" count="8" percentage="1.41" type="users" />
          <CardOne
            title="Total Tutors"
            count="6"
            percentage="2.41"
            type="users"
          />
        </div>
  
        <div className="mt-4 grid grid-cols-12 rounded-lg gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <ChartOne dataValues={dataValues} />
          <ChartTwo profits={profits} />
          {/* <ChartThree /> */}
        </div>
      </Layout>
    );
  }
  
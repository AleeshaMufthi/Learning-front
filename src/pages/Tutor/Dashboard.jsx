import CardOne from "../../components/admin/CardOne";
import ChartOne from "../../components/admin/ChartOne";
import ChartTwo from "../../components/admin/ChartTwo";

export default function Dashboard() {
  const dataValues = {
    title1: "Courses",
    // title2: "Users Registration",
    data1: [0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0],
    // data2: [0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0],
  };
  const profits = {
    title1: "Total Sales",
    data1: [13, 23, 20, 8, 13, 27, 15],
  };
  return (
    <div className="m-30">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        <CardOne
          title="Course Posted"
          count="20"
          percentage="1.41"
          type="eye"
          tutor
        />
        <CardOne
          title="Course Purchased"
          count="7"
          percentage="-1.41"
          type="purchase"
          tutor
        />
        {/* <CardTwo /> */}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne dataValues={dataValues} />
        <ChartTwo profits={profits} />
        {/* <ChartThree /> */}
      </div>
    </div>
  );
}
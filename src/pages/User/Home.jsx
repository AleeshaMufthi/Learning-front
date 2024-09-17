import { useState, useEffect } from "react";
import NavBar from "../../components/user/NavBar";
import Banner from "../../components/common/Banner";
import CategoryCard from "../../components/user/CategoryCard";
import TrendingCourse from "../../components/user/TrendingCourse";
// import { getAllCategoriesAPI } from "../../api/common";
import TopBanner from '../../components/common/TopBanner'
import TabSection from "../../components/user/TabSection";
import Footer from '../../components/common/Footer'

export default function Home() {

    const [showComponent, setShowComponent] = useState(false);

    const promotion = {
      title: "react",
      description:
        "From the person who made javascript easy as possible introducing",
      link: "/explore",
    };
    const closeBanner = () => {
      setShowComponent(false);
    };
    // useEffect(() => {
    //   getAllCategoriesAPI().then(({ data }) => {
    //     setCategories(data.categories);
    //   });
    //   setTimeout(() => {
    //     setShowComponent(true);
    //   }, 5000);
    // }, []);
    return (
      <>
      <NavBar />
        <TopBanner
          linkTitle={promotion.title}
          to={promotion.link}
          description={promotion.description}
          showComponent={showComponent}
          closeBanner={closeBanner}
        />
        <div className="pt-10 px-1 md:px-10 sm:px-5 bg-gray-300 pb-24">
          <Banner />
          <TabSection />
          <Footer />
        </div>
      </>
    );
  }
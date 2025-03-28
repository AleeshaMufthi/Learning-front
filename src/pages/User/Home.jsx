import { useState, useEffect } from "react";
import Banner from "../../components/common/Banner";
import CategoryCard from "../../components/user/CategoryCard";
import TrendingCourse from "../../components/user/TrendingCourse";
import { getAllCategoriesAPI } from "../../api/common";
import TopBanner from '../../components/common/TopBanner'
import TabSection from "../../components/user/TabSection";
import Footer from '../../components/common/Footer'

export default function Home() {
   const [categories, setCategories] = useState([]);
    const [showComponent, setShowComponent] = useState(false);
    
    const closeBanner = () => {
      setShowComponent(false);
    };
    useEffect(() => {
      getAllCategoriesAPI().then(({ data }) => {
        setCategories(data.category);
      });
      setTimeout(() => {
        setShowComponent(true);
      }, 5000);
    }, []);
    return (
      <>
        <TopBanner
          closeBanner={closeBanner}
        />
        <div className="pt-10 px-1 md:px-10 sm:px-5 bg-gray-300 pb-24">
          <Banner />
          <CategoryCard categories={categories} />
          <TrendingCourse />
          <TabSection />
          <Footer />
        </div>
      </>
    );
  }
import SectionTitle from "../common/SectionTitle";
import CourseCard from "./CourseCard";
import HorizontalRule from '../common/HorizontalRule'

export default function TrendingCourse() {
    return (
      <>
        <SectionTitle
          title="Trending Course"
          description="View the trending courses"
        />
        <HorizontalRule />
        <CourseCard />
      </>
    );
  }
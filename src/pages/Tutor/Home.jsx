import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import Banner from "../../components/common/Banner";
import TutorAdvantages from "../../components/tutor/TutorAdvantages";
import Footer from "../../components/common/Footer";
import NavBar from "../../components/tutor/NavBar";
import TopTutors from "../../components/tutor/TopTutors";

export default function Home() {
    return (
      <>
      <NavBar />
        <div className="pt-10 px-1 md:px-10 sm:px-5 bg-gray-200/95 pb-24">
          <Banner /> 
          <div className="flex justify-center px-3 mt-10">
            <Card className="max-w-4xl mb-10">
              <h5 className="mb-2 nexa-font text-3xl font-bold text-amber-500 text-center dark:text-white">
                Create a New Course
              </h5>
              <p className="mb-5 text-center text-base text-gray-500 dark:text-gray-400 sm:text-lg font-normal nexa-font px-10">
                Our user-friendly platform makes it easy to create and manage
                courses on any subject, so you can focus on what you do
                best.Get started Today and join the growing community of
                Teaching on Brain Booster
              </p>
              <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                <Link
                  to="courses/create"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-amber-300 px-4 py-2.5 text-black hover:bg-amber-500 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 sm:w-auto"
                >
                  <div className="text-left">
                    <div className="mb-1 text-xs"></div>
                    <div className="-mt-1 font-sans text-sm font-semibold">
                      Create Courses
                    </div>
                  </div>
                </Link>
                <Link
                  to="courses"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-amber-300 px-4 py-2.5 text-black hover:bg-amber-500 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 sm:w-auto"
                >
                  <div className="text-left">
                    <div className="mb-1 text-xs"></div>
                    <div className="-mt-1 font-sans text-sm font-semibold">
                      Manage Existing
                    </div>
                  </div>
                </Link>
              </div>
            </Card>
          </div>

          <TutorAdvantages />
          <div className="flex items-stretch gap-1 md:gap-5 flex-wrap md:flex-nowrap md:flex-row">
            <TopTutors className="flex-1" />
          </div>
          <Footer tutor />
        </div>
      </>
    );
  }
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-lime-300 w-full">
      
    <Header />       

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-15">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-black">
                    Explore Our Diverse Offerings
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl text-black px-10">
                    From in-depth courses to expert-led tutorials, we have everything you need to expand your knowledge
                    and skills.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    to="/"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-black"
                  >
                    Browse Categories
                  </Link>
                  <Link
                    to="/"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-black"
                  >
                    View Courses
                  </Link>
                </div>
              </div>
              <img
                src="src\assets\4b164b34-d776-43f1-9cbf-34cfd6cb7072.jpeg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-5 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div
                className="flex flex-col items-start space-y-2 bg-cover bg-center p-6 rounded-lg"
              >
                <div className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Diverse Categories</h3>
                <p className="text-muted-foreground">
                  Explore a wide range of categories, from programming to design, business, and more.
                </p>
                <Link
                  to="/"
                  className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  View Categories
                </Link>
              </div>
              <div
                className="flex flex-col items-start space-y-2 bg-cover bg-center p-6 rounded-lg"
              >
                <div className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Comprehensive Courses</h3>
                <p className="text-muted-foreground">
                  Dive into our extensive course library, covering a wide range of topics and skill levels.
                </p>
                <Link
                  to="/"
                  className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Explore Courses
                </Link>
              </div>
              <div
                className="flex flex-col items-start space-y-2 bg-cover bg-center p-6 rounded-lg"
              >
                <div className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Expert Tutors</h3>
                <p className="text-muted-foreground">
                  Learn from industry-leading experts who are passionate about sharing their knowledge.
                </p>
                <Link
                  to="/"
                  className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Meet the Tutors
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />

    </div>
  );
};

export default LandingPage;

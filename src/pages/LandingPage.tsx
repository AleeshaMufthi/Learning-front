import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link href="#" className="flex items-center justify-center" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Software</span>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-4 sm:gap-6">
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Categories
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Courses
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Tutors
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          About
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Contact
        </Link>
      </nav>
    </header>
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Explore Our Diverse Offerings
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  From in-depth courses to expert-led tutorials, we have everything you need to expand your knowledge
                  and skills.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Browse Categories
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  View Courses
                </Link>
              </div>
            </div>
            <img
              src="/placeholder.svg"
              width="550"
              height="550"
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="flex flex-col items-start space-y-2">
              <ListIcon className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold">Diverse Categories</h3>
              <p className="text-muted-foreground">
                Explore a wide range of categories, from programming to design, business, and more.
              </p>
              <Link
                href="#"
                className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                View Categories
              </Link>
            </div>
            <div className="flex flex-col items-start space-y-2">
              <BookIcon className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold">Comprehensive Courses</h3>
              <p className="text-muted-foreground">
                Dive into our extensive course library, covering a wide range of topics and skill levels.
              </p>
              <Link
                href="#"
                className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Explore Courses
              </Link>
            </div>
            <div className="flex flex-col items-start space-y-2">
              <UserIcon className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold">Expert Tutors</h3>
              <p className="text-muted-foreground">
                Learn from industry-leading experts who are passionate about sharing their knowledge.
              </p>
              <Link
                href="#"
                className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Meet the Tutors
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-muted-foreground">&copy; 2024 Acme Software. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
          Terms of Service
        </Link>
        <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
          Privacy
        </Link>
      </nav>
    </footer>
  </div>
  );
};

export default LandingPage;

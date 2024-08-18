import React from 'react'

const Dashboard = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Card 1 */}
        <div className="bg-primary text-primary-foreground p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-2xl font-bold">1,234</div>
              <div className="text-sm font-medium">Total Students</div>
            </div>
            <UsersIcon className="w-8 h-8" />
          </div>
        </div>
  
        {/* Card 2 */}
        <div className="bg-secondary text-secondary-foreground p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-2xl font-bold">78</div>
              <div className="text-sm font-medium">Total Courses</div>
            </div>
            <BookOpenIcon className="w-8 h-8" />
          </div>
        </div>
  
        {/* Card 3 */}
        <div className="bg-accent text-accent-foreground p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm font-medium">Total Categories</div>
            </div>
            <LayoutGridIcon className="w-8 h-8" />
          </div>
        </div>
      </div>
  
      {/* Student Performance Card */}
      <div className="mt-8 md:mt-10">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Student Performance</h2>
            <p className="text-sm text-gray-600">
              A line chart showing student performance over time.
            </p>
          </div>
          <div className="aspect-w-9 aspect-h-4">
            <LinechartChart className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default Dashboard

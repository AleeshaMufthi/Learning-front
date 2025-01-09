import React from 'react'
import { Button } from 'flowbite-react'
const VideoBanner = () => {
   

  return (
    <section className="container mx-auto px-10 py-14">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold tracking-tight mb-5">
            77% of learners report career benefits, like landing a new job, earning a promotion, gaining applicable skills, and more.
          </h2>
          
        </div>
        <div className="relative">
          <div className="relative aspect-[4/3] w-full max-w-lg ml-auto">
            <div className="absolute inset-0 bg-blue-200/10 rounded-bl-[100px] transform rotate-3" />
            <img
              src="https://i.pinimg.com/736x/9d/76/25/9d7625ae60f59c2d6c35b99c7fc97a52.jpg"
              alt="A person smiling while using their mobile device"
              fill
              className="object-cover rounded-bl-[100px] transform -rotate-3"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoBanner

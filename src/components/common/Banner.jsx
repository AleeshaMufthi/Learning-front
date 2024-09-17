import React from 'react'
import { Carousel } from 'flowbite-react'

function Banner() {
    const images = [
        "https://t3.ftcdn.net/jpg/05/14/54/06/360_F_514540607_NznwyvNYYverOCsl0xsVVp9tVqonihl6.jpg",
        "https://t3.ftcdn.net/jpg/04/86/72/08/360_F_486720882_gQvphEm8PP47LbI0cNng6z0b5eUOdkbQ.jpg",
        "https://t4.ftcdn.net/jpg/04/93/54/67/360_F_493546702_tvCqGVDS0gwTp9k2l4BP8ENm4crJNlUL.jpg",
        "https://media.mykademy.com/wp-content/uploads/2023/08/23142133/elevate-your-learning.webp",
        "https://t3.ftcdn.net/jpg/03/57/29/86/360_F_357298616_J2EyeNKt7PE72IWqvORMrvPvje2h2yDB.jpg",
    ]
  return (
    <div className="w-full max-w-screen-lg mx-auto h-50 sm:h-64 lg:h-96">
      <Carousel>
        {images.map((image, index) => {
            return <img className="w-full h-full object-cover" key={index} src={image} alt="..."/>
        })}
      </Carousel>
      
    </div>
  )
}

export default React.memo(Banner)

import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, AcademicCapIcon } from "@heroicons/react/16/solid";
import Typed from "typed.js";
import { useState, useRef, useEffect } from 'react'

import Counter from "../utils/Counter";
import Logo from "../components/common/Logo";
import { User, Tutor, Explore } from '../api/link'

const navigation = [
  { name: "Home", href: User },
  { name: "Explore", href: Explore},
  { name: "Teach", href: Tutor },
  { name: "Contact"},
]

const LandingPage = () => {

  const [mobileMenu, setMobileMenu] = useState(false)
  const el = useRef(null)
  useEffect(() => {
      const typed = new Typed(el.current, {
        strings: [
          "Discover a world of wisdom with Brain Booster by your side.",
          "Brain Booster: Empowering minds to unlock limitless potential.",
          "Elevate your learning experience with Brain Booster's innovative approach.",
          "Brain Booster: Your gateway to mastering new skills and concepts.",
          "Experience the thrill of learning with Brain Booster’s dynamic platform.",
          "Brain Booster: Where curiosity meets comprehensive learning.",
          "Enrich your mind and broaden your horizons with Brain Booster.",
          "Brain Booster: Cultivating a brighter future through advanced education.",
          "Ignite your intellect with Brain Booster, where learning never stops.",
          "Brain Booster: Fueling your journey towards endless knowledge."
        ],
        typeSpeed: 80,
        backDelay: 700,
        smartBackspace: true,
        backSpeed: 20,
        loop: true,
        loopCount: Infinity,
      })
      return () => {
        typed.destroy()
      }
  }, [])

  return (
    <div className="min-h-screen bg-gray-800 text-white background-animation">
    <header className="flex items-center justify-between p-6">
    <Logo size="1.3" />
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <div className="-m-1.5 p-1.5">
            <span className="sr-only">Learn & Grow</span>
           
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenu(true)}
          >
            {" "}
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            <span className="sr-only">Open main menu</span>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-semibold leading-6  text-grey-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
  
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenu}
        onClose={setMobileMenu}
      >
        <div className="fixed inset-0 z-50">
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to={User} className="-m-1.5 p-1.5">
                <span className="flex items-center gap-2 border-2 border-gray-800 px-4 rounded-xl font-bold">
                  <AcademicCapIcon className="h-8 w-8 text-gray-800" />
                  Brain Booster
                </span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenu(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </header>
    <div className="relateve isolate px-6 lg:px-8">

    <div className="text-center mt-6">
        <h1 className="text-3xl font-semibold tracking-tight nexa-font text-white sm:text-6xl mb-6">
          Expand your knowledge
        </h1>
        <p className="mt-4 text-lg leading-8 text-gray-500 typed-js-color">
          {" "}
          <span className="font-semibold" ref={el} />
        </p>
      </div>

  <div className="flex flex-wrap md:flex-nowrap justify-between items-center mt-5">
  <div className="md:w-1/2 mb-8 md:mb-0 relative h-80">
    <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-50" />
    <img src="https://i.pinimg.com/564x/6c/12/f3/6c12f3167b8945e763ceb027ba0be817.jpg" alt="Tutor" className="w-full h-full object-cover rounded-lg" />
    <Link to="/tutor" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-3 text-lg font-semibold bg-yellow-500 text-gray-800 rounded hover:bg-yellow-400">
      Join Our Tutor Team <span aria-hidden="true">&rarr;</span>
    </Link>
  </div>

  <div className="md:w-1/2 mb-8 md:mb-0 relative h-80">
    <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-50" />
    <img src="https://i.pinimg.com/474x/d2/60/77/d260777287632de53d838823d080f487.jpg" alt="User" className="w-full h-full object-cover rounded-lg" />
    <Link
      to="/user"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-3 text-lg font-semibold bg-yellow-500 text-gray-800 rounded hover:bg-yellow-400"
    >
      Start your learning journey
    </Link>
  </div>
</div>

      

      {/* <hr className="w-64 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 light:bg-gray-700" /> */}
      <div className="text-center">
        <div className="mt-9 mx-auto max-w-7xl px-6 lg:px-8 p-5 rounded-lg">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4 hero-stats">
              <dt className="text-base leading-7 text-white">
                Courses sold every week
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight flex justify-center text-gray-600 sm:text-5xl">
                <Counter value={315} />
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4 hero-stats">
              <dt className="text-base leading-7 text-white">
                New users yearly
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight flex justify-center text-gray-600 sm:text-5xl">
                <Counter value={645} />
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4 hero-stats">
              <dt className="text-base leading-7 text-white">
                New Tutors yearly
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight flex justify-center text-gray-600 sm:text-5xl">
                <Counter value={423} />
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
  )

}

export default LandingPage
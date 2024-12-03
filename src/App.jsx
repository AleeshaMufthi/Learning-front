import { Routes, Route } from 'react-router-dom'
import './App.css'
import "flowbite"
import UserRoutes from './routes/UserRoutes'
import LandingPage from './pages/LandingPage'
import TutorRoutes from './routes/TutorRoutes'
import AdminRoutes from './routes/AdminRoutes'

function App() {

  return (
    <div className='bg-white'>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/*" element={<UserRoutes />} />
      <Route path="/tutor/*" element={<TutorRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </div>
  )
}

export default App

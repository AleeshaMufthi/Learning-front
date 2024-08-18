import { Routes, Route } from 'react-router-dom'
import './App.css'
import UserRoutes from './routes/UserRoutes'

function App() {
  

  return (
    <div className='bg-lime-300'>
      <Routes>
      <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </div>
  )
}

export default App

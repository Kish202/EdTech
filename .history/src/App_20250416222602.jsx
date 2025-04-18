import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/sections/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/registerforms/RegisterForm'
import HeroSection from './components/sections/Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
  
<Router>
    <div className="min-h-screen bg-gradient-to-br from-blue-100/50 to-green-100/50">
      
<Navbar/>
<HeroSection/>
<Routes>
<S
<Route path="/register" element={<RegisterForm/>} />

</Routes>



       </div>
       </Router>

  )
}

export default App

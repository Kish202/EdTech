import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/sections/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
  

    <div className="min-h-screen bg-gradient-to-br from-blue-100/50 to-green-100/50">
      
<Navbar/>

<Routes>

<Route path="/register" element={<h1 className="text-3xl font-bold text-center text-white">Register</h1>} />

</Routes>



       </div>


  )
}

export default App

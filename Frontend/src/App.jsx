import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import Home from './pages/Home/Home.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

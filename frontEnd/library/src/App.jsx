import { Routes, Route } from 'react-router-dom'
import Register from './pages/user/register'
import Navbar from './components/Navbar'
import Books from "./pages/books/books"
import Login from "./pages/user/login"
import Home from "./pages/home/home"
import Perfil from "./pages/user/perfil"
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar className='mr-10 ' />


      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Books' element={<Books />} />
      </Routes>

      {/* User */}
      <Routes>
        <Route path='/User/Login' element={<Login />} />
        <Route path='/User/Register' element={<Register />} />
        <Route path='User/Perfil' element={<Perfil />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App

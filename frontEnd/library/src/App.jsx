import { Routes, Route } from 'react-router-dom'
import Register from './pages/user/register'
import Navbar from './components/Navbar'
import Books from "./pages/books/books"
import Login from "./pages/user/login"
import Home from "./pages/home/home"
import Perfil from "./pages/user/perfil"
import Footer from './components/Footer'
import Rents from './pages/rents/rents'
import Teste from './pages/user/teste'

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
        <Route path='/User/Perfil' element={<Perfil />} />
        <Route path='/User/teste' element={<Teste />} />
      </Routes>

      <Routes>
        <Route path='/Rents' element={<Rents />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App

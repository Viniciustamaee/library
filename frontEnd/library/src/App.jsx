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
import NewBooks from './pages/books/newBooks/newBooks'

function App() {
  return (
    <>
      <Navbar className='mr-10 ' />


      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Books' element={<Books />} />
        <Route path='/Books/new' element={<NewBooks />} />
      </Routes>

      {/* User */}
      <Routes>
        <Route path='/User/Login' element={<Login />} />
        <Route path='/User/Register' element={<Register />} />
        <Route path='/User/Perfil/:id' element={<Perfil />} />
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

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
import Allbooks from './pages/books/allBooks/allBooks'
import BooksId from './pages/books/bookId/booksId'
import EditPerfil from './pages/user/editPerfil'
import RentsEdit from './pages/rents/rentsEdit/new'

function App() {
  return (
    <>
      <Navbar className='mr-10 ' />


      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Books' element={<Books />} />
        <Route path='/Books/new' element={<NewBooks />} />
        <Route path='/Books/allBooks' element={<Allbooks />} />
        <Route path="/Books/:id" element={<BooksId />}></Route>
      </Routes>

      {/* User */}
      <Routes>
        <Route path='/User/Login' element={<Login />} />
        <Route path='/User/Register' element={<Register />} />
        <Route path='/User/Perfil/:id' element={<Perfil />} />
        <Route path='/User/Perfil/:id/edit' element={<EditPerfil />} />
        <Route path='/User/teste' element={<Teste />} />
      </Routes>

      <Routes>
        <Route path='/Rents' element={<Rents />} />
        <Route path='/Rents/:id' element={<RentsEdit />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App

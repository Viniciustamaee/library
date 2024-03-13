import EditBooks from './pages/books/newBooks/editBooks'
import NewBooks from './pages/books/newBooks/newBooks'
import Allbooks from './pages/books/allBooks/allBooks'
import RentsEdit from './pages/rents/rentsEdit/new'
import BooksId from './pages/books/bookId/booksId'
import { Routes, Route, Router } from 'react-router-dom'
import EditPerfil from './pages/user/editPerfil'
import NewAuthor from './pages/author/newAuthor'
import Register from './pages/user/register'
import Navbar from './components/Navbar'
import Perfil from "./pages/user/perfil"
import Footer from './components/Footer'
import Books from "./pages/books/books"
import Rents from './pages/rents/rents'
import Login from "./pages/user/login"
import Teste from './pages/user/teste'
import Home from "./pages/home/home"
import AllAuthors from './pages/author/allAuthor'
import EditAuthor from './pages/author/authorEdit'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Navbar className='mr-10 ' />
      <ToastContainer />


      {/* Home */}
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>


      {/* Books */}
      <Routes>
        <Route path='/Books' element={<Books />} />
        <Route path='/Books/new' element={<NewBooks />} />
        <Route path='/Books/allBooks' element={<Allbooks />} />
        <Route path="/Books/:id" element={<BooksId />}></Route>
        <Route path="/Books/:id/edit" element={<EditBooks />}></Route>
      </Routes>

      {/* User */}
      <Routes>
        <Route path='/User/Login' element={<Login />} />
        <Route path='/User/Register' element={<Register />} />
        <Route path='/User/Perfil/:id' element={<Perfil />} />
        <Route path='/User/Perfil/:id/edit' element={<EditPerfil />} />
        <Route path='/User/teste' element={<Teste />} />
      </Routes>

      {/* Rents */}
      <Routes>
        <Route path='/Rents' element={<Rents />} />
        <Route path='/Rents/:id' element={<RentsEdit />} />
      </Routes>

      {/* Author */}
      <Routes>
        <Route path='/Author' element={<AllAuthors />} />
        <Route path='/Author/new' element={<NewAuthor />} />
        <Route path='/Author/:id/edit' element={<EditAuthor />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App

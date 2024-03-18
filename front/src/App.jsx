import { Routes, Route, Router, useLocation } from 'react-router-dom'
import EditAuthor from './pages/author/authorEdit'
import BooksId from './pages/books/bookId/booksId'
import AllAuthors from './pages/author/allAuthor'
import EditPerfil from './pages/user/editPerfil'
import NewAuthor from './pages/author/newAuthor'
import 'react-toastify/dist/ReactToastify.css';
import EditBooks from './pages/books/editBooks'
import { ToastContainer } from 'react-toastify';
import NewBooks from './pages/books/newBooks'
import Allbooks from './pages/books/allBooks'
import Register from './pages/user/register'
import React, { useEffect } from 'react';
import Navbar from './components/Navbar'
import Perfil from "./pages/user/perfil"
import Footer from './components/Footer'
import Books from "./pages/books/books"
import Rents from './pages/rents/rents'
import Login from "./pages/user/login"
import Home from "./pages/home/home"



function App() {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <ToastContainer />
      <Navbar />

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
      </Routes>

      {/* Rents */}
      <Routes>
        <Route path='/Rents/:id' element={<Rents />} />
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

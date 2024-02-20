import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Books from "./pages/books/books"
import Home from "./pages/home/home"

function App() {
  return (
    <>
      <Navbar className='mr-10 ' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Books' element={<Books />} />
      </Routes>
    </>
  );
}

export default App

// Allbooks.jsx
import "../books/books.css";
import CardBooks from "./cardBooks";

export default function Allbooks() {
    return (
        <>
            <h1 className="pt-20 ml-5">Ação</h1>
            <div className=" grid grid-cols-1 md:grid-cols-3 gap-1">
                <CardBooks className='h-auto max-w-full rounded-lg' title={'Harry Potter Pedra filosofal'} img={"https://m.media-amazon.com/images/I/61jgm6ooXzL._AC_UF1000,1000_QL80_.jpg"} />
                <CardBooks className='h-auto max-w-full rounded-lg' title={'Harry Potter Pedra filosofal'} img={"https://m.media-amazon.com/images/I/61jgm6ooXzL._AC_UF1000,1000_QL80_.jpg"} />
                <CardBooks className='h-auto max-w-full rounded-lg' title={'Harry Potter Pedra filosofal'} img={"https://m.media-amazon.com/images/I/61jgm6ooXzL._AC_UF1000,1000_QL80_.jpg"} />

            </div>
            <h1 className="pt-5 ml-5">Aventura</h1>
            <div className=" grid grid-cols-1 md:grid-cols-3 gap-1">
                <CardBooks className='h-auto max-w-full rounded-lg' title={'Duna: livro 1'} img={'https://m.media-amazon.com/images/I/81zN7udGRUL._AC_UF1000,1000_QL80_.jpg'} />
                <CardBooks className='h-auto max-w-full rounded-lg' title={'Duna: livro 1'} img={'https://m.media-amazon.com/images/I/81zN7udGRUL._AC_UF1000,1000_QL80_.jpg'} />
                <CardBooks className='h-auto max-w-full rounded-lg' title={'Duna: livro 1'} img={'https://m.media-amazon.com/images/I/81zN7udGRUL._AC_UF1000,1000_QL80_.jpg'} />
            </div>

        </>
    )
}

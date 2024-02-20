import CardBooks from "./cardBooks";
import "../books/books.css";

export default function Allbooks() {
    return (
        <>
            <div className="flex pt-20 ">
                <h1 className="ml-5 mr-5">Ação</h1>
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Read more</a>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-3 gap-1">
                <CardBooks className='h-auto max-w-full rounded-lg' title={'Harry Potter Pedra filosofal'} img={"https://m.media-amazon.com/images/I/61jgm6ooXzL._AC_UF1000,1000_QL80_.jpg"} />
                <CardBooks className='h-auto max-w-full rounded-lg' title={'Harry Potter Pedra filosofal'} img={"https://m.media-amazon.com/images/I/61jgm6ooXzL._AC_UF1000,1000_QL80_.jpg"} />
                <CardBooks className='h-auto max-w-full rounded-lg' title={'Harry Potter Pedra filosofal'} img={"https://m.media-amazon.com/images/I/61jgm6ooXzL._AC_UF1000,1000_QL80_.jpg"} />
            </div>


            {/* Fazer paginação e  */}
            <h1 className="pt-5 ml-5">Aventura</h1>
            <div className=" grid grid-cols-1 md:grid-cols-3 gap-1">
                <CardBooks className='h-auto max-w-full rounded-lg' title={'Duna: livro 1'} img={'https://m.media-amazon.com/images/I/81zN7udGRUL._AC_UF1000,1000_QL80_.jpg'} />
                <CardBooks className='h-auto max-w-full rounded-lg' title={'Duna: livro 1'} img={'https://m.media-amazon.com/images/I/81zN7udGRUL._AC_UF1000,1000_QL80_.jpg'} />
                <CardBooks className='h-auto max-w-full rounded-lg' title={'Duna: livro 1'} img={'https://m.media-amazon.com/images/I/81zN7udGRUL._AC_UF1000,1000_QL80_.jpg'} />
            </div>




        </>
    )
}

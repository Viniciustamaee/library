export default function booksCover() {
    return (
        <>
            <div className="flex justify-center">
                <div class="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                    <a href="#">
                        <img class="rounded-t-lg w-70 p-2" src="https://m.media-amazon.com/images/I/917BqHzX8yL._AC_UF1000,1000_QL80_.jpg" alt="" />
                    </a>
                    <div class="p-4">
                        <a href="#" className="flex justify-evenly">
                            <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white ">Disponivel</h5>
                            <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white ">Quantidade</h5>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
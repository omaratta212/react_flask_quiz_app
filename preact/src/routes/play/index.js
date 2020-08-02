import {useEffect, useState} from "preact/hooks";
import { Link } from 'preact-router/match';

const Play = () => {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async ()=>{
        try{
            let res = await fetch('http://127.0.0.1:5000/categories')
            res = await res.json()
            setCategories(res.categories)
            setIsLoading(false)
        }catch (e) {
            console.error('Error fetching from the API')
        }
    }, [])

    return (
        <section className="text-gray-500 bg-gray-900 body-font mb-auto">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Trivia questions
                        game!</h1>
                    <h2 className="sm:text-l text-l font-medium title-font mb-4 text-white">Pick your favorite
                        category</h2>
                </div>
                <div className="flex flex-wrap -m-2 justify-center">
                    {isLoading ? <div
                            className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32" />
                        : Object.keys(categories).map((id, index) => (
                            <div className="p-2 lg:w-1/3 md:w-1/2 w-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                                <Link href={`/play/${id}`} className="h-full flex items-center border-gray-800 border p-4 rounded-lg ease-linear hover:bg-orange-300 hover:text-black">
                                    <img alt="team"
                                         className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                                         src={`https://picsum.photos/200?q=${ index }`} />
                                    <div className="flex-grow">
                                        <h2 className="title-font font-medium text-white">{categories[id]}</h2>
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </section>

    )
}

export default Play

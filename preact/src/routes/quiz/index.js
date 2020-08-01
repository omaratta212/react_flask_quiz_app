import {useEffect, useState} from "preact/hooks";

const Quiz = () => {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async ()=>{
        try{
            let res = await fetch('http://127.0.0.1:5000/categories')
            res = await res.json()
            setCategories(Object.values(res.categories))
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
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon
                        brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't
                        heard
                        of them.</p>
                </div>
                <div className="flex flex-wrap -m-2 justify-center">
                    {isLoading ? <div
                            className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32" />
                        : categories.map((category) => (
                            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                                <div className="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                                    <img alt="team"
                                         className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                                         src="https://dummyimage.com/104x94" />
                                    <div className="flex-grow">
                                        <h2 className="text-white title-font font-medium">{category}</h2>
                                        <p className="text-gray-600">System</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>

    )
}

export default Quiz

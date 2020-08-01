import {useState, useEffect} from 'preact/hooks'
import Question from "../../components/question";
import Loader from "../../components/loader";
import CategoryItem from "../../components/CategoryItem";

const Home = () => {
    const [questions, setQuestions] = useState([])
    const [categories, setCatigories] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        try {
            let res = await fetch('http://127.0.0.1:5000/questions')
            res = await res.json()

            setQuestions(Object.values(res.questions))
            setCatigories(Object.values(res.categories))
            setIsLoading(false)
        } catch (e) {
            console.error('Error fetching from the API')
        }
    }, [])

    return (
        <section className="text-gray-500 bg-gray-900 body-font mb-auto">
            <div className="container px-5 py-24 mx-auto flex flex-wrap">
                <div className="flex flex-col relative pt-10 pb-20 md:w-1/4 mx-auto h-screen sticky top-0">
                    <h4 className="block font-bold text-gray-400">Questions Categories</h4>
                    <nav className="flex-grow block md:block md:overflow-y-auto hidden">
                        {isLoading ? <Loader />
                            :
                            <div>
                                <a className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-400 bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-orange-300 focus:bg-orange-200 focus:outline-none focus:shadow-outline"
                                   href="#">{1}. {'All'}</a>

                                {categories.map((category, index) => (
                                    <CategoryItem
                                    category={category}
                                    index={index}
                                    />
                                ))}
                            </div>
                        }
                    </nav>
                </div>

                <div className="md:w-3/4">
                    {isLoading ? <Loader />
                        : questions.map(({question, answer, id, difficulty}, index) => (
                            <Question
                            key={id}
                            question={question}
                            answer={answer}
                            index={index}
                            difficulty={difficulty}
                            />
                        ))}
                </div>
            </div>
        </section>
    )
}

export default Home;

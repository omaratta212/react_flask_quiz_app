import {useState, useEffect} from 'preact/hooks'
import Question from "../../components/question";
import Loader from "../../components/loader";
import Search from "../../components/search";
import CategoryItem from "../../components/CategoryItem";

const Home = () => {
    const [questions, setQuestions] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalQuestions, setTotalQuestions] = useState(0)
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const fetchQuestions = async (id) => {
        let url = id ? `http://127.0.0.1:5000/categories/${id}/questions` : 'http://127.0.0.1:5000/questions'
        url += `?page=${currentPage}`

        try {
            let res = await fetch(url)

            res = await res.json()

            if (id) {
                setSelectedCategory(res.current_category)
            } else {
                setCategories(res.categories)
                setSelectedCategory(null)
            }

            setQuestions(res.questions)
            setTotalQuestions(res.total_questions)
            setIsLoading(false)

        } catch (e) {
            console.error('Error fetching from the API')
        }
    }

    const submitSearch = async (searchTerm) => {
        setIsLoading(true)
        const options = {
            method: 'POST',
            body: JSON.stringify({searchTerm}),
            headers: {'Content-Type': 'application/json'}
        }

        try {
            let res = await fetch('http://127.0.0.1:5000/questions/search', options)
            res = await res.json()


            setQuestions(res.questions)
            setTotalQuestions(res.total_questions)
            setSelectedCategory(res.current_category)
            setIsLoading(false)

        } catch (e) {
            console.error('Error fetching from the API')
        }
    }


    useEffect(fetchQuestions, [])

    const selectPage = (pageNumber) => {
        setCurrentPage(pageNumber)
        fetchQuestions(selectedCategory)
    }

    const createPagination = () => {
        let pageNumbers = [];
        let maxPage = Math.ceil(totalQuestions / 10)
        for (let i = 1; i <= maxPage; i++) {
            pageNumbers.push(
                <li>
                    <a
                        key={i}
                        onClick={() => {
                            selectPage(i)
                        }}
                        className={`
                            block hover:bg-orange-300 hover:text-black border-r border-grey-600 px-3 py-2
                            ${i === currentPage ? 'text-black bg-orange-400' : ''}
                        `}
                        href="#"
                    >
                        {i}
                    </a>
                </li>
            )
        }

        return (
            <ul className="mt-16 flex list-reset border border-grey-600 rounded w-auto">
                {pageNumbers}
            </ul>
        )
    }

    return (
        <section className="text-gray-500 bg-gray-900 body-font mb-auto">
            <div className="container px-5 py-24 mx-auto flex flex-wrap">
                <div className="flex flex-col relative pb-20 md:w-1/4 mx-auto h-screen sticky top-0 pt-5">
                    <h4 className="block font-bold text-gray-400">Search Questions</h4>
                    <Search submitSearch={submitSearch} />
                    <h4 className="block font-bold text-gray-400">Questions Categories</h4>
                    <nav className="flex-grow block md:block md:overflow-y-auto hidden mr-5">
                        {isLoading ?
                            <Loader />
                            :
                            <div>
                                <a
                                    onClick={() => fetchQuestions()}
                                    className={`
                                        block px-4 py-2 mt-2 text-sm font-semibold rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-orange-300 focus:bg-orange-200 focus:outline-none
                                        ${!selectedCategory ? 'bg-orange-300 text-black' : 'bg-transparent text-gray-400'}
                                    `}
                                    href="#">{1}. {'All'}</a>

                                {Object.keys(categories).map((id, index) => (
                                    <CategoryItem
                                        onClick={() => fetchQuestions(id)}
                                        id={id}
                                        category={categories[id]}
                                        index={index}
                                        active={selectedCategory == id}
                                    />
                                ))}

                                {createPagination()}
                            </div>
                        }
                    </nav>
                </div>

                <div className="md:w-3/4 pt-5">
                    <h4 className="block font-bold text-gray-400 ml-16">Showing {questions.length} questions
                        of {totalQuestions}</h4>

                    {isLoading ?
                        <Loader />
                        :
                        questions.map(({question, answer, id, difficulty}, index) => (
                            <Question
                                key={id}
                                question={question}
                                answer={answer}
                                index={index}
                                difficulty={difficulty}
                            />
                        ))

                    }
                </div>
            </div>
        </section>
    )
}

export default Home;

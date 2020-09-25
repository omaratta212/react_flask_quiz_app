import { useFormik } from 'formik'
import {useEffect, useState} from "preact/hooks";
import {Link} from "preact-router/match";
import { CheckCircle } from 'preact-feather';

const Add = () => {
    const [formSuccess, setFormSuccess] = useState(false)
    const [formFailed, setFormFailed] = useState(false)
    const [categories, setCategories] = useState([])

        useEffect(()=>{
            const fetchData = async ()=>{
                try{
                    let res = await fetch('https://vast-fortress-26509.herokuapp.com/categories')
                    res = await res.json()
                    setCategories(res.categories)
                }catch (e) {
                    console.error('Error fetching from the API')
                }
            }
            fetchData()
        }, [])


    const onSubmit = async (formData)=> {
        const options = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {'Content-Type': 'application/json'}
        }

        try{
            let res = await fetch('https://vast-fortress-26509.herokuapp.com/questions', options)
            res = await res.json()
            if(res.success){
                setFormSuccess(true)
            }
        }catch (e) {
            setFormFailed(true)
            console.error('ERROR POSTING QUESTION', e)
        }
    }

    const initialValues = {
        question: '',
        answer: '',
        category: '',
        difficulty: '',
    }

    const formik = useFormik({
        initialValues,
        onSubmit
    })

    return (
        <section className="text-gray-500 bg-gray-900 body-font mb-auto">
            <div className="container px-5 py-24 mx-auto flex flex-col items-center">
                <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0 mb-10">
                    <h1 className="title-font font-medium text-3xl text-white text-center">
                        Have a trivia question in mind?
                    </h1>
                </div>

                {formFailed ?
                    <div className="lg:w-2/6 md:w-1/2 block bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                        <p className="font-bold">An Error Occluded</p>
                        <p>Something went wrong, while adding your question. I'm sorry!</p>
                    </div>
                    :
                    ''
                }

                {!formSuccess ?
                    <form onSubmit={formik.handleSubmit} className="lg:w-2/6 md:w-1/2 bg-gray-800 rounded-lg p-8 flex flex-col mx-auto w-full mt-8">
                    <h2 className="text-white text-lg font-medium title-font mb-5">Please share it</h2>
                    <input
                        autoFocus
                        onChange={formik.handleChange}
                        value={formik.values.question}
                        id="question"
                        name="question"
                        type="text"
                        required
                        className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-orange-500 text-base px-4 py-2 mb-4"
                        placeholder="Question"
                    />
                    <input
                        onChange={formik.handleChange}
                        value={formik.values.answer}
                        id="answer"
                        name="answer"
                        type="text"
                        required
                        className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-orange-500 text-base px-4 py-2 mb-4"
                        placeholder="Answer"
                    />
                    <select
                        onChange={formik.handleChange}
                        value={formik.values.difficulty}
                        id="difficulty"
                        name="difficulty"
                        required
                        className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-orange-500 text-base px-4 py-2 mb-4">
                        <option disabled selected>Difficulty level</option>
                        <option value="1">1 - So easy</option>
                        <option value="2">2 - kinda easy</option>
                        <option value="3">3 - Average</option>
                        <option value="4">4 - Kinda hard</option>
                        <option value="5">5 - So hard</option>
                    </select>

                    <select
                        onChange={formik.handleChange}
                        value={formik.values.category}
                        id="category"
                        name="category"
                        required
                        className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-orange-500 text-base px-4 py-2 mb-4">
                        <option disabled selected>In Which category?</option>
                        {
                            Object.keys(categories).map((id)=>(
                                <option value={id}>{categories[id]}</option>
                            ))
                        }
                    </select>
                    <button
                        className="text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded text-lg font-bold">
                        Submit Question
                    </button>
                    <p className="text-xs text-gray-600 mt-3">I promise it will be added immediately!</p>
                </form>
                :
                    <div className="lg:w-2/6 md:w-1/2 bg-gray-800 rounded-lg p-8 flex flex-col items-center mx-auto w-full mt-10">
                        <CheckCircle size={64} className="bg-green-600 text-white rounded-full p-2 mb-5" />
                        <h1 className="font-bold mb-5 text-lg text-white">Successfully added!</h1>
                        <Link href="/" className="inline-flex items-center bg-orange-400 border-0 py-1 px-3 focus:outline-none hover:bg-orange-300 rounded text-black mt-4 md:mt-0 font-semibold">Go Home</Link>
                    </div>
                }

            </div>
        </section>

    )
}

export default Add;

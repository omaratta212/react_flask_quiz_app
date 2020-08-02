import {useEffect, useState} from "preact/hooks";
import {CheckCircle, XCircle} from "preact-feather";
import {Link} from "preact-router/match";

const Quiz = ({category}) => {
    const [previousQuestions, setPreviousQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState({})
    const [answerValue, setAnswerValue] = useState('')
    const [showAnswer, setShowAnswer] = useState(false)
    const [numCorrect, setNumCorrect] = useState(0)
    const [forceEnd, setForceEnd] = useState(false)

    const getNextQuestion = async () => {
        if(showAnswer){
            setShowAnswer(false)
        }

        setAnswerValue('')

        const options = {
            method: 'POST',
            body: JSON.stringify({
                previous_questions: previousQuestions,
                quiz_category: {id: category}
            }),
            headers: {'Content-Type': 'application/json'}
        }

        try {
            let res = await fetch('http://127.0.0.1:5000/quizzes', options)
            res = await res.json()

            setCurrentQuestion(res.question)
            setForceEnd(!res.question)
        } catch (e) {
            console.error('ERROR POSTING QUESTION', e)
        }

    }

    const evaluateAnswer = () => {
        const formatGuess = answerValue.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").toLowerCase()
        const answerArray = currentQuestion.answer.toLowerCase().split(' ');
        if (currentQuestion.id) {
            setPreviousQuestions(previousQuestions.concat(currentQuestion.id))
        }
        return answerArray.includes(formatGuess)
    }


    const submitGuess = (event) => {
        event.preventDefault();
        let evaluate = evaluateAnswer()
        setShowAnswer(true)
        setNumCorrect(!evaluate ? numCorrect : numCorrect + 1)
    }


    useEffect(getNextQuestion, [])


    return (
        <section className="text-gray-500 bg-gray-900 body-font mb-auto">
            <div className="relative block" style={{height: "400px"}}>
                <div
                    className="absolute top-0 w-full h-full bg-center bg-cover"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1537431701805-c1bb45cd2f92?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1364&q=80')"
                    }}
                >
            <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
            />
                </div>
                <div
                    className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
                    style={{height: "70px", transform: "translateZ(0)"}}
                >
                    <svg
                        className="absolute bottom-0 overflow-hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                    >
                        <polygon
                            className="text-gray-900 fill-current"
                            points="2560 0 2560 100 0 100"
                        />
                    </svg>
                </div>
            </div>
            <div className="relative py-16 bg-gray-900">
                <div className="container mx-auto px-4">
                    <div
                        className="relative flex flex-col min-w-0 break-words bg-gray-800 w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div className="px-6">
                            {!forceEnd ? (
                                <div className="text-center p-5">
                                    {!showAnswer ?

                                        <form
                                            onSubmit={submitGuess}
                                            className="lg:w-1/2 md:w-1/2 bg-gray-800 rounded-lg p-8 flex flex-col mx-auto w-full">
                                            <h4 className="text-2xl font-semibold  mb-2 text-gray-200 mb-2">
                                                {currentQuestion.id ? currentQuestion.question : ''}
                                            </h4>
                                            <input
                                                value={answerValue}
                                                onChange={e => setAnswerValue(e.target.value)}
                                                autoFocus
                                                name="question"
                                                type="text"
                                                required
                                                className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-orange-500 text-base px-4 py-2 mb-4"
                                                placeholder="Answer here"
                                            />
                                            <button
                                                className="text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded text-lg font-bold">
                                                Submit Answer
                                            </button>
                                        </form>
                                        :
                                        <div
                                            className="lg:w-1/2 md:w-1/2 bg-gray-800 rounded-lg p-8 flex flex-col items-center mx-auto w-full">
                                            {
                                                answerValue === currentQuestion.answer ? (
                                                    <>
                                                        <CheckCircle size={64}
                                                                     className="bg-green-600 text-white rounded-full p-2 mb-5" />
                                                        <h1 className="font-bold mb-5 text-lg text-white">
                                                            Correct! the answer is "{currentQuestion.answer}"
                                                        </h1>
                                                        <button
                                                            onClick={getNextQuestion}
                                                            className="inline-flex items-center bg-orange-400 border-0 py-1 px-3 focus:outline-none hover:bg-orange-300 rounded text-black mt-4 md:mt-0 font-semibold"
                                                        >
                                                            Next Question
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>

                                                        <XCircle size={64}
                                                                 className="bg-red-600 text-white rounded-full p-2 mb-5" />
                                                        <h1 className="font-bold mb-5 text-lg text-white">
                                                            Wrong! the answer is "{currentQuestion.answer}"
                                                        </h1>
                                                        <button
                                                            onClick={getNextQuestion}
                                                            className="inline-flex items-center bg-orange-400 border-0 py-1 px-3 focus:outline-none hover:bg-orange-300 rounded text-black mt-4 md:mt-0 font-semibold"
                                                        >
                                                            Next Question
                                                        </button>
                                                    </>
                                                )
                                            }
                                        </div>

                                    }
                                </div>
                            ) : (
                                <div
                                    className="lg:w-1/2 md:w-1/2 bg-gray-800 rounded-lg p-8 flex flex-col items-center mx-auto w-full">
                                    <h1 className="font-bold mb-5 text-lg text-white">
                                        You are done! You have answered {numCorrect} questions correctly.
                                    </h1>

                                    <Link
                                        href="/play"
                                        className="inline-flex items-center bg-orange-400 border-0 py-1 px-3 focus:outline-none hover:bg-orange-300 rounded text-black mt-4 md:mt-0 font-semibold"
                                    >
                                        Play again
                                    </Link>
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Quiz

const Home = () => (
    <section className="text-gray-500 bg-gray-900 body-font mb-auto">
        <div className="container px-5 py-24 mx-auto flex flex-col items-center">
            <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0 mb-10">
                <h1 className="title-font font-medium text-3xl text-white text-center">
                    Have a trivia question in mind?
                </h1>
            </div>
            <div className="lg:w-2/6 md:w-1/2 bg-gray-800 rounded-lg p-8 flex flex-col mx-auto w-full mt-10">
                <h2 className="text-white text-lg font-medium title-font mb-5">Please share it</h2>
                <input
                    className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-orange-500 text-base px-4 py-2 mb-4"
                    placeholder="Question" type="text"
                />
                <input
                    className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-orange-500 text-base px-4 py-2 mb-4"
                    placeholder="Answer" type="text"
                />
                <select
                    className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-orange-500 text-base px-4 py-2 mb-4">
                    <option disabled selected>Difficulty level</option>
                    <option value="1">1 - So easy</option>
                    <option value="2">2 - kinda easy</option>
                    <option value="3">3 - Average</option>
                    <option value="4">4 - Kinda hard</option>
                    <option value="5">5 - So hard</option>
                </select>

                <select
                    className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-orange-500 text-base px-4 py-2 mb-4">
                    <option disabled selected>In Which category?</option>
                    <option value="1">Science</option>
                    <option value="2">Art</option>
                    <option value="3">Geography</option>
                    <option value="4">History</option>
                    <option value="5">Entertainment</option>
                    <option value="5">Sports</option>
                </select>
                <button
                    className="text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded text-lg font-bold">
                    Submit Question
                </button>
                <p className="text-xs text-gray-600 mt-3">I promise it will be added immediately!</p>
            </div>
        </div>
    </section>

);

export default Home;

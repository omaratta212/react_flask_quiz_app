import {Search} from "preact-feather";
import {useState} from "preact/hooks";

const SearchComponent = (props) => {
    const [query, setQuery] = useState('')

    const {submitSearch} = props

    const submitForm = (e) => {
        e.preventDefault()
        submitSearch(query)
    }

    return (<div className="p-8 pl-0 pt-4">
        <form onSubmit={submitForm}
              className="flex items-center border border-grey-600 hover:border-orange-300 rounded h-10">
            <input
                onChange={e => setQuery(e.target.value)}
                className="rounded-l-full w-full py-2 px-6 bg-transparent leading-tight focus:outline-none"
                placeholder="Search"
                type="text"

            />

            <div className="p-4">
                <button
                    value={query}
                    type="submit"
                    className="bg-orange-400 text-white rounded-full p-2 hover:bg-orange-300 focus:outline-none w-8 h-8 flex items-center justify-center"
                >
                    <Search />
                </button>
            </div>
        </form>
    </div>)

}

export default SearchComponent;

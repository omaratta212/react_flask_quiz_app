import {Search} from "preact-feather";

const SearchComponent = () => (
    <div className="p-8 pl-0 pt-4">
        <div className="bg-orange-100 flex items-center rounded h-10">
            <input className="rounded-l-full w-full py-2 px-6 bg-orange-100 leading-tight focus:outline-none" id="search" type="text" placeholder="Search" />

                <div className="p-4">
                    <button
                        type="submit"
                        className="bg-orange-400 text-white rounded-full p-2 hover:bg-orange-300 focus:outline-none w-8 h-8 flex items-center justify-center"
                    >
                        <Search />
                    </button>
                </div>
        </div>
    </div>

)

export default SearchComponent;

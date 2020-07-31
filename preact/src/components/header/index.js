import { Link } from 'preact-router/match';
import { Zap, ArrowRight } from 'preact-feather';

const Header = () => (
<header className="text-gray-500 bg-gray-900 body-font border-b border-gray-800">
	<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
		<nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
			<Link activeClassName="text-orange-400" className="mr-5 hover:text-white" href="/">Home</Link>
			<Link activeClassName="text-orange-400" className="mr-5 hover:text-white" href="/add">Add</Link>
			<Link activeClassName="text-orange-400" className="mr-5 hover:text-white" href="/play">Play</Link>
		</nav>
		<a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-white lg:items-center lg:justify-center mb-4 md:mb-0">
			<Zap className="text-orange-400" />
			<span className="ml-3 text-xl xl:block lg:hidden text-orange-400">Trivia questions!</span>
		</a>
		<div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
			<Link
				href="/play"
				className="inline-flex items-center bg-orange-400 border-0 py-1 px-3 focus:outline-none hover:bg-orange-300 rounded text-black mt-4 md:mt-0">
				Start Quiz
				<ArrowRight size={16} className="ml-2" />
			</Link>
		</div>
	</div>
</header>
);

export default Header;

import {Zap, Linkedin, Twitter} from "preact-feather";

const Footer = () => (
	<footer className="text-gray-500 bg-gray-900 border-t border-gray-800 bottom-0">
		<div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
			<a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
				<Zap className="text-orange-400" />
				<span className="ml-3 text-xl text-orange-400">Trivia questions!</span>
			</a>
			<p className="text-sm text-gray-600 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">©
				2020 Trivia questions! —
				<a href="https://twitter.com/omaratta212" className="text-gray-500 hover:text-orange-400 ml-1" target="_blank"
				   rel="noopener noreferrer">@omaratta212</a>
			</p>
			<span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
      <a className="text-gray-600 hover:text-orange-400" href="https://www.linkedin.com/in/omar-atta/" target="_blank" rel="noreferrer">
        <Linkedin />
      </a>
      <a className="ml-3 text-gray-600 hover:text-orange-400" href="https://twitter.com/omaratta212" target="_blank" rel="noreferrer">
        <Twitter />
      </a>
    </span>
		</div>
	</footer>
);

export default Footer;

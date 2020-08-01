import { HelpCircle} from 'preact-feather';

const Question = props => {
	const { index,  question, answer } = props;

	return (
		<div className="flex relative pt-10 pb-20 sm:items-center mx-auto">
			<div className="h-full w-6 absolute inset-0 flex items-center justify-center">
				<div className="h-full w-1 bg-gray-800 pointer-events-none rounded-full" />
			</div>
			<div
				className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-orange-500 text-white relative z-10 title-font font-medium text-sm">
				{index + 1}
			</div>
			<div
				className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
				<div
					className="flex-shrink-0 w-24 h-24 bg-gray-800 text-orange-400 rounded-full inline-flex items-center justify-center">
					<HelpCircle size={32} />
				</div>
				<div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
					<h2 className="font-medium title-font text-white mb-1 text-xl">
						{question}
					</h2>
					<p className="leading-relaxed">{answer}</p>
				</div>
			</div>
		</div>
	)
}

export default Question;

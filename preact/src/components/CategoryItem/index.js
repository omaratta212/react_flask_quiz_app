const CategoryItem = props => {
	const { index,  category } = props;

	return (
			<a className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-400 bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-orange-300 focus:bg-orange-200 focus:outline-none focus:shadow-outline"
			   href="#">{index + 2}. {category}</a>
	)
}

export default CategoryItem;

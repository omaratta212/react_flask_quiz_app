const CategoryItem = props => {
    const {index, category, active} = props;

    return (
        <a
            onClick={props.onClick}
            className={`
                block px-4 py-2 mt-2 text-sm font-semibold rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-orange-300 focus:bg-orange-200 focus:outline-none
                ${active ? 'bg-orange-300 text-black' : 'bg-transparent text-gray-400'}
            `}
            href="#"
        >
            {index + 2}. {category}
        </a>
    )
}

export default CategoryItem;

const NavItem = ({ Icon, active }) => {
    return (
        <button
            className={`w-10 h-10 rounded-md flex justify-center items-center transition-all
            ${
                active
                    ? "bg-violet-600 text-white"
                    : "text-gray-800 hover:bg-gray-100"
            }`}
        >
            <Icon size={22} />
        </button>
    );
};

export default NavItem;
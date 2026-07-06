import Logo from "./Logo";
import NavLinks from "./NavLinks";

const Sidebar = () => {
    return (
        <aside className="w-24 h-screen border-r bg-white flex flex-col">

            <Logo />

            <NavLinks />

            <div className="mt-auto flex justify-center pb-6">

                <img
                    src="https://i.pravatar.cc/50"
                    className="w-11 h-11 rounded-full"
                    alt=""
                />

            </div>

        </aside>
    );
};

export default Sidebar;
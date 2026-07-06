import NavItem from "./NavItem";
import { sidebarLinks } from "./sidebarData";

const NavLinks = () => {
    return (
        <div className="flex flex-col gap-6 items-center mt-6">

            {sidebarLinks.map((item) => (
                <NavItem
                    key={item.id}
                    Icon={item.icon}
                    active={item.active}
                />
            ))}

        </div>
    );
};

export default NavLinks;
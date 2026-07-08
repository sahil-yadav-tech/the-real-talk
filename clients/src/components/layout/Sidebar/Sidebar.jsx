import { Moon } from "lucide-react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const Sidebar = () => {
  return (
    <aside className="w-18 h-screen shadow bg-white flex flex-col">
      <Logo />

      <NavLinks />

      <div className="mt-auto flex justify-center pb-6 flex-col items-center gap-6">
        <Moon className="w-6 h-6  cursor-pointer" />
                <img
                    src="https://i.pravatar.cc/50"
                    className="w-8 h-8 rounded-full ursor-pointer"
                    alt=""

                />

            </div>
    </aside>
  );
};

export default Sidebar;

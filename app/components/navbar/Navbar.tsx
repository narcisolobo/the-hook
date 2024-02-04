import Image from "next/image";
import ThemeSwitcher from "./ThemeSwitcher";
import UserMenu from "./UserMenu";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

function Navbar() {
  return (
    <div className="bg-base-100">
      <div className="container navbar">
        <div className="flex-1">
          <MobileMenu />
          <a className="btn btn-ghost text-xl">THE HOOK</a>
          <div className="navbar-center hidden lg:flex">
            <DesktopMenu />
          </div>
        </div>
        <div className="flex flex-none gap-2">
          <UserMenu />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}

export default Navbar;

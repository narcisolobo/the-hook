"use client";

import { useUser } from "@/context/UserProvider";
import ThemeSwitcher from "./ThemeSwitcher";
import UserMenu from "./logged-in/UserMenu";
import LoggedInDesktopMenu from "./logged-in/LoggedInDesktopMenu";
import LoggedOutDesktopMenu from "./logged-out/LoggedOutDesktopMenu";
import LoggedInMobileMenu from "./logged-in/LoggedInMobileMenu";
import LoggedOutMobileMenu from "./logged-out/LoggedOutMobileMenu";

function Navbar() {
  const user = useUser();

  return (
    <div className="bg-base-100">
      <div className="container navbar">
        <div className="flex-1">
          {user.current ? <LoggedInMobileMenu /> : <LoggedOutMobileMenu />}
          <a className="btn btn-ghost text-xl">THE HOOK</a>
          <div className="navbar-center hidden lg:flex">
            {user.current ? <LoggedInDesktopMenu /> : <LoggedOutDesktopMenu />}
          </div>
        </div>
        <div className="flex flex-none gap-2">
          {user.current && <UserMenu />}
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}

export default Navbar;

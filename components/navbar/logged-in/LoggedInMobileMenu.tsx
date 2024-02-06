import Link from "next/link";
import HamburgerMenu from "../HamburgerMenu";
import navItems from "./NavItems";

function LoggedInMobileMenu() {
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <HamburgerMenu />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
      >
        {navItems.map((navItem) => (
          <li key={navItem.id}>
            <Link href={navItem.href}>{navItem.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LoggedInMobileMenu;

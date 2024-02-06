import navItems from "./NavItems";
import NavLink from "../NavLink";

function LoggedInDesktopMenu() {
  return (
    <ul className="menu menu-horizontal px-1">
      {navItems.map((navItem) => (
        <li key={navItem.id}>
          <NavLink href={navItem.href} label={navItem.label} />
        </li>
      ))}
    </ul>
  );
}

export default LoggedInDesktopMenu;

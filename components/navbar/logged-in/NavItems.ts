type NavItem = {
  id: number;
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  {
    id: 1,
    href: "/",
    label: "Home",
  },
  {
    id: 2,
    href: "/dashboard",
    label: "Dashboard",
  },
];

export default navItems;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  label: string;
};

function NavLink({ href, label }: Props) {
  const path = usePathname();

  return (
    <Link href={href} className={path === href ? "btn-active" : undefined}>
      {label}
    </Link>
  );
}

export default NavLink;

"use client";

import Image from "next/image";
import { useUser } from "@/context/UserProvider";
import theHookLogo from "@/public/the-hook-logo.png";

function UserMenu() {
  const user = useUser();

  const handleSignOut = async () => {
    await user.signOut();
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="avatar btn btn-circle btn-ghost"
      >
        <div className="w-10 rounded-full">
          <Image
            alt={user.current?.email as string}
            src={user.current?.photoURL ? user.current.photoURL : theHookLogo}
            width={50}
            height={50}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
      >
        <li>
          <a className="justify-between">Profile</a>
        </li>
        <li>
          <a onClick={handleSignOut}>Logout</a>
        </li>
      </ul>
    </div>
  );
}

export default UserMenu;

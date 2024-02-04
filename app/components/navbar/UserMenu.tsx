import Image from "next/image";

function UserMenu() {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="avatar btn btn-circle btn-ghost"
      >
        <div className="w-10 rounded-full">
          <Image
            alt="cisocodes"
            src="https://ik.imagekit.io/cisocodes/the-hook/cisocodes.jpeg"
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
          <a>Logout</a>
        </li>
      </ul>
    </div>
  );
}

export default UserMenu;

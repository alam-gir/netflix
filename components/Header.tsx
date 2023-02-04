import React, { useEffect, useState } from "react";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { log } from "util";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { logOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="logo.png"
          alt=""
          className="h-10 w-10 cursor-pointer object-contain"
        />
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">home</li>
          <li className="headerLink">TV shows</li>
          <li className="headerLink">new & popular</li>
          <li className="headerLink">my list</li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <MagnifyingGlassIcon className="hidden text-white h-6 w-6 sm:inline" />
        <p className="hidden text-white lg:inline">kids</p>
        <BellIcon className="h-6 w-6 text-white" />
        {/* <Link href="/account"> */}
        <img
          src="netflix-avatar.png"
          alt=""
          className="h-6 w-6 rounded"
          onClick={logOut}
        />
        {/* </Link> */}
      </div>
    </header>
  );
}

export default Header;

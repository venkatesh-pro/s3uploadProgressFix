import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const Header = () => {
  const { auth } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="h-[8vh] bg-red-400">
      <ul className="w-[50vw] h-full items-center  flex justify-between">
        <li>
          <button>
            <Link href={"/"}>Home</Link>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;

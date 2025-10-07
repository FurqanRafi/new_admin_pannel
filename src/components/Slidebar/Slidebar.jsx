"use client";

import React, { useContext, useState } from "react";
import { SiApacherocketmq } from "react-icons/si";
import { TbChartBarPopular, TbCards } from "react-icons/tb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/AppContext/AppContext";
import { RiMenu2Line } from "react-icons/ri";
import { PiDiamondsFourBold } from "react-icons/pi";
import { TfiLayoutMediaLeftAlt } from "react-icons/tfi";
import { IoHomeSharp } from "react-icons/io5";


const Slidebar = () => {
  const [popup, setPopup] = useState(false);
  const router = useRouter();
  const { logout } = useContext(AuthContext);

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setPopup(true);
  };

  const confirmLogout = () => {
    logout();
    setPopup(false);
    router.push("/login");
  };

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-full h-screen backdrop-blur-xl bg-[#ffffff]/[0.25] border-[#ffffff]/[0.1] border shadow-[0_7px_30px_rgba(0,0,0,0.3)] rounded-br-xl p-6 flex flex-col justify-between">
        <div className="flex items-center flex-col gap-4 pb-6 border-b border-[#F5EFEB]/[0.3]">
          <img
            src="/Avatar.png"
            alt="Admin Avatar"
            className="w-19 h-19 rounded-full border border-[#F5EFEB]/[0.3]"
          />
          <h1 className="text-2xl font-bold text-[#a15102]">Admin Panel</h1>
        </div>

        <ul className="flex flex-col gap-4 mt-6 flex-1">
          <li>
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-[#242220]/[0.01] border backdrop-blur-3xl 
              border-[#F5EFEB]/[0.10] text-[#a15102] font-semibold text-lg flex items-center gap-2"
            >
              <IoHomeSharp className="w-5 h-5 text-[#a15102]" />
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              href="/navbar"
              className="px-4 py-2 rounded-xl bg-[#242220]/[0.01] border backdrop-blur-3xl 
              border-[#F5EFEB]/[0.10] text-[#a15102] font-semibold text-lg flex items-center gap-2"
            >
              <RiMenu2Line className="w-5 h-5 text-[#a15102]" />
              Navbar
            </Link>
          </li>

          <li>
            <Link
              href="/hero"
              className="px-4 py-2 rounded-xl bg-[#242220]/[0.01] border backdrop-blur-3xl 
              border-[#F5EFEB]/[0.10] text-[#a15102] font-semibold text-lg flex items-center gap-2"
            >
              <SiApacherocketmq className="w-5 h-5 text-[#a15102]" />
              Hero
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className="px-4 py-2 rounded-xl bg-[#242220]/[0.01] border backdrop-blur-3xl 
              border-[#F5EFEB]/[0.10] text-[#a15102] font-semibold text-lg flex items-center gap-2"
            >
              <PiDiamondsFourBold className="w-5 h-5 text-[#a15102]" />
              About Us
            </Link>
          </li>

          <li>
            <Link
              href="/popular"
              className="px-4 py-2 rounded-xl bg-[#242220]/[0.01] border backdrop-blur-3xl 
              border-[#F5EFEB]/[0.10] text-[#a15102] font-semibold text-lg flex items-center gap-2"
            >
              <TbChartBarPopular className="w-5 h-5 text-[#a15102]" />
              Popular
            </Link>
          </li>

          <li>
            <Link
              href="/cards"
              className="px-4 py-2 rounded-xl bg-[#242220]/[0.01] border backdrop-blur-3xl 
              border-[#F5EFEB]/[0.10] text-[#a15102] font-semibold text-lg flex items-center gap-2"
            >
              <TbCards className="w-5 h-5 text-[#a15102]" />
              Cards
            </Link>
          </li>

          <li>
            <Link
              href="/footer"
              className="px-4 py-2 rounded-xl bg-[#242220]/[0.01] border backdrop-blur-3xl 
              border-[#F5EFEB]/[0.10] text-[#a15102] font-semibold text-lg flex items-center gap-2"
            >
              <TfiLayoutMediaLeftAlt className="w-5 h-5 text-[#a15102]" />
              Footer
            </Link>
          </li>
        </ul>

        <div className="mt-6">
          <button
            onClick={handleLogoutClick}
            className="bg-[#B75826] px-10 py-4 flex items-center justify-center rounded-full 
            text-[#ffffff] gap-2 text-lg font-semibold cursor-pointer"
          >
            <img
              className="w-5 h-5 text-[#ffffff]"
              src="/logout.svg"
              alt="Logout"
            />
            Logout
          </button>
        </div>
      </div>

      {popup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/ backdrop-blur-lg z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-100 text-center">
            <h2 className="text-lg font-semibold text-[#242220] mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-around mt-4">
              <button
                onClick={confirmLogout}
                className="bg-[#B75826] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#9c4519]"
              >
                Yes
              </button>
              <button
                onClick={() => setPopup(false)}
                className="bg-gray-300 text-[#242220] px-4 py-2 rounded-lg font-medium hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slidebar;

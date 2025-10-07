"use client";

import { AuthContext } from "@/AppContext/AppContext";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Signup = () => {
  const { register } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const res = await register(
      formData.get("username"),
      formData.get("email"),
      formData.get("password"),
      formData.get("phone")
    );

    if (res) {
      alert("Registered");
      router.push("/login");
    } else {
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-zinc-900/40 ">
      <div className="w-[40%] h-[70%] p-5 flex flex-col items-center-safe justify-center-safe gap-10 rounded-2xl backdrop-blur-xl bg-[#FFEDE0]/[0.4] border-[#F5EFEB]/[0.20] border-1 shadow-[0_7px_30px_rgba(0,0,0,0.3)] ">
        <div className="text-3xl">Registeration</div>
        <form
          className="w-full px-20 flex flex-col gap-7"
          onSubmit={(e) => {
            return handleSubmit(e);
          }}
        >
          <input
            name="email"
            className="px-3 py-2 border-1 border-[#F5EFEB]/[0.30] text-white rounded-lg"
            type="text"
            placeholder="Enter your Email"
            required
          />
          <input
            name="password"
            className="px-3 py-2 border-1 border-[#F5EFEB]/[0.30] text-white rounded-lg"
            type="password"
            placeholder="Enter your Password"
            required
          />
          <input
            name="username"
            className="px-3 py-2 border-1 border-[#F5EFEB]/[0.30] text-white rounded-lg     "
            type="text "
            placeholder="Enter Your Username"
            required
          />
          <input
            name="phone"
            className="px-3 py-2 border-1 border-[#F5EFEB]/[0.30] text-white rounded-lg apperance-none"
            type="number "
            placeholder=" Enter Phone Number"
            required
          />

          <button
            className="px-3 py-2 rounded-lg bg-[#B75826] text-xl cursor-pointer font-semibold"
            type="submit"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <div>
            Do you have an account ? <Link href="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

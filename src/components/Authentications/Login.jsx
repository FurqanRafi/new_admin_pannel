"use client";

import { AuthContext } from "@/AppContext/AppContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

const Login = () => {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result) {
      router.push("/navbar");
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center bg-zinc-900/40 ">
      <div className="w-[40%] h-[60%] p-5 flex flex-col items-center-safe justify-center-safe gap-10 rounded-2xl backdrop-blur-xl bg-[#FFEDE0]/[0.4] border-[#F5EFEB]/[0.20] border-1 shadow-[0_7px_30px_rgba(0,0,0,0.3)] ">
        <div className="text-3xl">Login</div>
        <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
          <input
            className="px-3 py-2 border-1 border-[#F5EFEB]/[0.30] text-white rounded-lg"
            type="text"
            placeholder="Enter your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="px-3 py-2 border-1 border-[#F5EFEB]/[0.30] text-white rounded-lg"
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="px-3 py-2 rounded-lg text-whit bg-[#B75826] text-xl font-semibold"
            type="submit"
          >
            Login
          </button>
          <div>
            Don't have an account ? <Link href="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

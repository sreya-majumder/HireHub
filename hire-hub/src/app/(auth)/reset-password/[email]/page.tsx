"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPassword({params}: {params: { email: string };}) {
  const searchParam = useSearchParams();
  const [authState, setAuthState] = useState({
    password: "",
    cpassword: "",
  });
  const [loading, setLoading] = useState(false);
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("/api/auth/reset-password", {
        email: params.email,
        signature: searchParam.get("signature"),
        password: authState.password,
        password_confirmation: authState.cpassword,
      })
      .then((res) => {
        const response = res.data;
        if (response.status == 400) {
          toast.error(response.message, { theme: "colored" });
        } else if (response.status == 200) {
          toast.success(response.message, { theme: "colored" });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("err..", err);
      });
  };
  
  return (
    <>
      <ToastContainer />

          {/* Nav-bar */}
    <div className="bg-gray-900">
    <div className="container mx-auto px-10">
    <nav className="flex items-center justify-between py-4">

      <div className="flex items-center flex-shrink-0 text-white mr-6">

        <span className="w-5font-semibold text-xl tracking-tight">&nbsp;&nbsp;&nbsp;<Link href="/">Jobify</Link></span>
      </div>


      <div className="hidden  md:flex md:items-center md:ml-auto md:mr--10 ">

        <p className="text-gray-300 hover:text-white px-4"><Link href="/">Home</Link></p>
        <p className="text-gray-300 hover:text-white px-4">About</p>
        <p className="text-gray-300 hover:text-white px-4">Services</p>
        <p className="text-gray-300 hover:text-white px-4">Contact</p>

        <button className="button1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link href="/login">Sign In</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
        <button className="button2"><Link href="/register">Sign Up</Link></button>
      </div>
    </nav>
  </div>
</div>


<div className="h-screen flex justify-center items-center bg-gradient-to-r text-transparent bg-clip-text animate-gradient">
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-[500px] p-5 rounded-lg shadow-lg bg-black">
          <h1 className="text-2xl text-white font-bold">Reset Passowrd ?</h1>

          <form onSubmit={submit}>
            <div className="mt-5">
              <label className="block text-white">Password</label>
              <input
                type="password"
                placeholder="Enter your new password"
                className="w-full h-10 p-2 border rounded-md outline-red-400"
                onChange={(event) =>
                  setAuthState({ ...authState, password: event.target.value })
                }
              />
            </div>
            <div className="mt-5">
              <label className="block text-white">Confirm Password</label>
              <input
                type="password"
                placeholder="Enter your confirm password"
                className="w-full h-10 p-2 border rounded-md outline-red-400"
                onChange={(event) =>
                  setAuthState({ ...authState, cpassword: event.target.value })
                }
              />
            </div>
            <div className="mt-5">
              <button
                className="w-full bg-black p-2 rounded-lg text-white"
                disabled={loading}
              >
                {loading ? "Processing.." : "Submit"}
              </button>
            </div>
            <div className="mt-5 text-center">
              <Link href="/login" className="text-orange-400">
                {" "}
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div></div>
    </>
  );
}

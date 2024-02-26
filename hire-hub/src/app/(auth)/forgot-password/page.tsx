"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrorType>();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("/api/auth/forgot-password", { email: email })
      .then((res) => {
        setLoading(false);
        const response = res.data;
        if (response.status == 200) {
          toast.success(response.message, { theme: "colored" });
        } else if (response.status == 400) {
          setErrors(response.errors);
        } else if (response.status == 500) {
          toast.success(response.message, { theme: "colored" });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("The error is", err);
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
          <h1 className="text-2xl text-white font-bold">Forgot Passowrd ?</h1>
          <p className="text-white">
            Don't Worry! You can reset you password
          </p>
          <form onSubmit={submit}>
            <div className="mt-5">
              <label className="block">Email</label>
              <input
                type="email"
                placeholder="Jobify@gmail.com"
                className="w-full h-10 p-2 border rounded-md outline-red-400"
                onChange={(event) => setEmail(event.target.value)}
              />
              <span className="text-red-500">{errors?.email}</span>
            </div>
            <div className="mt-5">
              <button
                className="w-full bg-white p-2 rounded-lg text-black"
                disabled={loading}
              >
                {loading ? "Processing" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>

      {/* Footer */}
        <footer className="footer">
        <p>Developed by Zawad, Rupkatha, Sreya</p>
    </footer>
    </>
  );
}

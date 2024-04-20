"use client";

import Link from "next/link";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
import Nav from "../components/Nav";
import Bot from "@/components/bot";
export default function Home() {





    
  return (
    <>
    <title>Jobify</title>


    <Nav />

    <div className="h-full flex flex-col gap-2  bg-gradient-to-r text-transparent bg-clip-text animate-gradient">
    <section className="">
        <div className=" lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
            <div className=" lg:col-span-7">
                <h1 className="flex items-center justify-center text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl text-black" >Welcome to Jobify.</h1>
                <p className="flex items-center justify-center font-bold text-white-600 lg:mb-8 md:text-lg lg:text-xl text-white"> Explore Jobs, Develop Skills as you go</p>
            </div>
        </div>
    </section>

    <section className="">
        <div className="items-center  mx-auto lg:grid lg:grid-cols-4 lg:gap-16 xl:gap-24 lg:py-24 lg:px-6">
            <div className="col-span-2 mb-8">
                <p className="text-lg font-medium text-purple-600 dark:text-purple-500">Trusted Worldwide</p>
                <h2 className="mt-3 mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-3xl dark:text-white">Explore Millions of Jobs, Make CV by exprienced Freelancers</h2>
                <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Dedicated Customer Support for all users</p>
            </div>
            <div className="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
                <div>
                    <svg className="w-10 h-10 mb-2 text-white md:w-12 md:h-12 dark:text-black" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd"></path></svg>
                    <h3 className="mb-2 text-2xl text-black font-bold dark:text-white">Modern Layout</h3>
                    <p className="font-light text-xl text-black dark:text-gray-400">User friendly interface</p>
                </div>
                <div>
                    <svg className="w-10 h-10 mb-2 text-white md:w-12 md:h-12 dark:text-purple-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg>
                    <h3 className="mb-2 text-2xl text-black font-bold dark:text-white">Contact Recruiter</h3>
                    <p className="font-light text-xl text-black dark:text-gray-400">Now, contacting your hirer is just a click away</p>
                </div>
                <div>
                    <svg className="w-10 h-10 mb-2 text-white md:w-12 md:h-12 dark:text-purple-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd"></path></svg>
                    <h3 className="mb-2 text-2xl text-black font-bold dark:text-white">Chat-bot</h3>
                    <p className="font-light text-xl text-black dark:text-gray-400">Chat-bot for assistance</p>
                </div>
                <div>
                    <svg className="w-10 h-10 mb-2 text-white md:w-12 md:h-12 dark:text-purple-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
                    <h3 className="mb-2 text-2xl text-black font-bold dark:text-white">Premium</h3>
                    <p className="font-light text-xl text-black dark:text-gray-400">Premium features without any subs</p>
                </div>
            </div>
        </div>
      </section>

    <section >
        <div className="bg-transparent px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">

            <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                <div className="text-gray-500 sm:text-lg dark:text-gray-400">
                    <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Why Jobify? </h2>
                    {/* <p className="mb-8 font-light text-white lg:text-xl">Deliver great service experiences fast - without the complexity of traditional ITSM solutions. Accelerate critical development work, eliminate toil, and deploy changes with ease.</p> */}

                    <ul role="list" className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                        <li className="flex space-x-3">

                            <svg className="flex-shrink-0 w-6 h-6 text-black dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            <span className="text-base text-xl leading-tight text-black dark:text-white">Personalized job recommendations based on users' preferences</span>
                        </li>
                        <li className="flex space-x-3">

                            <svg className="flex-shrink-0 w-6 h-6 text-black dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            <span className="text-base text-xl leading-tight text-black dark:text-white">User-Friendly Interface</span>
                        </li>
                        <li className="flex space-x-3">

                            <svg className="flex-shrink-0 w-6 h-6 text-black dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            <span className="text-base text-xl leading-tight text-black dark:text-white">Stay Updated</span>
                        </li>
                    </ul>
                </div>

               <div className="text-gray-500 sm:text-lg mt-2 dark:text-gray-400">
                    <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Features</h2>
                    {/* <p className="mb-8 font-light lg:text-xl">Deliver great service experiences fast - without the complexity of traditional ITSM solutions. Accelerate critical development work, eliminate toil, and deploy changes with ease.</p> */}

                    <ul role="list" className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                        <li className="flex space-x-3">

                            <svg className="flex-shrink-0 w-6 h-6 text-black dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            <span className="text-base text-xl leading-tight text-black dark:text-white">Dynamic reports and dashboards</span>
                        </li>
                        <li className="flex space-x-3">

                            <svg className="flex-shrink-0 w-6 h-6 text-black dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            <span className="text-base text-xl leading-tight text-black dark:text-white">View other candidates and their profile</span>
                        </li>
                        <li className="flex space-x-3">

                            <svg className="flex-shrink-0 w-6 h-6 text-black dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            <span className="text-base text-xl leading-tight text-black dark:text-white">Enrich your skills</span>
                        </li>
                        
                    </ul>
                </div>


            </div>
        </div>
      </section>
    <Bot />

    <footer>

            <div>
                <span className="flex item-end justify-end block text-sm text-black dark:text-gray-400">Developed by Zawad, Rupkatha, Sreya</span>
            </div>

    </footer>
</div>


    </>
  );
}

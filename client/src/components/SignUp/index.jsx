"use client";
import Image from "next/image";
import React, { useState } from "react";

const SignUp = () => {
  const [error, setError] = useState(true);

  return (
    <div className="flex items-center h-full w-full md:h-screen">
      <div className=" w-[35%] bg-primary h-full flex-col relative hidden md:flex">
        <div className="px-16 pt-16">
          <div className="relative h-6 w-[23%] ml-0">
            <Image src="/assets/dribble.png" layout="fill" objectFit="contain" alt="logo" />
          </div>

          <h1 className="text-[1.7rem] font-bold text-text mt-7 tracking-tight">
            Discover the world's top Designers & Creatives.
          </h1>
        </div>
        <div className="relative w-[100%] pl-4 h-[65%] p-0 m-0">
          <Image
            src="/assets/SignUp.png"
            layout="fill"
            objectFit="contain"
            className="-ml-7"
            alt="signup"
          />
        </div>
        <div className="absolute px-16 bottom-9">
          <p className="text-slate-700 text-sm p-0">
            Art by <span className=" underline">Peter Tarka</span>
          </p>
        </div>
      </div>
      <div className="flex-col flex md:w-[65%] md:py-0 py-16 justify-center items-center w-full h-full relative">
        <h1 className="absolute md:right-8 top-7 text-sm font-semibold">
          Already a member? <span className="text-purple-800">Sign in</span>
        </h1>
        <div className="md:w-[50%] w-full px-6 md:px-0">
          <h1 className=" text-[1.8rem] font-bold mb-4">Sign up to Dribbble</h1>
          {error && (
            <p className="text-[1rem] text-red-400 mb-9 font-semibold">
              • Please fill in all fields
            </p>
          )}
          <div className="flex flex-col gap-y-9">
            <div className="flex w-full gap-x-5">
              <div className="w-1/2">
                <label
                  htmlFor="name"
                  className="text-[1rem] font-extrabold flex item-center gap-x-1"
                >
                  {error && <img src="/assets/red-alert.svg" width={"15px"} alt="error-alert" />}
                  Name
                </label>
                <input type="text" id="name" className="w-full p-2 bg-[#f5f5f5] rounded-md mt-1" />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="Username"
                  className="text-[1rem] font-extrabold flex item-center gap-x-1"
                >
                  {error && <img src="/assets/red-alert.svg" width={"15px"} alt="error-alert" />}
                  Username
                </label>
                <input
                  type="text"
                  id="Username"
                  className="w-full p-2 bg-[#f5f5f5] rounded-md mt-1"
                />
              </div>
            </div>
            <div className="w-full flex flex-col">
              <label
                htmlFor="email"
                className="text-[1rem] font-extrabold flex item-center gap-x-1"
              >
                {error && <img src="/assets/red-alert.svg" width={"15px"} alt="error-alert" />}
                Email
              </label>
              <input type="email" id="email" className="w-full p-2 bg-[#f5f5f5] rounded-md mt-1" />
            </div>
            <div className="w-full flex flex-col">
              <label
                htmlFor="password"
                className="text-[1rem] font-extrabold flex item-center gap-x-1"
              >
                {error && <img src="/assets/red-alert.svg" width={"15px"} alt="error-alert" />}
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 bg-[#f5f5f5] rounded-md mt-1 placeholder:pl-2"
                placeholder="6+ characters"
              />
            </div>
          </div>
          <div className="mt-6">
            {" "}
            {/* This is agreement section */}
            <div className="flex items-start gap-x-2">
              <input type="checkbox" className="w-[1.9rem] h-[1.5rem] mt-[5px]" />
              <p className=" font-medium tracking-tight w-[80%]">
                Creating an account means you're okay with our{" "}
                <span className="text-purple-800">Terms of Service, Privacy Policy,</span> and our
                default <span className="text-purple-800">Notification Settings.</span>
              </p>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <button className="border-none bg-primary-pink px-14 py-3 rounded-lg text-white font-semibold mt-6 mx-auto md:mx-0 ">
              Create Account
            </button>
          </div>
          <div className="mt-[1.4rem]">
            <p className=" tracking-tight text-gray-500 text-[0.8rem] md:w-[65%] w-full">
              This site is protected by rcCAPTCHA and the Google
              <span className="text-purple-800"> Privacy Policy</span> and
              <span className="text-purple-800">Terms of Service</span> apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

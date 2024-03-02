"use client";
import React, { useState } from "react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@redux/services/auth-api";
import { useSnackbar } from "notistack";
import { redirect, useRouter } from "next/navigation";

const LoginPage = () => {
  const [login, setLogin] = useState(true);
  const [loginFormData, setLoginFormData] = useState({});
  const [registerFormData, setRegisterFormData] = useState({});

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [loginUser, { isLoginLoading }] = useLoginUserMutation();
  const [registerUser, { isRegisterLoading }] = useRegisterUserMutation();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   console.log(loginFormData);
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = loginFormData;
      const response = await loginUser({ email, password });
      if (response?.data?.token) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        if (response?.data?.user?.role) {
          localStorage.setItem("role", response?.data?.user?.role);
        }
        enqueueSnackbar("Login successful", { variant: "success" });
        setLoginFormData({});
        router.push("/");
        redirect("/");
      } else {
        enqueueSnackbar("Error: Auth Token not found", { variant: "error" });
        throw new Error("Token not found in response");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        enqueueSnackbar("Invalid email or password", { variant: "error" });
      }
      console.error("Login error:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password } = registerFormData;
      await registerUser({ name, email, password });
      console.log("Register successful"); // Handle success
    } catch (error) {
      console.error("Register error:", error); // Handle error
    }
  };

  const renderLoginForm = () => {
    return (
      <form action="" onSubmit={handleLogin}>
        <div className="mb-6">
          <label
            className="block mb-1.5 text-sm text-white font-semibold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
            type="email"
            placeholder="pat@saturn.dev"
            id="email"
            name="email"
            onChange={(e) => handleLoginChange(e)}
            value={loginFormData?.name}
          />
        </div>
        <div className="mb-6">
          <div className="flex mb-1.5 items-center justify-between">
            <label
              className="block text-sm text-white font-semibold"
              htmlFor="password"
            >
              Password
            </label>
            {/* <a
                className="inline-block text-xs font-semibold text-orange-900 hover:text-gray-900"
                href="#"
            >
                Forget password?
            </a> */}
          </div>
          <div className="relative">
            <input
              className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
              type="password"
              placeholder="Enter your password"
              id="password"
              name="password"
              onChange={(e) => handleLoginChange(e)}
              value={loginFormData?.password}
            />
            <button className="absolute top-1/2 right-0 mr-3 transform -translate-y-1/2 inline-block hover:scale-110 transition duration-100">
              <img src="saturn-assets/images/sign-up/icon-eye.svg" alt="" />
            </button>
          </div>
        </div>
        <button
          className="relative group block w-full mb-6 py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-orange-900 rounded-full overflow-hidden"
          type="submit"
        >
          <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
          <span className="relative">Login</span>
        </button>
      </form>
    );
  };

  const renderSignupForm = () => {
    return (
      <form action="" onSubmit={handleRegister}>
        <div className="mb-6">
          <label
            className="block mb-1.5 text-sm text-white font-semibold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
            type="email"
            placeholder="abc@gmail.com"
            name="email"
            id="email"
            onChange={(e) => handleRegisterChange(e)}
            value={registerFormData?.email}
          />
        </div>
        <div className="mb-7">
          <div className="flex mb-1.5 items-center justify-between">
            <label
              className="block text-sm text-white font-semibold"
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <div className="relative">
            <input
              className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
              type="password"
              placeholder="Enter your password"
              id="password"
              name="password"
              onChange={(e) => handleRegisterChange(e)}
              value={registerFormData?.password}
            />
            <button className="absolute top-1/2 right-0 mr-3 transform -translate-y-1/2 inline-block hover:scale-110 transition duration-100">
              <img src="saturn-assets/images/sign-up/icon-eye.svg" alt="" />
            </button>
          </div>
        </div>
        <div className="mb-7">
          <div className="flex mb-1.5 items-center justify-between">
            <label
              className="block text-sm text-white font-semibold"
              htmlFor="confirm_password"
            >
              Confirm Password
            </label>
          </div>
          <div className="relative">
            <input
              className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
              type="password"
              id="confirm_password"
              name="confirmPassword"
              placeholder="Confirm your password"
              onChange={(e) => handleRegisterChange(e)}
              value={registerFormData?.confirmPassword}
            />
            <button className="absolute top-1/2 right-0 mr-3 transform -translate-y-1/2 inline-block hover:scale-110 transition duration-100">
              <img src="saturn-assets/images/sign-up/icon-eye.svg" alt="" />
            </button>
          </div>
        </div>
        <button
          className="relative group block w-full mb-6 py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-orange-900 rounded-full overflow-hidden"
          type="submit"
        >
          <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
          <span className="relative">Signup</span>
        </button>
      </form>
    );
  };

  return (
    <div className="bg-black lg:max-h-screen" id="content">
      <section className="lg:max-h-screen relative py-10 2xl:py-10 overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap -mx-4 items-center">
              <div className="w-full lg:w-[40%] px-4 box-border lg:max-h-screen order-last lg:order-first">
                <div className="relative max-w-lg mx-auto lg:mx-0 lg:max-w-2xl h-full">
                  <img
                    className="block w-full lg:h-[88%] sm:h-full object-cover rounded-2xl"
                    src="https://shuffle.dev/saturn-assets/images/sign-up/dark-background.png"
                    alt=""
                  />
                  <div className="absolute bottom-0 w-full left-0 h-full flex items-center justify-center p-10">
                    <div className="max-w-md mx-auto">
                      <h4 className="font-heading text-3xl sm:text-5xl lg:text-5xl text-white font-bold mb-8">
                        Sign in to your account
                      </h4>
                      <div className="md:flex mb-20">
                        <div className="mb-6 md:mb-0 md:mr-8 pt-3 text-gray-600">
                          <svg
                            width="84"
                            height="10"
                            viewBox="0 0 84 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 4.25C0.585786 4.25 0.25 4.58579 0.25 5C0.25 5.41421 0.585786 5.75 1 5.75L1 4.25ZM84 5.00001L76.5 0.669879L76.5 9.33013L84 5.00001ZM1 5.75L77.25 5.75001L77.25 4.25001L1 4.25L1 5.75Z"
                              fill="#FAFBFC"
                            ></path>
                          </svg>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-200">
                            Greetings on your return! We kindly request you to
                            enter your details.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex mr-4 items-center">
                          <img
                            className="w-10 h-10"
                            src="https://shuffle.dev/saturn-assets/images/sign-up/avatar-small-1.png"
                            alt=""
                          />
                          <img
                            className="w-10 h-10 -ml-3"
                            src="https://shuffle.dev/saturn-assets/images/sign-up/avatar-small-2.png"
                            alt=""
                          />
                          <img
                            className="w-10 h-10 -ml-3"
                            src="https://shuffle.dev/saturn-assets/images/sign-up/avatar-small-3.png"
                            alt=""
                          />
                          <img
                            className="w-10 h-10 -ml-3"
                            src="https://shuffle.dev/saturn-assets/images/sign-up/avatar-small-4.png"
                            alt=""
                          />
                          <div className="flex -ml-3 items-center justify-center w-10 h-10 border-2 border-gray-900 bg-gray-50 rounded-full">
                            <span className="text-gray-900 font-medium">
                              +5
                            </span>
                          </div>
                        </div>
                        <div>
                          <div>
                            <div className="flex items-center">
                              <img
                                className="mr-1"
                                src="https://shuffle.dev/saturn-assets/images/sign-up/yellow-star.svg"
                                alt=""
                              />
                              <img
                                className="mr-1"
                                src="https://shuffle.dev/saturn-assets/images/sign-up/yellow-star.svg"
                                alt=""
                              />
                              <img
                                className="mr-1"
                                src="https://shuffle.dev/saturn-assets/images/sign-up/yellow-star.svg"
                                alt=""
                              />
                              <img
                                className="mr-1"
                                src="https://shuffle.dev/saturn-assets/images/sign-up/yellow-star.svg"
                                alt=""
                              />
                              <img
                                className="mr-2"
                                src="https://shuffle.dev/saturn-assets/images/sign-up/yellow-star.svg"
                                alt=""
                              />
                              <span className="font-semibold text-gray-50">
                                5.0
                              </span>
                            </div>
                          </div>
                          <span className="font-semibold text-gray-50">
                            from 200+ reviews
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
                <div className="max-w-lg lg:pt-8 2xl:pt-24 lg:pb-8 mx-auto 2xl:mr-0">
                  <h3 className="text-5xl sm:text-6xl text-white-900 font-bold my-4 mt-6">
                    Welcome Back
                  </h3>
                  <p className="text-lg text-gray-300 mb-12">
                    Log In to Access our Shops.
                  </p>
                  {login ? renderLoginForm() : renderSignupForm()}
                  <div className="text-center">
                    <span className="text-xs font-semibold text-gray-300">
                      <span>
                        {login ? "Don't have an account?" : "Have an account?"}
                      </span>
                      <a
                        className="inline-block ml-1 text-orange-900 hover:text-orange-700"
                        // href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setLogin(!login);
                        }}
                      >
                        {login ? "Sign up" : "Login"}
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;

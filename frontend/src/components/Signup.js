import React, { useState } from "react";
function Signup({toggleComponent}) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <div className="font-bold text-4xl">
      <div className="flex min-h-full flex-col justify-center align-middle px-6 py-12 lg:px-8">
        <div className="bg-gray-300 bg-opacity-70 py-6 mt-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
              Sign Up
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  for="username"
                  className="block text-xl font-large leading-6 text-black font-Poppins"
                >
                  Please enter your username
                </label>
                <div Name="mt-2">
                  <input
                    type="text"
                    className="bg-transparent border-b-4 border-gray-400 focus:border-black outline-none block w-full appearance-none leading-normal text-base" onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  for="username"
                  className="block text-xl font-large leading-6 text-black font-Poppins"
                >
                  E-mail
                </label>
                <div Name="mt-2">
                  <input
                    type="text"
                    className="bg-transparent border-b-4 border-gray-400 focus:border-black outline-none block w-full appearance-none leading-normal text-base" onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    for="password"
                    className="block text-xl font-large leading-6 text-black font-Poppins"
                  >
                    Enter Password
                  </label>
                </div>

                <div className="mt-2">
                  <input
                    type="text"
                    class="bg-transparent border-b-4 border-gray-400 focus:border-black outline-none block w-full appearance-none leading-normal text-base" onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                {/* <div className="flex items-center justify-between">
                  <label
                    for="password"
                    className="block text-sm font-large leading-6 text-black font-Poppins"
                  >
                    Confirm Password
                  </label>
                </div> */}

                {/* <div className="mt-2">
                  <input
                    type="text"
                    class="bg-transparent border-b-4  border-gray-300 focus:border-black outline-none block w-full appearance-none leading-normal text-base"
                  />
                </div> */}
              </div>
              <div>
                <label
                  for="password"
                  className="block text-xl font-large leading-6 text-black font-Poppins"
                >
                  Upload profile pic
                </label>
              </div>
              <div class="max-w-2xl rounded-lg shadow-xl bg-gray-50">
                <div class="m-4">
                  <div class="flex items-center justify-center w-full">
                    <label class="flex flex-col w-full h-10 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                      <div class="flex flex-col items-center justify-center pt-7">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-1 h-1 text-gray-400 group-hover:text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                          Attach a file
                        </p>
                      </div>
                      <input type="file" class="opacity-0.25" />
                    </label>
                  </div>
                </div>
                <div class="flex justify-begin p-2">
                  <button
                    type="submit"
                    className="flex w-half justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Upload
                  </button>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign Up
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={toggleComponent}
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

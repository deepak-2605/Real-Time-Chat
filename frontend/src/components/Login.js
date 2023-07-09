import React, { useState } from "react";
import { useNavigate } from "react-router";
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
function Login(prop) {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast.error("Enter all required fields");
      setLoading(false);
      return;
    }
    // http://localhost:3001
    const response = await fetch("https://real-time-chat-ymr8.onrender.com/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/chat", {
        state: { user: json.user, authtoken: json.authtoken },
      });
      setLoading(false);
    } else {
      setLoading(false);
        toast.error("Invalid credentials");
    }
  };

  function handleClick() {
    navigate("/signup");
  }
  return (
    <div NameName="font-bold text-4xl">
      <ToastContainer></ToastContainer>
      <div className="flex min-h-full flex-col justify-center align-middle px-6 py-12 lg:px-8">
        <div className="bg-gray-300 bg-opacity-70 py-8 mt-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
              {prop.message}
            </h2>
          </div>
          <div className="mt-10 mx-2 sm:mx-auto sm:w-full sm:max-w-sm ">
            <form className="space-y-6">
              <div>
                <label
                  for="username"
                  className="block text-xl font-large leading-6 text-black font-Poppins"
                >
                  Please enter your email
                </label>
                <div Name="mt-2">
                  <input
                    value={email}
                    type="text"
                    className="bg-transparent border-b-4 border-gray-400  focus:border-black outline-none block w-full appearance-none leading-normal text-base"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    for="password"
                    value={password}
                    className="block text-xl font-large leading-6 text-black font-Poppins"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="password"
                    className="bg-transparent border-b-4 border-gray-400  focus:border-black outline-none block w-full appearance-none leading-normal text-base"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={submitHandler}
                  isLoading={loading}
                >
                  Log in
                </button>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-b;ack shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleClick}
                >
                  Don't have an Account?
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Signup({ handleregister }) {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();
  const [profilePic, setprofilePic] = useState();
  const [pics, setpic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const [loading, setloading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


  const submitHandler = async (e) => {
    e.preventDefault();
    setloading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Fill all the required fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("password and confirmPassword do not match")

      return;
    }
    const response = await fetch("http://localhost:3001/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        profilePic,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      toast.success("Registration successful");
      handleregister("Registration successfull, login to continue");
      navigate("/");
      setloading(false);
    } else {
      toast.error("User already exists in the database");
      setloading(false);
    }
  };

  function handleClick() {
    navigate("/");
  }

  const postDetails = async (e) => {
    e.preventDefault();
    setPicLoading(true);
    if (pics === undefined) {
      toast.error("Try uploading again");
      setPicLoading(false);
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "jsyelmc8");
      data.append("cloud_name", "dkafhonlw");
      await fetch(
        "https://api.cloudinary.com/v1_1/dkafhonlw/image/upload",
        {
          method: "POST",
          body: data,
        }
      ).then(response => response.json())
        .then(image => {
          setprofilePic(image.url);
          setPicLoading(false);
          toast.success("Profile Pic uploaded successfully");
          return;
        })
        .catch(error => {
          toast.error("error while uploading");
        })

    }
  }

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="font-bold text-4xl">
        <div className="flex min-h-full flex-col justify-center align-middle px-6 py-12 lg:px-8">
          <div className="bg-gray-300 bg-opacity-70 py-6 mt-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
                Sign Up
              </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm mx-2">
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
                      className="bg-transparent border-b-4 border-gray-400 focus:border-black outline-none block w-full appearance-none leading-normal text-base"
                      onChange={(e) => setName(e.target.value)}
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
                      type="email"
                      className="bg-transparent border-b-4 border-gray-400 focus:border-black outline-none block w-full appearance-none leading-normal text-base"
                      onChange={(e) => setEmail(e.target.value)}
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
                      type="password"
                      class="bg-transparent border-b-4 border-gray-400 focus:border-black outline-none block w-full appearance-none leading-normal text-base"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      for="password"
                      className="block text-xl font-large leading-6 text-black font-Poppins"
                    >
                      Confirm Password
                    </label>
                  </div>

                  <div className="mt-2">
                    <input
                      type="password"
                      class="bg-transparent border-b-4 border-gray-400 focus:border-black outline-none block w-full appearance-none leading-normal text-base"
                      onChange={(e) => setconfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex text-lg font-medium">
                  {selectedImage && (
                    <div>
                      <img
                        alt="not found"
                        width={"250px"}
                        src={URL.createObjectURL(selectedImage)}
                      />
                      <br />
                      <button onClick={() => setSelectedImage(null)}>
                        Remove
                      </button>
                    </div>
                  )}
                  <input
                    type="file"
                    name="myImage"
                    onChange={(e) => setpic(e.target.files[0])}
                  />
                  <button className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={postDetails}>Upload</button>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={submitHandler}
                    isLoading={loading}
                  >
                    Sign Up
                  </button>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleClick}
                  >
                    Log in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;

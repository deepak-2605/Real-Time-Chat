import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios"

function Signup({ toggleComponent }) {
  // const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const [confirmpassword, setConfirmpassword] = useState();
  const [profilePic, setprofilePic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // const handleClick = () => setShow(!show);

  const submitHandler = async (e) => {
    e.preventDefault();
    setPicLoading(true);
    if (!name || !email || !password) {
      setPicLoading(false);
      alert("fill all the required fields");
      return;
    }
    const response = await fetch("http://localhost:3001/api/user", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
      body: JSON.stringify(
        {
          name,
          email,
          password,
          profilePic
        })
    });
    const json = await response.json()
    console.log(json);
    if (json.success){
        // Save the auth token and redirect
        localStorage.setItem('token', json.authtoken); 
        setPicLoading(false);
        navigate('/chat', { state: { user: json.user, authtoken: json.authtoken } });
    }
    else {
        setPicLoading(false);
        alert("Invalid credentials");
    } 
  };

  function handleClick() {
    navigate("/");
  }

  const postDetails = (pics) => {
    console.log(pics);
    setPicLoading(true);
    if (pics === undefined) {
      alert("Try uploading again");
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      fetch(
        "https://www.filestackapi.com/api/store/S3?key=AD8Dd3nHvQ4WRSf3cfCJJz",
        {
          method: "POST",
          headers: { "content-type": "image/png" },
          data: data,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setprofilePic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          console.log("cloudinary");
          setPicLoading(false);
        });
    } else {
      alert("use only jpeg and png format");
      setPicLoading(false);
      return;
    }
  };

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
                    type="text"
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
                    type="text"
                    class="bg-transparent border-b-4 border-gray-400 focus:border-black outline-none block w-full appearance-none leading-normal text-base"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <h3>Upload image</h3>
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
                <br />
                <input
                  type="file"
                  name="myImage"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={submitHandler}
                  isLoading={picLoading}
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
  );
}

export default Signup;

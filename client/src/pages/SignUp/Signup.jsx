import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setUserData } from '../../Redux/slices/user-slice';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profilePreviewImage, setProfilePreviewImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [error, setError] = useState(""); // State to store validation errors

  // Mobile validation using regex (10 digits)
  const validateMobile = (mobile) => {
    const regex = /^[0-9]{10}$/; // Mobile number should be exactly 10 digits
    return regex.test(mobile);
  };

  const validateInputs = () => {
    if (!firstName || !lastName || !userEmail || !userPassword || !userMobile) {
      setError("All fields are required");
      return false;
    }
    if (userPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (!profileImage) {
      setError("Profile image is required");
      return false;
    }
    if (!validateMobile(userMobile)) {
      setError("Mobile number must be exactly 10 digits");
      return false;
    }
    return true;
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreviewImage(reader.result); // Update the preview image
      };
      reader.readAsDataURL(file); // Convert the image to a base64 URL for preview
    }
  };

  const registerUser = async (e) => {
    try {
      e.preventDefault();

      // Input validation
      if (!validateInputs()) {
        return;
      }

      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("userBio", userBio);
      formData.append("userEmail", userEmail);
      formData.append("userName", userName);
      formData.append("userPassword", userPassword);
      formData.append("userMobile", userMobile);
      formData.append("profileImage", profileImage);

      const result = await axios.post(
        "https://api.bragyourwork.com/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("Data: ", result);
      dispatch(setUserData(result.data));
      navigate("/"); // Redirect after successful registration
      alert("User entry saved in database");
    } catch (error) {
      console.log("Failed to register user: ", error);
      setError(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className=' w-full bg-unsplashBgImage flex justify-center items-center font-ubuntu'>
      <form
        className='h-full bg-white w-full max-w-[520px]  flex gap-3 flex-col p-5 mt-4 font-ubuntu'
        onSubmit={registerUser}
      >
        <h1 className='text-xl font-black text-navyblue'>Register</h1> <hr />
        
        {/* Display error message */}
        {error && (
          <div className="text-red-500 bg-red-100 border border-red-400 px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        <div className='flex gap-4 items-start justify-center'>
          <div className='flex flex-col items-start justify-center'>
            <label className='text-darkgray' htmlFor='firstName'>First Name</label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              className='p-2 border focus:outline-none w-full rounded-lg focus:border-navyblue focus:outline-none '
              placeholder='John'
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-start justify-center'>
            <label className='text-darkgray' htmlFor='lastName'>Last Name</label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              className='p-2 border focus:outline-none w-full rounded-lg focus:border-navyblue focus:outline-none '
              placeholder='Doe'
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className='flex flex-col items-start justify-center'>
          <label className='text-darkgray' htmlFor='userBio'>Bio</label>
          <textarea
            name="userBio"
            id="userBio"
            rows="3"
            className='mt-1 w-full rounded-md border p-2 focus:border-navyblue focus:outline-none'
            placeholder='Tell us something about yourself'
            required
            onChange={(e) => setUserBio(e.target.value)}
          ></textarea>
        </div>
        <div className='flex flex-col items-start justify-center'>
          <label className='text-darkgray' htmlFor='userEmail'>Email</label>
          <input
            type='email'
            id="userEmail"
            name='userEmail'
            className='p-2 border focus:outline-none w-full rounded-lg focus:border-navyblue focus:outline-none '
            placeholder='johndoe@example.com'
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className='flex flex-col items-start justify-center'>
          <label className='text-darkgray' htmlFor='userMobile'>Mobile No.</label>
          <input
            type='number'
            id='userMobile'
            name='userMobile'
            className='p-2 border focus:outline-none w-full rounded-lg focus:border-navyblue focus:outline-none '
            placeholder='0000000000'
            onChange={(e) => setUserMobile(e.target.value)}
          />
        </div>
        <div className='flex flex-col items-start justify-center'>
          <label className='text-darkgray' htmlFor='userName'>UserName</label>
          <input
            type='text'
            id='userName'
            name='userName'
            className='p-2 border focus:outline-none w-full rounded-lg focus:border-navyblue focus:outline-none '
            placeholder='johndoe123'
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className='flex flex-col items-start justify-center'>
          <label className='text-darkgray' htmlFor='userPassword'>Password</label>
          <input
            type='password'
            id='userPassword'
            name='userPassword'
            className='p-2 border focus:outline-none w-full rounded-lg focus:border-navyblue focus:outline-none '
            placeholder='********'
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>

        <div className="flex w-full flex-col items-center justify-center">
          <div className="mb-4 grid h-[200px] w-[200px] place-content-center overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-50 text-2xl font-black">
            {profilePreviewImage === "" ? (
              <p className="text-sm font-bold text-gray-500">Profile Image</p>
            ) : (
              <img src={profilePreviewImage} alt="" />
            )}
          </div>
          <label
            htmlFor="dropzone-file"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  fill="currentColor"
                  d="M19 9h-5v1h5V9zM14 9H6v1h8V9zM14 4H6v1h8V4zM2 12V5.5l7 2V5l-7-2V2l9 2 9-2v3.5l-7 2v1l7-2V12l-9-2-9 2V12z"
                />
              </svg>
              <p className="text-sm font-bold text-gray-500">Click to upload profile image</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <button
          type='submit'
          className='w-full rounded-lg bg-navyblue py-2 text-white text-xl hover:bg-navyblue'
        >
          Register
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/login" className="text-navyblue">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

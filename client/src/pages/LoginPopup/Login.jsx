import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { setUserData } from "../../Redux/slices/user-slice"
import { useDispatch } from "react-redux";
import axios from "axios";
import { StoreContext } from '../../context/StoreContext';


const Login = () => {
  // const {token,setToken} = useContext(StoreContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const loginUser = async (e) => {
    try {
      e.preventDefault();

      const user = {
        userEmail,
        userPassword,
      };

      const result = await axios.post("https://api.bragyourwork.com/auth/login", user);
      if (result.data.status === "Error") {
        alert("Incorrect email id or password. Please enter correct details.");
        console.log("wrong credentials ");
        navigate("/login");
      }
      else {
        console.log("User Logged in Successfully: ", result);
        dispatch(setUserData({
          // userId: result.data.user.userId, 
          userEmail: result.data.userEmail,
        }));
        navigate("/");
      }

    }
    catch (error) {
      console.log("Cannot login the user: ", error);
    }
  };

  return (
    <div className='h-heightWithoutNavbar w-full bg-unsplashBgImage bg-opacity-25 flex justify-center items-center p-5 font-ubuntu'>
      <form className=' w-full flex flex-col gap-4 max-w-[520px] p-5 bg-white shadow-2xl rounded-xl' onSubmit={loginUser}>
        <h1 className='font-bold text-xl'>Login</h1>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col items-start justify-center'>
            <label className='font-bold' htmlFor='userEmail'>Email</label>
            <input type='email' id='userEmail' name='userEmail' className='p-2 border border-gray-400 focus:border-navyblue focus:outline-none w-full rounded-lg ' placeholder='youremail@example.com' onChange={(e) => setUserEmail(e.target.value)} />
          </div>
          <div className='flex flex-col items-start justify-center'>
            <label className='font-bold' htmlFor='userPassword'>Password</label>
            <input id='userPassword' name='userPassword' className='p-2 border border-gray-400 w-full rounded-lg focus:border-navyblue focus:outline-none ' type='password' placeholder='**********' onChange={(e) => setUserPassword(e.target.value)} />
          </div>
        </div>
        <button className='transition ease-in-out delay-150 hover:text-white hover:bg-sky-600 duration-300 px-5 py-1 rounded-lg text-white font-ubuntu bg-navyblue'>Submit</button>
        <div className='text-sm flex justify-between items-center py-5'>
          <p>New to Bray Your Work?</p>
          <Link to="/signup"><p className='font-bold text-navyblue hover:underline'>Create an Account</p></Link>
        </div>
      </form>

    </div>
  )
}

export default Login
import React, { useEffect, useState } from "react";

import { useSelector } from 'react-redux';
import { selectUserEmail } from '../Redux/slices/user-slice';


const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userEmail = useSelector(selectUserEmail);// Replace with dynamic email or logged-in user's email

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/profile/${userEmail}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data); // Set user data to state
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Set loading to false after data fetch is complete
      }
    };

    fetchUserData();
  }, [userEmail]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4">
          {/* Profile Image */}
          <div className="w-32 h-32">
            <img
              src={user.profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* User Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-500">{user.userBio}</p>
            <p className="text-gray-600 mt-2">
              <span className="font-bold">Username:</span> {user.userName}
            </p>
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Contact Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Contact Information
          </h2>
          <p>
            <span className="font-bold">Email:</span> {user.userEmail}
          </p>
          <p>
            <span className="font-bold">Mobile:</span> {user.userMobile}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

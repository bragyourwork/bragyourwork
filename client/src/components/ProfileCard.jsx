import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';

const ProfileCard = ({ profileInfo, setProfileInfo }) => {
  const [profileImage, setProfileImage] = useState(profileInfo.image || null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setProfileInfo({ ...profileInfo, image: imageUrl }); // Update parent state
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="relative flex flex-col items-center">
        <div className="relative">
          <img
            src={profileImage || 'https://via.placeholder.com/150'} // Placeholder person icon
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border border-gray-300"
          />

          {/* Edit Icon */}
          <label
            htmlFor="file-input"
            className="absolute bottom-0 right-0 bg-gray-600 p-2 rounded-full cursor-pointer transform translate-x-2 translate-y-2"
          >
            <FiEdit className="text-white" />
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Profile Info */}
        <input
          type="text"
          placeholder="Enter Name"
          value={profileInfo.name}
          onChange={(e) => setProfileInfo({ ...profileInfo, name: e.target.value })}
          className="text-2xl font-semibold text-center w-full mt-4 p-2 border-b border-gray-300"
        />
        <textarea
          placeholder="Write about yourself..." rows='10'
          value={profileInfo.about}
          onChange={(e) => setProfileInfo({ ...profileInfo, about: e.target.value })}
          className="w-full p-2 mt-4 border rounded-md"
        />
      </div>
    </div>
  );
};

export default ProfileCard;

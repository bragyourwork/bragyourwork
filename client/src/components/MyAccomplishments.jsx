import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUserEmail } from '../Redux/slices/user-slice';

function MyAccomplishments() {
  const [accomplishments, setAccomplishments] = useState([]);
  const userEmail = useSelector(selectUserEmail);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccomplishments = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/accomplishments/view/${userEmail}`);
        setAccomplishments(data);
      } catch (error) {
        console.error('Error fetching accomplishments', error);
      }
    };

    fetchAccomplishments(); 
  }, [userEmail]);

  const handleImageClick = (accomplishmentId) => {
    navigate(`/accomplishments/view/${userEmail}/${accomplishmentId}`);
  };

  // Handle delete request
  const handleDelete = async (accomplishmentId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/accomplishments/delete/${accomplishmentId}`);
      console.log(response.data.message);  // Optional: log success message
      // Remove the deleted accomplishment from the state
      setAccomplishments(accomplishments.filter(accomplishment => accomplishment._id !== accomplishmentId));
    } catch (error) {
      console.error('Error deleting accomplishment', error);
    }
  };

  return (
    <div className="bg-white p-8 shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-navyblue">My Accomplishments</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {accomplishments.map(accomplishment => (
          <li key={accomplishment._id} className="relative group bg-neutral-100 border border-gray-300 rounded-lg overflow-hidden">
            {/* Cover Image */}
            {accomplishment.file && (
              <img
                src={accomplishment.file}
                alt="Cover Image"
                className="w-full h-64 object-cover cursor-pointer group-hover:opacity-75"
                onClick={() => handleImageClick(accomplishment._id)}
              />
            )}
            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h3 className="text-lg font-bold text-white">{accomplishment.title}</h3>
            </div>

            {/* Delete Icon */}
            <button
              onClick={() => handleDelete(accomplishment._id)}
              className="absolute top-2 right-2 bg-white text-black rounded-full p-2 hover:bg-gray-100 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyAccomplishments;
  
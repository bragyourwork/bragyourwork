import React from 'react';
import { useNavigate } from 'react-router-dom';

const AchievementsShowcase = ({ achievements }) => {
  const navigate = useNavigate();

  const handleImageClick = (achievementId) => {
    navigate(`/accomplishments/view/${achievementId}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement._id}
            className="relative group bg-neutral-100 border border-gray-300 rounded-lg overflow-hidden"
          >
            {/* Cover Image */}
            {achievement.file && (
              <img
                src={achievement.file}
                alt={achievement.title}
                className="w-full h-64 object-cover cursor-pointer group-hover:opacity-75"
                onClick={() => handleImageClick(achievement._id)}
              />
            )}
            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h3 className="text-lg font-bold text-white">{achievement.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsShowcase;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function AccomplishmentDetail() {
  const { id } = useParams(); // Get the accomplishment ID from the URL
  const [accomplishment, setAccomplishment] = useState(null);

  useEffect(() => {
    const fetchAccomplishment = async () => {
      try {
        const { data } = await axios.get(`https://api.bragyourwork.com/accomplishments/${id}`);
        setAccomplishment(data);
      } catch (error) {
        console.error('Error fetching accomplishment', error);
      }
    };
z
    fetchAccomplishment();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccomplishment({ ...accomplishment, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://api.bragyourwork.com/accomplishments/${id}`, accomplishment);
      alert('Accomplishment updated successfully!');
    } catch (error) {
      console.error('Error updating accomplishment', error);
    }
  };

  const handleAddSection = (type) => {
    setAccomplishment({
      ...accomplishment,
      sections: [...accomplishment.sections, { type, content: '' }],
    });
  };

  const handleSectionChange = (index, content) => {
    const newSections = [...accomplishment.sections];
    newSections[index].content = content;
    setAccomplishment({ ...accomplishment, sections: newSections });
  };

  if (!accomplishment) return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Customize Accomplishment</h2>

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">Title:</label>
        <input
          type="text"
          name="title"
          value={accomplishment.title}
          onChange={handleInputChange}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none transition"
        />
      </div>

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">Description:</label>
        <textarea
          name="description"
          value={accomplishment.description}
          onChange={handleInputChange}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none transition"
          rows="4"
        />
      </div>

      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Sections</h3>
      {accomplishment.sections.map((section, index) => (
        <div key={index} className="mb-6">
          {section.type === 'text' && (
            <textarea
              value={section.content}
              onChange={(e) => handleSectionChange(index, e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none transition"
              rows="4"
              placeholder="Enter text..."
            />
          )}
          {section.type === 'image' && (
            <input
              type="text"
              value={section.content}
              onChange={(e) => handleSectionChange(index, e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring focus:ring-green-300 focus:outline-none transition"
              placeholder="Enter image URL..."
            />
          )}
          {section.type === 'video' && (
            <input
              type="text"
              value={section.content}
              onChange={(e) => handleSectionChange(index, e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none transition"
              placeholder="Enter video URL..."
            />
          )}
        </div>
      ))}

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => handleAddSection('text')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-500 transition"
        >
          + Add Text
        </button>
        <button
          onClick={() => handleAddSection('image')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-500 transition"
        >
          + Add Image
        </button>
        <button
          onClick={() => handleAddSection('video')}
          className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500 transition"
        >
          + Add Video
        </button>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition focus:ring focus:ring-blue-300 focus:outline-none"
      >
        Save Changes
      </button>
    </div>
  );
}

export default AccomplishmentDetail;

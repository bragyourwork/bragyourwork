import React, { useState } from 'react';

const CustomSection = ({ customSections, setCustomSections }) => {
  const handleAddSection = (type) => {
    setCustomSections([...customSections, { type, content: '' }]);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl text-navyblue font-semibold mb-4">Add Custom Section</h2>
      <div className="flex space-x-4 mb-4">
        <button
          className="border border-black text-black px-4 py-2 rounded-md"
          onClick={() => handleAddSection('text')}
        >
          Add Text Section
        </button>
        <button
          className="border border-black text-black px-4 py-2 rounded-md"
          onClick={() => handleAddSection('image')}
        >
          Add Image Section
        </button>
      </div>

      {customSections.map((section, index) => (
        <div key={index} className="mb-4">
          {section.type === 'text' ? (
            <textarea
              className="w-full p-2 border rounded-md"
              value={section.content}
              onChange={(e) => {
                const newSections = [...customSections];
                newSections[index].content = e.target.value;
                setCustomSections(newSections);
              }}
            />
          ) : (
            <input
              type="file"
              className="w-full p-2"
              onChange={(e) => {
                const newSections = [...customSections];
                newSections[index].content = URL.createObjectURL(e.target.files[0]);
                setCustomSections(newSections);
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomSection;

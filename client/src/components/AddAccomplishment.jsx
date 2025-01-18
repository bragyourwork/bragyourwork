import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserEmail } from '../Redux/slices/user-slice';



function AddAccomplishment() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const userEmail = useSelector(selectUserEmail);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userId', 'user123');  // Hardcoded userId for demonstration
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('tags', tags);
    formData.append('userEmail', userEmail);

    if (file) {
      formData.append('file', file);
    }
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    console.log([...formData]);

    try {
      await axios.post('https://api.bragyourwork.com/accomplishments/add', formData);
      console.log("hahahaha");
      alert('Accomplishment added successfully!');
      setTitle('');
      setDescription('');
      setDate('');
      setTags('');
      setFile(null);
      setFiles([]);
    } catch (error) {
      console.error('Error adding accomplishment', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set single file
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-navyblue">Add New Accomplishment</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter accomplishment title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe your accomplishment"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags/Categories:</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. - job, certification, internship etc."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Cover Image:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Any related documents (jpeg,jpg,gif,png):</label>
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-navyblue text-white p-3 rounded-lg font-semibold hover:bg-sky-700 transition duration-200"
        >
          Save Accomplishment
        </button>
      </form>
    </div>
  );
}

export default AddAccomplishment;

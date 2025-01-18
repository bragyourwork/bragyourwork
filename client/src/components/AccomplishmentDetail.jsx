import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Set the root element for modal
Modal.setAppElement('#root');

function AccomplishmentDetail() {
  const [accomplishment, setAccomplishment] = useState(null);
  const [newTag, setNewTag] = useState('');
  const [newFiles, setNewFiles] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { userEmail, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccomplishmentDetails = async () => {
      try {
        const { data } = await axios.get(`https://api.bragyourwork.com/accomplishments/view/${userEmail}/${id}`);
        data.date = new Date(data.date).toISOString().split('T')[0];
        setAccomplishment(data);
      } catch (error) {
        console.error('Error fetching accomplishment details', error);
      }
    };

    fetchAccomplishmentDetails();
  }, [userEmail, id]);

  if (!accomplishment) return <p>Loading...</p>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccomplishment({ ...accomplishment, [name]: value });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('userId', accomplishment.userId);
      formData.append('userEmail', accomplishment.userEmail);
      formData.append('title', accomplishment.title);
      formData.append('description', accomplishment.description);
      formData.append('date', accomplishment.date);
      formData.append('tags', accomplishment.tags.join(','));

      if (newFiles.length > 0) {
        newFiles.forEach((file) => {
          formData.append('files', file);
        });
      }

      const { data } = await axios.put(`https://api.bragyourwork.com/accomplishments/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setAccomplishment(data);
      setNewFiles([]);

      alert('Accomplishment updated successfully!');
      navigate('/accomplishment');
    } catch (error) {
      console.error('Error updating accomplishment', error);
    }
  };

  const addTag = () => {
    if (newTag.trim() !== '') {
      setAccomplishment({
        ...accomplishment,
        tags: [...accomplishment.tags, newTag.trim()],
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setAccomplishment({
      ...accomplishment,
      tags: accomplishment.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const removeFile = async (fileToRemove) => {
    try {
      await axios.delete(`https://api.bragyourwork.com/accomplishments/${id}/files`, {
        data: { fileUrl: fileToRemove }
      });

      setAccomplishment({
        ...accomplishment,
        files: accomplishment.files.filter(file => file !== fileToRemove),
      });

      alert('File removed successfully!');
    } catch (error) {
      console.error('Error removing file', error);
      alert('Failed to remove file. Please try again.');
    }
  };

  const openModal = (file) => {
    setModalContent(file);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent(null);
  };

  const handleFilesChange = (e) => {
    setNewFiles([...e.target.files]);
  };

  const openFileInNewTab = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  return (
    <div className="font-ubuntu bg-white p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Left Area: Image and Title */}
        <div className="col-span-1 flex flex-col items-center">
          <input
            type="text"
            name="title"
            value={accomplishment.title}
            onChange={handleInputChange}
            className="text-xl md:text-2xl font-bold text-navyblue text-center mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg"
          />
          {accomplishment.file && (
            <div className="relative">
              <img
                src={accomplishment.file}
                alt="Cover"
                className="w-full h-auto mb-4 rounded-lg"
              />
              <button
                onClick={() => removeFile(accomplishment.file)}
                className="absolute top-2 right-2 text-white text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          )}
          <div className="mb-4 md:mb-8">
            {accomplishment.tags && accomplishment.tags.map((tag, index) => (
              <div
                key={index}
                className="inline-block bg-navyblue text-white text-xs md:text-sm font-medium py-1 px-2 md:py-2 md:px-4 rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2 mb-2"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-navyblue bg-white px-1 rounded-xs text-xs md:text-sm"
                >
                  x
                </button>
              </div>
            ))}
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="mt-2 p-2 border rounded-lg"
              placeholder="Add new tag"
            />
            <button onClick={addTag} className="ml-2 bg-neutral-100 text-black px-2 py-1 md:px-4 md:py-2 rounded-lg text-xs md:text-sm">Add Tag</button>
          </div>
        </div>

        {/* Right Area */}
        <div className="col-span-1 md:col-span-3 mx-0 md:mx-8">
          <div className="mb-4 md:mb-6">
            <label className="block text-lg font-medium text-navyblue mb-2">Description:</label>
            <textarea
              name="description"
              value={accomplishment.description}
              onChange={handleInputChange}
              className="w-full p-2 md:p-4 bg-neutral-50 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none transition"
              rows="25"
            />
          </div>
          {/* Date */}
          <div className="mb-4 md:mb-6">
            <label className="block text-lg font-medium text-navyblue mb-2">Date of Accomplishment:</label>
            <input
              type="date"
              name="date"
              value={accomplishment.date}
              onChange={handleInputChange}
              className="w-full p-2 md:p-4 bg-neutral-50 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none transition"
            />
          </div>
          {/* Files */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {accomplishment.files && accomplishment.files.map((file, index) => (
              <div key={index} className="relative mb-4">
                {file.match(/\.(jpeg|jpg|gif|png)$/) ? (
                  <div>
                    <img
                      src={file}
                      alt={`File ${index + 1}`}
                      className="w-full h-auto md:h-64 rounded-lg cursor-pointer"
                      onClick={() => openModal(file)}
                    />
                    <button
                      onClick={() => removeFile(file)}
                      className="absolute top-2 right-2 text-navyblue bg-white text-lg  px-1 rounded-xs"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ) : file.match(/\.(pdf)$/) ? (
                  <div className="p-2 border rounded-lg cursor-pointer flex items-center">
                    <i className="fas fa-file-pdf text-red-600 text-xl md:text-3xl mr-2"></i>
                    <button onClick={() => openFileInNewTab(file)} className="text-blue-500 text-xs md:text-base">View PDF</button>
                    <button
                      onClick={() => removeFile(file)}
                      className="absolute top-2 right-2 text-red-600 text-2xl"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ) : file.match(/\.(docx?|odt)$/) ? (
                  <div className="p-2 border rounded-lg cursor-pointer flex items-center">
                    <i className="fas fa-file-word text-blue-600 text-xl md:text-3xl mr-2"></i>
                    <button onClick={() => openFileInNewTab(file)} className="text-blue-500 text-xs md:text-base">View Word Document</button>
                    <button
                      onClick={() => removeFile(file)}
                      className="absolute top-2 right-2 text-red-600 text-2xl"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ) : file.match(/\.(xlsx?|xls)$/) ? (
                  <div className="p-2 border rounded-lg cursor-pointer flex items-center">
                    <i className="fas fa-file-excel text-green-600 text-xl md:text-3xl mr-2"></i>
                    <button onClick={() => openFileInNewTab(file)} className="text-blue-500 text-xs md:text-base">View Excel File</button>
                    <button
                      onClick={() => removeFile(file)}
                      className="absolute top-2 right-2 text-red-600 text-2xl"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ) : file.match(/\.(mp4|avi|mov|wmv)$/) ? (
                  <div className="p-2 border rounded-lg cursor-pointer flex items-center">
                    <i className="fas fa-file-video text-blue-600 text-lg md:text-3xl mr-2"></i>
                    <button onClick={() => openFileInNewTab(file)} className="text-navyblue text-xs md:text-base">View Video</button>
                    <button
                      onClick={() => removeFile(file)}
                      className="absolute top-2 right-2 text-navyblue text-xl"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ) : (
                  <div className="p-2 border rounded-lg cursor-pointer">
                    <a href={file} target="_blank" rel="noopener noreferrer" className="text-navyblue">View File</a>
                    <button
                      onClick={() => removeFile(file)}
                      className="absolute top-2 right-2 text-navyblue text-xl"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <input type="file" multiple onChange={handleFilesChange} className="mb-4" /> <br />
          <button
            onClick={handleSave}
            className="w-full md:w-64 mt-4 md:mt-12 bg-navyblue text-white p-2 rounded-lg text-sm md:text-base"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Modal for PDF Preview */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="PDF Preview"
        className="modal"
        overlayClassName="overlay"
      >
        {modalContent && (
          <div>
            <iframe
              src={modalContent}
              type="application/pdf"
              width="100%"
              height="600px"
              title="PDF Preview"
            />
            <button onClick={closeModal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default AccomplishmentDetail;

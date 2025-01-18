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
        const { data } = await axios.get(`https://api.bragyourwork.com/accomplishments/${id}`);
        data.date = new Date(data.date).toISOString().split('T')[0];
        setAccomplishment(data);
      } catch (error) {
        console.error('Error fetching accomplishment details', error);
      }
    };

    fetchAccomplishmentDetails();
  }, [userEmail, id]);

  if (!accomplishment) return <p>Loading...</p>;

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setAccomplishment({ ...accomplishment, [name]: value });
  // };

  // const handleSave = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('userId', accomplishment.userId);
  //     formData.append('userEmail', accomplishment.userEmail);
  //     formData.append('title', accomplishment.title);
  //     formData.append('description', accomplishment.description);
  //     formData.append('date', accomplishment.date);
  //     formData.append('tags', accomplishment.tags.join(','));

  //     if (newFiles.length > 0) {
  //       newFiles.forEach((file) => {
  //         formData.append('files', file);
  //       });
  //     }

  //     const { data } = await axios.put(`https://api.bragyourwork.com/accomplishments/${id}`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     setAccomplishment(data);
  //     setNewFiles([]);

  //     alert('Accomplishment updated successfully!');
  //     navigate('/accomplishment');
  //   } catch (error) {
  //     console.error('Error updating accomplishment', error);
  //   }
  // };

  // const addTag = () => {
  //   if (newTag.trim() !== '') {
  //     setAccomplishment({
  //       ...accomplishment,
  //       tags: [...accomplishment.tags, newTag.trim()],
  //     });
  //     setNewTag('');
  //   }
  // };

  // const removeTag = (tagToRemove) => {
  //   setAccomplishment({
  //     ...accomplishment,
  //     tags: accomplishment.tags.filter(tag => tag !== tagToRemove),
  //   });
  // };

  // const removeFile = async (fileToRemove) => {
  //   try {
  //     await axios.delete(`https://api.bragyourwork.com/accomplishments/${id}/files`, {
  //       data: { fileUrl: fileToRemove }
  //     });

  //     setAccomplishment({
  //       ...accomplishment,
  //       files: accomplishment.files.filter(file => file !== fileToRemove),
  //     });

  //     alert('File removed successfully!');
  //   } catch (error) {
  //     console.error('Error removing file', error);
  //     alert('Failed to remove file. Please try again.');
  //   }
  // };

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
    <div className="relative max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {/* Title Section */}
      <div className="flex flex-col items-center mb-6">
        <input
          type="text"
          name="title"
          value={accomplishment.title}
          className="text-xl md:text-2xl font-bold text-navyblue text-center mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg"
        />
        {accomplishment.file && (
          <div className="relative mb-4">
            <img
              src={accomplishment.file}
              alt="Cover"
              className="max-w-lg h-auto rounded-lg"
            />
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-2">
          {accomplishment.tags &&
            accomplishment.tags.map((tag, index) => (
              <div
                key={index}
                className="inline-block bg-navyblue text-white text-xs md:text-sm font-medium py-1 px-2 md:py-2 md:px-4 rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                {tag}
              </div>
            ))}
        </div>
      </div>
  
      {/* Description Section */}
      <div className="mb-6">
        {/* <label className="block text-lg font-medium text-navyblue mb-2">
          Description:
        </label> */}
        <span
          name="description"
          className="w-full p-2 md:p-4  rounded-lg focus:ring focus:ring-blue-300 focus:outline-none transition"
        >
          {accomplishment.description}
        </span>
      </div>
  
      {/* Date Section */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-navyblue mb-2">
          Date of Accomplishment:
        </label>
        <span
          name="date"
          className="w-full p-2 md:p-4 bg-neutral-50 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none transition"
        >
          {accomplishment.date}
        </span>
      </div>
  
      {/* Files Section */}
      <div className="flex flex-col gap-4">
        {accomplishment.files &&
          accomplishment.files.map((file, index) => (
            <div key={index} className="relative">
              {file.match(/\.(jpeg|jpg|gif|png)$/) ? (
                <img
                  src={file}
                  alt={`File ${index + 1}`}
                  className="w-auto h-auto md:h-64 rounded-lg cursor-pointer"
                />
              ) : file.match(/\.(pdf)$/) ? (
                <div className="p-2 border rounded-lg cursor-pointer flex items-center">
                  <i className="fas fa-file-pdf text-red-600 text-xl md:text-3xl mr-2"></i>
                  <button className="text-blue-500 text-xs md:text-base">
                    View PDF
                  </button>
                </div>
              ) : file.match(/\.(docx?|odt)$/) ? (
                <div className="p-2 border rounded-lg cursor-pointer flex items-center">
                  <i className="fas fa-file-word text-blue-600 text-xl md:text-3xl mr-2"></i>
                  <button className="text-blue-500 text-xs md:text-base">
                    View Word Document
                  </button>
                </div>
              ) : file.match(/\.(xlsx?|xls)$/) ? (
                <div className="p-2 border rounded-lg cursor-pointer flex items-center">
                  <i className="fas fa-file-excel text-green-600 text-xl md:text-3xl mr-2"></i>
                  <button className="text-blue-500 text-xs md:text-base">
                    View Excel File
                  </button>
                </div>
              ) : file.match(/\.(mp4|avi|mov|wmv)$/) ? (
                <div className="p-2 border rounded-lg cursor-pointer flex items-center">
                  <i className="fas fa-file-video text-blue-600 text-lg md:text-3xl mr-2"></i>
                  <button className="text-navyblue text-xs md:text-base">
                    View Video
                  </button>
                </div>
              ) : (
                <div className="p-2 border rounded-lg cursor-pointer">
                  <a
                    href={file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navyblue"
                  >
                    View File
                  </a>
                </div>
              )}
            </div>
          ))}
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
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
  
}

export default AccomplishmentDetail;

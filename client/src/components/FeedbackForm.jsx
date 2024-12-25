import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';  // Correct import
import 'react-toastify/dist/ReactToastify.css';  // Import CSS for toast notifications
import { Link } from 'react-router-dom';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
    rating: '5',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendFeedback = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_mviq5pm",
      "template_07tg1b8",
      e.target,
      "hNb09ysVlNRbyWjju"
    ).then((result) => {
      console.log("Email sent successfully:", result.text);
      toast.success("Thank you! Your feedback has been sent.");  // Success toast
    })
      .catch((error) => {
        console.error("Email sending failed:", error);
        toast.error("Oops! Something went wrong. Please try again.");  // Error toast
      });
  };

  return (
    <div className="container p-4">
      <h2 className="text-2xl p-9 font-black mt-9 font-ubuntu mb-4">Feedback Hub</h2>
      <div className="md:mx-32 mx-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex justify-center items-center">
          <img
            src="./feedback2.png"
            alt="Placeholder"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className='md:p-4'>
          <form onSubmit={sendFeedback} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Feedback</label>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                rows="4"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="mt-1 p-2 font-ubuntu block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="1">1 - Very Poor</option>
                <option value="2">2 - Poor</option>
                <option value="3">3 - Average</option>
                <option value="4">4 - Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="mt-4 px-4 py-2 border border-black text-black font-ubuntu rounded-md shadow-sm hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
        </div>
        <h4 className='my-24 font-bold flex items-center justify-center'>Join Brag Your work and start showcasing your career journey today.</h4>
        <div className='flex mb-8 items-center justify-center'>
        <Link
            to="/contact"
            className="font-ubuntu border border-black text-base font-bold text-black hover:underline mx-4 p-2"
           
          >
            Contact us
          </Link>
        <Link
            to="/faq"
            className="font-ubuntu border border-black text-base font-bold text-black hover:underline mx-4 p-2"
           
          >
            FAQs
          </Link>
          </div>
       

      {/* Correct ToastContainer usage */}
      <ToastContainer />
    </div>
  );
};

export default FeedbackForm;

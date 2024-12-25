import React from 'react';

const Guide = () => {
  return (
    <>
      <p className="pt-24 text-center bg-gray-100">It's as easy as 1-2-3</p>
      <h3 className="flex items-center justify-center pt-4 bg-gray-100 font-bold text-2xl">See How it Works</h3>

      {/* First Section */}
      <section className="flex flex-col md:flex-row items-center justify-between py-12 px-6 md:px-24 bg-gray-100">
        {/* Left Side (Text) */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">1. Create your Profile</h2>
          <p className="text-lg text-gray-600">
            Sign up and create your personalized profile in just a few clicks.
          </p>
        </div>

        {/* Right Side (Image) */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <img 
            src="./Create.jpg" 
            alt="Create Profile" 
            className="w-72 h-auto rounded-lg shadow-lg" 
          />
        </div>
      </section>

      {/* Second Section */}
      <section className="flex flex-col md:flex-row items-center justify-between py-12 px-6 md:px-24 bg-gray-100">
        {/* Left Side (Text) */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">2. Add your accomplishments</h2>
          <p className="text-lg text-gray-600">
            Showcase your contributions with descriptions, visuals, and metrics.
          </p>
        </div>

        {/* Right Side (Image) */}
        <div className="w-full md:w-1/2">
          <img 
            src="./addAccomplishment.jpg" 
            alt="Add Accomplishments" 
            className="w-full h-auto rounded-lg shadow-lg" 
          />
        </div>
      </section>
    </>
  );
};

export default Guide;

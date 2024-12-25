import React from 'react';
import mission from '../../public/mission.png'
import whyus from '../../public/whyus.png'
const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      

      {/* Hero Section */}
      <section className="font-ubuntu bg-white py-20 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-navyblue">About &nbsp;"Brag You Work"</h2>
          <p className="text-s pt-8 mt-4 text-gray-800 mx-8">
          At Brag Your Work, we believe in the power of documenting your achievements. Many of us accomplish great things but fail to track them, missing out on opportunities to reflect, improve, and showcase our best work. Our platform helps you keep track of milestones, analyze your strengths, and present your career story clearly and effectively when it matters most.
          </p>
        </div>
      </section>

      {/* Vision and Mission Section */}
<section className="py-16 font-ubuntu px-8 bg-gray-200">
  <div className="container mx-auto grid md:grid-cols-2 gap-12">
    <div>
      {/* Mission Image */}
      <img 
        src={mission} 
        alt="Mission related image" 
        className="rounded-lg shadow-lg"
      />
    </div>
    <div className="flex items-center h-full">
      <div>
        <h3 className="text-2xl font-bold text-black">Our Mission</h3>
        <p className="mt-4 text-darkgray">
          <i>Our mission is simple yet powerful: to empower professionals like you to tell their career stories in the most compelling way possible. We're here to provide you with the tools and resources you need to stand out, be recognized, and achieve your career aspirations.</i>
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Cool Feature Section with Image */}
      <section className="bg-darkgray font-ubuntu py-16 px-16 ">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-white">Why Brag Your Work?</h3>
            <br />
            {/* <p className="mt-4 text-gray-100">
              Brag You Work is more than just a portfolio tool. We understand the importance of your professional journey 
              and provide you with a dynamic platform to share it with the world. Whether it's a personal project or a 
              professional achievement, you can display it with style and confidence.
            </p> */}
            <ul className="mt-6 space-y-2">
              <li className="text-gray-100"><span className="font-bold text-navyblue">✓</span> Keep a track of your milestones for easy reference.</li>
              <li className="text-gray-100"><span className="font-bold text-navyblue">✓</span> Prepare for appraisals and promotions with confidence.</li>
              <li className="text-gray-100"><span className="font-bold text-navyblue">✓</span> Easily highlight your achievements for stronger resumes and interview answers.</li>
            </ul>
          </div>
          <div>
            <img 
              src={whyus} 
              alt="Brag Your Work platform screenshot" 
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      
      <section className="bg-white font-ubuntu py-16 px-16">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold text-navyblue">Join us on the journey</h3>
          <p className=" text-gray-600 lg:px-12 sm:px-2 py-8">Join Brag Your Work to track your achievements, build a stronger resume, and excel in interviews. Start showcasing your career today.</p>

          
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 text-black py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Brag You Work. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;

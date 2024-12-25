import React from 'react';

const Card = ({ image, title, description }) => (
  <div
    className="relative w-full h-64 bg-cover border border-darkgray border-4 bg-center rounded-lg shadow-lg overflow-hidden"
    style={{ backgroundImage: `url(${image})` }}
  >
    <div className="absolute hover:bg-inherit  inset-0 bg-black bg-opacity-10 flex flex-col justify-center text-center p-4">
      <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
      <p className="font-ubuntu  text-sky-600 bg-white p-3 text-lg rounded-xl">{description}</p>
    </div>
  </div>
);

const CardGrid = () => {
  const cards = [
    {
      image: './showcase.jpg',
      title: '',
      description: 'Showcase your contributions'
    },
    {
      image: './resume.jpg',
      title: '',
      description: 'Enhance your resume'
    },
    {
      image: './milestone.jpg',
      title: '',
      description: 'Milestone documentation'
    },
    {
      image: './employer.jpg',
      title: '',
      description: 'Ace your Interviews'
    },
  ];

  return (
    <div className='bg-gray-100'>
      <h3 className=' mt-12 text-sky-600 font-ubuntu flex text-xl font-black justify-center items-center'>---------WHAT WE DO---------</h3>
      <h1 className='font-ubuntu md:mx-32 mx-5 text-center text-darkgray pt-8 flex text-2xl justify-center items-center'>Track and showcase your achievements effortlessly for appraisal, resumes and hiring managers.</h1>
      <p className='font-ubuntu md:mx-32 text-center mt-2 text-darkgray flex text-base justify-center items-center'>Organize milestones, highlight your skills, and share your story - your way.</p>
      <div className="container mx-auto px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <Card key={index} image={card.image} title={card.title} description={card.description} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardGrid;

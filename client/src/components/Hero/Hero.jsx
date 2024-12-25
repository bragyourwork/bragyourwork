import React from 'react'
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <div className='h-1600 flex justify-center pt-28 px-4 relative bg-white'>
      <div className='relative w-full text-center max-w-[860px] text-black'>
        <h1 className='font-ubuntu justify-center font-black text-5xl text-darkgray md:text-7xl items-center'>BRAG YOUR</h1> <h1 className='font-ubuntu justify-center font-black text-navyblue text-5xl md:text-7xl items-centertext-red-800'>WORK</h1>
        <p className='font-ubuntu text-gray-500 text-2xl mt-9'>Accomplishments that speak louder than your resume</p>
        {/* <div className='mt-9'>
          <Link to="/search" className='text-white transition ease-in-out delay-150 hover:scale-110 hover:text-white hover:-translate-y-1  hover:bg-sky-700 duration-300 justify-center items-center px-20 py-4 bg-navyblue rounded-lg'>
            <button>Get started</button>
          </Link>
        </div> */}
        <p className='font-ubuntu text-sky-600 mt-2 mb-28 text-xl'>Showcase your milestones effortlessly to impress decision-makers.</p>
      </div>

    </div>
    // <div>
    //   <div className='flex'>
    //     <div className='w-[650px] mt-[100px] justify-center items-center'>
    //         <img src="/icon.jpg" alt="" />
    //     </div>
    //     <div>

    //     </div>
    //   </div>
    // </div>
    // <section className="flex flex-col md:flex-row mx-5 h-heightWithoutNavbar">
    //   {/* Text Section */}
    //   <div className="flex flex-col justify-center items-center text-center md:w-1/2 bg-white-100 p-8">
    //     <h1 className="text-4xl  md:text-6xl text-teal-600 font-serif font-bold mb-4">BRAG YOUR WORK</h1>
    //     <p className="text-lg font-serif md:text-xl mb-6">Achievements that speak louder than your resume. Create and share your milestones with Interviewers effortlessly.</p>
    //     <button className="bg-blue-400 text-white px-6 py-3 font-serif rounded-full text-lg hover:bg-blue-500">Get Started</button>
    //   </div>
    //   {/* Image Section */}
    //   <div className="md:w-1/2 flex justify-center items-center">
    //     <img
    //       src="./icon.jpg"
    //       alt="Hero"
    //       className="object-cover w-full"
    //     />
    //   </div>
    // </section>
  )
}

export default Hero
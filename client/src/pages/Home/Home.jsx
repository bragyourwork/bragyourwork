import React from 'react'
import Hero from '../../components/Hero/Hero'
import CardGrid from '../../components/CardGrid/CardGrid'
import FeedbackForm from '../../components/FeedbackForm'
import Guide from '../../components/Guide'

const Home = () => {
    return (
        <div className='h-heightWithoutNavbar bg-neutral-100'>
            <Hero />
            <CardGrid />
            <Guide/>
            <FeedbackForm />
        </div>
    )
}

export default Home
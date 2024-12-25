import React, { useState } from 'react';

const FAQ = () => {
    const [openQuestion, setOpenQuestion] = useState(null);

    const toggleQuestion = (index) => {
        setOpenQuestion(openQuestion === index ? null : index);
    };

    const faqs = [
        {
            question: "What is Brag Your Work?",
            answer: "Brag Your Work is a platform designed to help professionals showcase their accomplishments effectively. It allows you to create a dynamic portfolio of your career achievements, making it easier to impress potential employers, stand out in interviews, and network with confidence."
        },
        {
            question: "How can Brag Your Work benefit me?",
            answer: (
                <>
                <strong>Brag your work empowers you to: </strong><br/><strong>Stand out: </strong>Differentiate yourself in the job market.<br/><strong>Confident Interviews: </strong>Present achievements conficently in interviews.<br/><strong>Effortless Networking: </strong>Share successes effortless<br/><strong>Personalized growth: </strong>Tailor your career journey.<br/></>
            )
        },
        {
            question: "Is Brag Your Work free to use?",
            answer: "Yes, Brag Your Work offers a free version with essential features. We also offer premium plans with additional benefits for those looking to enhance their experience."
        },
        {
            question: "Is my data safe on Brag Your Work?",
            answer: "Absolutely. We take data security seriously. Your information is protected with the latest security measures, and we do not share your data with third parties."
        },
        {
            question: "How can I get started?",
            answer: "It's easy to get started with Brag Your Work. Simply sign up for a free account, and you can begin documenting and showcasing your accomplishments right away."
        },
        {
            question: "Can I use Brag Your Work on mobile devices?",
            answer: "Yes, Brag Your Work is accessible on mobile devices. We also offer a mobile app for added convenience."
        },
        {
            question: "What types of accomplishments can I showcase?",
            answer: "You can showcase a wide range of accomplishments, including work projects, certifications, awards, personal milestones, and more. Our platform is designed to be flexible to accomodate your unique career journey."
        },
        {
            question: "How can I share my portfolio with others?",
            answer: "Sharing your portfolio is easy. You can generate a shareable link or use our mobile app to share it directly with potential employers, colleagues, mentors, or anyone interested in your achievements.."
        },
        {
            question: "Do you offer customer support?",
            answer: "Yes, we offer customer support team ready to assist you. If you have questions or need assistance, please feel free to reach out to us via our contact page.."
        },
        {
            question: "Is Brag Your Work suitable for all professions and industries?",
            answer: "Absolutely. Our platform is designed to accomodate professionals from various industries and career paths. Your accomplishments, no matter your field, can be effectively showcased with Brag Your Work."
        }
    ];

    return (
        <div className="max-w-3xl mx-auto py-10 px-4 font-ubuntu">
            <h2 className="text-2xl font-bold text-center mb-8 text-darkgray">Frequently Asked Questions</h2>
            <hr className='border-navyblue mb-6'/>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-300 pb-4">
                        <div
                            className="flex justify-between items-center cursor-pointer py-4"
                            onClick={() => toggleQuestion(index)}
                        >
                            <p className="text-lg font-medium text-gray-800">{faq.question}</p>
                            <span className="text-2xl font-bold text-gray-600">
                                {openQuestion === index ? '-' : '+'}
                            </span>
                        </div>
                        {openQuestion === index && (
                            <div className="bg-blue-100 p-4 rounded text-gray-700">
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;

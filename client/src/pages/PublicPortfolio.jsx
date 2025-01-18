import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const PublicPortfolio = () => {
    const [showcaseData, setShowcaseData] = useState(null);
    const [accomplishments, setAccomplishments] = useState([]);
    const { userEmail } = useParams();
    const [isMobile, setIsMobile] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchShowcaseData = async () => {
            try {
                const response = await fetch(`https://api.bragyourwork.com/showcase/public/${userEmail}`);
                const data = await response.json();
                setShowcaseData(data);
                fetchAccomplishments(data.achievements);
            } catch (error) {
                console.error('Error fetching showcase:', error);
            }
        };

        fetchShowcaseData();

        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/android|iphone|ipad|iPod/i.test(userAgent)) {
            setIsMobile(true);
        }
    }, [userEmail]);

    const fetchAccomplishments = async (achievementObjects) => {
        if (!achievementObjects || achievementObjects.length === 0) return;

        try {
            const accomplishmentPromises = achievementObjects.map((achievement) => {

                const id = achievement._id || achievement; // Use _id if populated, or the raw ID
                return fetch(`https://api.bragyourwork.com/accomplishments/${id}`).then((res) => res.json());
                console.log("hahahahah")
            });

            const accomplishmentsData = await Promise.all(accomplishmentPromises);
            setAccomplishments(accomplishmentsData);
        } catch (error) {
            console.error('Error fetching accomplishments:', error);
        }
    };

    const handleImageClick = (id) => {
        window.open(`https://bragyourwork.com/accomplishments/${id}`,'_blank');
    }

    // Function to generate PDF for an accomplishment
    // const generatePDF = (accomplishment) => {
    //     const doc = new jsPDF();

    //     // Add title
    //     doc.setFontSize(16);
    //     doc.text(accomplishment.title || 'No Title', 10, 10);

    //     // Add description
    //     doc.setFontSize(12);
    //     doc.text(accomplishment.description || 'No Description', 10, 20);

    //     // Save the PDF
    //     doc.save(`${accomplishment.title || 'Accomplishment'}.pdf`);
    // };

    if (!showcaseData) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    const handleCopyToClipboard = () => {
        if (showcaseData.profileInfo && showcaseData.profileInfo.contact) {
            navigator.clipboard.writeText(showcaseData.profileInfo.contact);
            alert('Phone number copied to clipboard!');
        }
    };

    return (
        <>
            <a
                href="https://bragyourwork.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 left-4 bg-gray text-black py-4 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200"
            >
                Login or create account
            </a>

            <div className="relative max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
                <div className="flex items-center space-x-8 mb-6">
                    <img
                        className="w-44 h-44 rounded-full object-cover border-4 border-navyblue"
                        src={showcaseData.profileInfo?.image || 'default-profile-image.png'} // Provide a fallback image
                        alt="Profile"
                    />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 my-2">{showcaseData.profileInfo?.name || 'Name not available'}</h1>
                        <p className="text-gray-700">UI UX designer</p>
                        <p className="text-gray-700">{userEmail}</p>

                        {isMobile ? (
                            <a
                                href={`tel:${showcaseData.profileInfo?.contact || ''}`}
                                className="flex items-center text-black text-s mt-2 bg-gray-200 p-2 border rounded-xl hover:bg-gray-300 transition duration-200"
                            >
                                <i className="fas fa-phone-alt mr-2"></i>
                                Contact: {showcaseData.profileInfo?.contact || 'Not available'}
                            </a>
                        ) : (
                            <button
                                onClick={handleCopyToClipboard}
                                className="flex items-center text-black text-s mt-2 bg-gray-200 p-2 border rounded-xl hover:bg-gray-300 transition duration-200"
                            >
                                <i className="fas fa-phone-alt mr-2"></i>
                                Contact: {showcaseData.profileInfo?.contact || 'Not available'}
                            </button>
                        )}
                    </div>
                </div>
                <div>
                    <p className="text-gray-600">{showcaseData.profileInfo?.about || 'About section not available'}</p>
                </div>

                <div className="mb-6 mt-8">
                    <h2 className="text-2xl font-semibold text-navyblue mb-2">Accomplishments</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {accomplishments.map(accomplishment => (
                            <li key={accomplishment._id} className="relative group bg-neutral-100 border border-gray-300 rounded-lg overflow-hidden list-none">
                                {/* Cover Image */}
                                {accomplishment.file && (
                                    <img
                                        src={accomplishment.file}
                                        alt="Cover Image"
                                        className="w-full h-64 object-cover cursor-pointer group-hover:opacity-75"
                                        onClick={() => handleImageClick(accomplishment._id)}
                                    />
                                )}
                                {/* Title Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                    <h3 className="text-lg font-bold text-white">{accomplishment.title}</h3>
                                </div>
                            </li>
                        ))}
                    </div>
                </div>

                <div>
                    {/* <h2 className="text-2xl font-semibold text-gray-800 mb-2">Custom Sections</h2> */}
                    {showcaseData.customSections?.length > 0 ? (
                        showcaseData.customSections.map((section) => (
                            <div key={section._id} className="bg-gray-100 p-4 rounded-lg mb-2 shadow">
                                {section.content}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No custom sections added.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default PublicPortfolio;

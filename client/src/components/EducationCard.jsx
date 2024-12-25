import React from 'react';

const EducationCard = ({ education, setProfileInfo }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            <textarea
                placeholder="Add your education details..." rows='12'
                value={education}
                onChange={(e) => setProfileInfo((prev) => ({ ...prev, education: e.target.value }))}
                className="w-full p-2 border rounded-md"
            />
        </div>
    );
};

export default EducationCard;

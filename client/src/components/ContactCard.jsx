import React from 'react';

const ContactCard = ({ phoneNumber, setProfileInfo }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl text-navyblue font-semibold mb-4">Contact Information</h2>
            <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
            <input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setProfileInfo((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                className="w-full p-2 border rounded-md"
            />
        </div>
    );
};

export default ContactCard;

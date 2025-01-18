import React, { useState, useEffect } from 'react';
import ProfileCard from '../components/ProfileCard';
import ContactCard from '../components/ContactCard';
import MyAccomplishments from '../components/MyAccomplishments';
import { useSelector } from 'react-redux';
import { selectUserEmail } from '../Redux/slices/user-slice';
import CustomSection from '../components/CustomSection';
import ShareButton from '../components/ShareButton';
import axios from 'axios';


const MyShowcase = () => {
  const userEmail = useSelector(selectUserEmail);
  const [profileInfo, setProfileInfo] = useState({
    image: '',
    name: '',
    about: '',
    contact: '', // Default empty contact
  });

  const [achievements, setAchievements] = useState([]);
  const [customSections, setCustomSections] = useState([]);

  // Fetch data from the backend when the page loads
  useEffect(() => {
    const fetchShowcaseData = async () => {
      try {
        const { data } = await axios.get(`https://api.bragyourwork.com/showcase/${userEmail}`);
        // Check if profileInfo exists in data and set defaults if not
        const fetchedProfileInfo = data.profileInfo || {
          image: '',
          name: '',
          about: '',
          contact: '', // Default empty contact if missing
        };
        setProfileInfo(fetchedProfileInfo);
        setAchievements(data.achievements || []); // Ensure achievements are fetched correctly
        setCustomSections(data.customSections || []);
      } catch (error) {
        console.error("Error fetching showcase data", error);
      }
    };

    fetchShowcaseData();
  }, [userEmail]);

  // Save changes to backend
  const handleSave = async () => {
    console.log({ profileInfo, achievements, customSections }); // Log to check data
    try {
      await axios.post(`https://api.bragyourwork.com/showcase/${userEmail}`, {
        profileInfo,
        achievements,
        customSections,
      });
      alert("Showcase saved!");
    } catch (error) {
      console.error("Error saving showcase", error);
    }
  };

  const publicShowcaseUrl = `https://api.bragyourwork.com/public/${userEmail}`;
  
  return (
    <div className="w-full sm:w-3/4 lg:w-2/3 mx-auto px-4 py-8">
      <div className="flex justify-between">
        <h1>My Showcase</h1>
        <ShareButton userEmail={userEmail} />
      </div>
      
      {profileInfo && (
        <>
          <ProfileCard profileInfo={profileInfo} setProfileInfo={setProfileInfo} />
          <ContactCard contact={profileInfo.contact || ''} setProfileInfo={setProfileInfo} />
        </>
      )}

      {/* Passing achievements to MyAccomplishments */}
      <MyAccomplishments achievements={achievements} setAchievements={setAchievements} />

      <CustomSection customSections={customSections} setCustomSections={setCustomSections} />
      <button onClick={handleSave} className="mt-6 bg-blue-500 text-white p-3 rounded-lg">Save Changes</button>
    </div>
  );
};

export default MyShowcase;

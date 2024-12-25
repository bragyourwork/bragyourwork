import { FiShare } from 'react-icons/fi';

const ShareButton = ({ userEmail }) => {
  const shareableLink = `http://localhost:5173/showcase/public/${userEmail}`;



  const handleShare = () => {
    navigator.clipboard.writeText(shareableLink);
    alert("Link copied to clipboard!");
  };
  // const publicShowcaseUrl = `http://localhost:3000/public/${userEmail}`;
  return (
    <button onClick={handleShare} className="flex border rounded-lg items-center space-x-2 p-2 bg-navyblue text-white">
      <FiShare className="text-white-500" />
      <span>Share Link</span>
    </button>
  );
};

export default ShareButton;

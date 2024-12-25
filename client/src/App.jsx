import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from './components/Navbar/Navbar';
import Login from './pages/LoginPopup/Login';
import Signup from './pages/SignUp/Signup';
import { useSelector } from 'react-redux';
import Accomplishment from './pages/Accomplishment/Accomplishment';
import AccomplishmentDetail from './components/AccomplishmentDetail';
import PublicAccomplishmentDetail from './components/PublicAccomplishmentDetail';
import MyShowcase from './pages/MyShowcase';
import PublicPortfolio from './pages/PublicPortfolio';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import { UserProvider } from './context/userContext';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <UserProvider>
      <Router>
        {/* Move useLocation inside a function to check the location */}
        <LocationHandler />
        <Routes>
          <Route exact path="/" element={<Home />} />
          {isAuthenticated ? (
            <>
              <Route path="/accomplishment" element={<Accomplishment />} />
              <Route path="/accomplishments/view/:userEmail/:id" element={<AccomplishmentDetail />} />
              <Route path="/showcase" element={<MyShowcase />} />
              <Route path="/showcase/public/:userEmail" element={<PublicPortfolio />} />
              <Route path='/about' element={<About />} />
              <Route path='/faq' element={<FAQ />} />
              <Route path='/contact' element={<Contact />} />
              <Route path="/accomplishments/:id" element={<PublicAccomplishmentDetail />} />
              <Route path='/profile' element={<ProfilePage />} />

            </>
          ) : (
            <>
              <Route path="/accomplishments/:id" element={<PublicAccomplishmentDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path='/about' element={<About />} />
              <Route path='/faq' element={<FAQ />} />
              <Route path='/contact' element={<Contact />} />
            </>
          )}
        </Routes>
      </Router>
    </UserProvider>
  );
}

const LocationHandler = () => {
  const location = useLocation();

  // Check specific routes to hide the Navbar
  const isPublicPortfolio = location.pathname.startsWith('/showcase/public/');
  const isPublicAccomplishmentDetail = location.pathname.startsWith('/accomplishments/') && location.pathname.includes('/view/') === false;

  // Do not show Navbar on PublicPortfolio or PublicAccomplishmentDetail pages
  if (isPublicPortfolio || isPublicAccomplishmentDetail) {
    return null;
  }

  return <Navbar />;
};


export default App;

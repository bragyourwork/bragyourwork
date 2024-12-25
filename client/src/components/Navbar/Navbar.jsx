import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserData } from '../../Redux/slices/user-slice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(removeUserData());
    navigate('/');
  };

  return (
    <header className="px-5 h-[80px] flex items-center justify-center bg-white shadow-md">
      <div className="flex w-full max-w-[1500px] items-center justify-between">
        {/* Logo */}
        <div className="h-[77px] w-[80px] flex justify-center items-center">
          <img src="/logo.png" alt="logo" className="w-full h-auto" />
        </div>

        {/* Hamburger Menu Icon for Mobile */}
        <GiHamburgerMenu
          className="text-2xl md:hidden cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex md:justify-center md:items-center md:gap-7">
          <Link to="/" className="font-ubuntu text-base text-black hover:underline">
            Home
          </Link>
          <Link to="/about" className="font-ubuntu text-base text-black hover:underline">
            About
          </Link>
          <Link to="/faq" className="font-ubuntu text-base text-black hover:underline">
            FAQ
          </Link>
          <Link to="/contact" className="font-ubuntu text-base text-black hover:underline">
            Contact
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/accomplishment" className="font-ubuntu text-base text-black hover:underline">
                Accomplishment
              </Link>
              <Link to="/profile">
                <button className="border border-black hover:bg-gray-800 hover:text-white px-5 py-1 rounded-lg">
                  Profile
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gray-800 text-white hover:bg-black px-5 py-1 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="border border-black hover:bg-black hover:text-white px-5 py-1 rounded-lg">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="border border-black hover:bg-black hover:text-white px-5 py-1 rounded-lg">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation Links */}
      {isMenuOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-white shadow-lg z-50 flex flex-col items-start gap-4 p-5 md:hidden">
          <Link
            to="/"
            className="font-ubuntu text-base text-black hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="font-ubuntu text-base text-black hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/faq"
            className="font-ubuntu text-base text-black hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </Link>
          <Link
            to="/contact"
            className="font-ubuntu text-base text-black hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/accomplishment"
                className="font-ubuntu text-base text-black hover:underline"
                onClick={() => setIsMenuOpen(false)}
              >
                Accomplishment
              </Link>
              <Link to="/profile">
                <button
                  className="border border-black hover:bg-gray-800 hover:text-white px-5 py-1 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </button>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="bg-gray-800 text-white hover:bg-black px-5 py-1 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button
                  className="border border-black hover:bg-black hover:text-white px-5 py-1 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button
                  className="border border-black hover:bg-black hover:text-white px-5 py-1 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;

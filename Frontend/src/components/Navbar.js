import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import logo_icon from '../assets/logo-icon.png';
import logo_text from '../assets/logo-text.png';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate("/");
  };

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="w-full bg-primary-dark text-slate-400 shadow-2xl">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center h-14 px-5">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2">
          <img className="h-6 drop-shadow-2xl" src={logo_icon} alt="Logo Icon" />
          <img className="h-6 drop-shadow-2xl" src={logo_text} alt="Logo Text" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5 text-sm">
          <Link className='hover:text-gray-300' to="/">Home</Link>
          <Link hidden={!isAuthenticated} className='hover:text-gray-300' to="/write">Write Review</Link>
          <Link hidden={!isAuthenticated} className='hover:text-gray-300' to="/userreview">Your Reviews</Link>
          <Link className="hover:text-gray-300" to="/aboutus" onClick={toggleMenu}>About Us</Link>
          <span className='text-xl text-gray-500'>|</span>
          {!isAuthenticated ? (
            <>
              <Link className='w-28 text-center border border-slate-500 rounded-md px-4 py-1 hover:border-blue-600' to="/signin">Sign In</Link>
              <Link className='w-28 text-center bg-slate-600 text-white rounded-md px-4 py-1 hover:bg-blue-800' to="/signup">Sign Up</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="w-28 text-center bg-slate-600 text-white rounded-md px-4 py-1 hover:bg-blue-800">Log Out</button>
          )}
        </nav>

        {/* Mobile Menu Icon */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMobileMenuOpen ? <X className="text-slate-300" /> : <Menu className="text-slate-300" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      
      <div className={`md:hidden bg-primary-dark border-t border-slate-600 text-sm text-slate-300 overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[500px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}`}>
        <div className="flex flex-col items-center justify-center gap-3 text-center">
            <Link className="hover:text-gray-300" to="/" onClick={toggleMenu}>Home</Link>
            {isAuthenticated && (<>
            <Link className="hover:text-gray-300" to="/write" onClick={toggleMenu}>Write Review</Link>
            <Link className="hover:text-gray-300" to="/userreview" onClick={toggleMenu}>Your Reviews</Link>
            </>
            )}
            <Link className="hover:text-gray-300" to="/aboutus" onClick={toggleMenu}>About Us</Link>
            {!isAuthenticated ? (
                <div className="flex flex-col gap-2 items-center">
                    <Link className="w-32 text-center border border-slate-500 rounded-md px-4 py-1 hover:border-blue-600" to="/signin" onClick={toggleMenu} >Sign In</Link>
                    <Link className="w-32 text-center bg-slate-600 text-white rounded-md px-4 py-1 hover:bg-blue-800" to="/signup"
                    onClick={toggleMenu}>Sign Up</Link>
                </div>) : (
                <button onClick={(e) => {handleLogout(e);toggleMenu();}} className="w-32 text-center bg-slate-600 text-white rounded-md px-4 py-1 hover:bg-blue-800">Log Out</button>)}
            </div>
        </div>    
    </header>
  );
}

export default Navbar;

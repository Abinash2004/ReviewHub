import React from 'react';
import logo_icon from '../assets/logo-icon.png';
import logo_text from '../assets/logo-text.png';

const Footer = () => {
  return (
    <div className='flex-col bg-primary-dark px-6 md:px-10 py-6'>
      <div className='max-w-[1200px] w-full mx-auto'>
        <div className='flex flex-col lg:flex-row justify-between gap-6 my-5'>
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <img className="drop-shadow-2xl h-6 md:h-8" src={logo_icon} alt="logo icon" />
            <img className="drop-shadow-2xl h-6 md:h-8" src={logo_text} alt="logo text" />
          </div>

          {/* Links Section */}
          <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex gap-2 lg:gap-5 text-slate-500 text-sm'>
            <li className='col-span-full text-slate-400 font-semibold mb-2'><h1>Contact Us</h1></li>
            <li className='hover:underline'><a href="https://www.instagram.com/abinash_parida_?igsh=bXY4NzI2Yjl6MHc5" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li className='hover:underline'><a href="https://x.com/abinash_p28" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li className='hover:underline'><a href="https://github.com/Abinash2004" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li className='hover:underline'><a href="https://discord.gg/Ksy2aVjS" target="_blank" rel="noopener noreferrer">Discord</a></li>
            <li className='hover:underline'><a href="https://www.linkedin.com/in/abinashparida28/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>

        <hr className='border-t border-slate-600' />

        {/* Footer Bottom */}
        <div className='flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-slate-400 gap-2'>
          <div className='font-semibold text-center sm:text-left'>
            Discover | Compare | Read Wisely
          </div>
          <div className='text-slate-500 text-center sm:text-right'>
            © 2024 Review Hub. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

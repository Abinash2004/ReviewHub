import React, { useContext, useState, useRef } from 'react';
import search from '../../assets/search.png';
import { Link } from 'react-router-dom';
import { SearchContext } from '../../Context/SearchContext';
import ProductCard from '../Card/ProductCard';
import ReviewCard from '../Card/ReviewCard';

const Home = () => {
  const { setSearchTerm } = useContext(SearchContext);
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const reviewRef = useRef(null);

  const handleInputChange = (e) => setLocalSearchTerm(e.target.value);
  const handleSearchClick = () => setSearchTerm(localSearchTerm);

  return (
    <section className='flex flex-col gap-6 items-center justify-center px-4 py-10 bg-secondary-dark'>
      
      {/* Search Bar */}
      <div className='w-full max-w-[1000px] p-3 bg-primary-dark flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2 rounded-lg shadow-xl'>
      <div className='flex w-full gap-2'>
        <div className='w-12 flex-shrink-0'>
          <img className='w-full bg-secondary-dark p-3 rounded-lg' src={search} alt='Search' />
        </div>
        <input 
          className='min-w-0 flex-grow p-2 text-slate-400 bg-primary-dark focus:outline-none border border-slate-800 rounded-lg placeholder-slate-600' 
          type="text" 
          placeholder='Search Your Book' 
          value={localSearchTerm}
          onChange={handleInputChange}
        />

      </div>
        <button className='w-full sm:w-20 text-slate-300 bg-secondary-dark p-2 rounded-lg' onClick={handleSearchClick}>Search</button>
      </div>
      <ProductCard reviewRef={reviewRef} /> {/* 👈 Pass the ref to ProductCard */}
      <div ref={reviewRef}>
        <ReviewCard />
      </div>

      {/* Feature Sections */}
      <div className='w-full max-w-[1000px] flex flex-col lg:flex-row gap-5'>
        
        {/* Write Review Section */}
        <div className='w-full lg:w-[40%] h-auto flex flex-col gap-3 p-5 bg-primary-dark rounded-lg shadow-xl'>
          <h2 className='text-3xl md:text-4xl text-slate-400 font-bold'>Explore All Features Now!</h2>
          <p className='text-base text-slate-500'>Why just browse reviews when you can write your own? Share your experience with us directly on the site and help others decide!</p>
          <Link className='text-lg text-slate-400 hover:underline mt-auto self-end' to="/write">Write a Review</Link>
        </div>

        {/* Why Us Section */}
        <div className='w-full lg:w-[60%] h-auto bg-primary-dark rounded-lg shadow-xl p-5 flex'>
          <div className='flex flex-col gap-5'>
            <h2 className='text-3xl md:text-4xl text-slate-400 font-bold'>Why Us?</h2>
            <p className='text-base text-slate-500'>Real readers, verified reviews ensure authenticity, while our platform lets you easily compare insights from multiple sites. Join a trusted community sharing honest feedback, all while your data remains private and secure.</p>
            <p className='text-base text-slate-400'>Unlock genuine insights! Join our trusted community and share your honest reviews today!</p>
            <Link className='text-lg text-slate-400 hover:underline mt-auto self-end' to="/aboutus">About Us</Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Home;

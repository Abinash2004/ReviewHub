import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReviewContext } from '../../Context/ReviewContext';
import { AuthContext } from '../../Context/AuthContext';

const WriteReview = () => {
  const { addReview } = useContext(ReviewContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [review, setReview] = useState({
    product: '',
    title: '',
    description: '',
    rating: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  const onChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    addReview(review.product, review.title, review.description, review.rating);
  };

  return (
    <section className='bg-secondary-dark px-4 py-10 sm:px-6 md:px-10 lg:px-20'>
      <div className='w-full max-w-4xl bg-primary-dark flex flex-col items-center gap-7 mx-auto p-6 sm:p-8 md:p-10 rounded-lg shadow-2xl'>
        
        <div className='flex flex-col gap-2 self-start w-full mb-6'>
          <h1 className='text-3xl sm:text-4xl text-slate-300 font-bold'>Book Review</h1>
          <h2 className='text-lg sm:text-xl text-slate-500 font-semibold'>Be a Part of Our Community — Leave a Review!</h2>
        </div>

        {/* Input Fields */}
        {[
          { label: 'Book Name', name: 'product', type: 'text', placeholder: 'Enter the name of your book' },
          { label: 'Review Title', name: 'title', type: 'text', placeholder: 'Enter the title for your review' },
        ].map(({ label, name, type, placeholder }) => (
          <div key={name} className='w-full flex flex-col gap-1 sm:gap-2 rounded-lg'>
            <h2 className='text-base sm:text-lg text-slate-300 font-semibold'>{label}</h2>
            <input
              className='w-full p-2 text-slate-400 bg-primary-dark border border-slate-500 rounded-lg placeholder-slate-500 shadow-xl'
              type={type}
              name={name}
              placeholder={placeholder}
              onChange={onChange}
            />
          </div>
        ))}

        <div className='w-full flex flex-col gap-1 sm:gap-2 rounded-lg'>
          <h2 className='text-base sm:text-lg text-slate-300 font-semibold'>Review Description</h2>
          <textarea
            className='w-full min-h-[200px] sm:min-h-[250px] p-2 text-slate-400 bg-primary-dark border border-slate-500 rounded-lg placeholder-slate-500 shadow-xl resize-y'
            placeholder='Write all your experience and thoughts on the book'
            name='description'
            onChange={onChange}
          />
        </div>

        <div className='w-full flex flex-col gap-1 sm:gap-2 rounded-lg'>
          <h2 className='text-base sm:text-lg text-slate-300 font-semibold'>Book Rating</h2>
          <select
            className='w-full p-2 text-slate-400 bg-primary-dark border border-slate-500 rounded-lg shadow-xl'
            name='rating'
            onChange={onChange}
            defaultValue={0}
          >
            <option value="0" disabled>Rate your product out of 5</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>

        <Link
          className="w-full sm:w-40 shadow-2xl bg-slate-600 text-white rounded-md px-4 py-2 text-center text-base font-medium hover:bg-blue-800 mt-4"
          onClick={handleClick}
        >
          Submit
        </Link>
      </div>
    </section>
  );
};

export default WriteReview;

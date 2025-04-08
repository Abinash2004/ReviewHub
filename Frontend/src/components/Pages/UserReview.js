import React, { useContext, useEffect } from 'react';
import { ReviewContext } from '../../Context/ReviewContext';

const UserReview = () => {
  const { reviews, getAllReview } = useContext(ReviewContext);

  useEffect(() => {
    getAllReview();
  }, [getAllReview]);

  return (
    <div className='bg-secondary-dark px-4 py-6 sm:px-6 md:px-10'>
      <div className='max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={index}
              className='bg-primary-dark hover:bg-black transition-colors duration-300 p-5 rounded-xl shadow-xl flex flex-col justify-between h-full'
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-300 mb-2">{review.product}</h3>
              <p className="text-slate-400 text-sm sm:text-base mb-4">{review.description}</p>
              <div className="text-right">
                <span className="text-yellow-200 font-bold text-sm sm:text-base">{review.rating}.0 / 5</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-slate-400 col-span-full">No reviews available.</div>
        )}
      </div>
    </div>
  );
};

export default UserReview;

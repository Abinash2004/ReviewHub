import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../../Context/ProductContext';

const ReviewCard = () => {
  const { productTerm } = useContext(ProductContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productTerm) return;

    const fetchReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:5000/search/review", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ bookTitle: productTerm }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();
        setReviews(data.reviews || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productTerm]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <p className='text-lg text-red-400'>Server Problem : {error} [ Please Retry ]</p>;
  }

  const displayReviews = reviews.slice(0, 15);

  const formatTitle = (title) => {
    const parts = title.split('stars');
    return parts.length > 1 ? parts[1].trim() : title;
  };

  const handleClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className='flex flex-wrap justify-center gap-5 max-w-[1000px] w-full mx-auto'>
      {displayReviews.length > 0 ? (
        displayReviews.map((review, index) => (
          <div
            key={index}
            onClick={() => handleClick(review.url)}
            className='p-3 bg-primary-dark h-auto w-full hover:bg-black rounded-lg shadow-2xl cursor-pointer transition duration-200'
          >
            <div className="flex flex-col justify-start items-center">
              <h3 className="mt-1 text-[25px] text-slate-400 self-start font-semibold">
                {formatTitle(review.title)}
              </h3>
              <h3 className="mt-4 text-l text-slate-500 self-start">{review.snippet}</h3>
            </div>
          </div>
        ))
      ) : null}
    </div>
  );
};

export default ReviewCard;

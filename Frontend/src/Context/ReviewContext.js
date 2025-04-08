import React, { createContext, useState } from 'react';

// Create the context
export const ReviewContext = createContext();

// Create the provider component
export const ReviewProvider = (props) => {

    const [reviews, setReviews] = useState("");

    const getAllReview = async () => {

        try {
            const response = await fetch("http://localhost:5000/review/fetchallreviews", {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': localStorage.getItem('token'),
                },
            });
            const json = await response.json();
            setReviews(json);
    
        } catch (error) {
            alert("Failed to connect to server.");
        }
    };

    const addReview = async (product, title, description, rating) => {
        try {
            const response = await fetch("http://localhost:5000/review/addreview", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify({ product, title, description, rating })
            });
        
            const json = await response.json();
            
            // Ensure the API returns a field like 'success'
            if (json.success) {
                alert("Successfully Review Added");
    
            } else {
                alert("Some Error Occurred");
            }
    
        } catch (error) {
            alert("Failed to connect to server.");
        }
    };
    

    return (
        <ReviewContext.Provider value={{ reviews, setReviews, addReview, getAllReview }}>
            {props.children}
        </ReviewContext.Provider>
    )
};

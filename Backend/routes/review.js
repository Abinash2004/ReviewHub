const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');


// ROUTE 1 : Get all the Reviews
router.get('/fetchallreviews', fetchUser, async (req,res)=> {
    try {
        const review = await Review.find({user: req.user.id});
        res.json(review);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(success,"Internal server error occured");
    }
})


// ROUTE 2 : Add Review
router.post('/addreview', fetchUser, [
    body('product', 'Minimum length should be 3').isLength({ min: 3 }),
    body('title', 'Minimum length should be 3').isLength({ min: 3 }),
    body('description', 'Minimum length should be 10').isLength({ min: 10 }),
    body('rating', 'Rating is required').notEmpty().isIn(["1", "2", "3", "4", "5"]),
], async (req,res)=> {

    try {
        
        const { product,title,description,rating } = req.body;
        
        let success = false;
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({success, errors: error.array() });
        } 
        
        const review = new Review({
            product,title,description,rating,user: req.user.id
        })
        const savedReview = await review.save();
        success=true;
        res.json({success,savedReview});
    } catch (error) {
        console.error(error.message);
        res.status(500).send(success,"Internal server error occured");
    }
})

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser');
var jwt = require('jsonwebtoken');

const JWT_SECRET = "CGPIT";

// ROUTE 1: create a user using : POST "/auth/signup". doesn't require auth
router.post('/signup', [
    body('name', 'Minimum length should be 3').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Minimum length should be 5').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({success, errors: error.array() });
    }
    //check is user is already exist
    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "Sorry user with this email is already exists" });
        }
        //create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success=true;

        res.json({success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send(success,"Internal server error occured");
    }
});


// ROUTE 2: Authenticate a user using : POST "/auth/signin". doesn't require auth
router.post('/signin', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({success, errors: error.array() });
    }

    const { email, password } = req.body;
    try {
        //user check
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success, error: "please try to login with correct credentials" });
        }
        //password check
        if (password != user.password) {
            return res.status(400).json({success, error: "please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send({success, error:"Internal server error occured"});
    }
});


// ROUTE 3: Get logged in user details : POST "/auth/getuser". require auth
router.post('/getuser', fetchUser , async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user); 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
});
module.exports = router;
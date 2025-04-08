var jwt = require('jsonwebtoken');
const JWT_SECRET = "CGPIT";

const fetchUser = (req,res,next) => {
    //get the user from the jwt token and add the id to req ovject
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send({error: "please authenticate using valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: "please authenticate using valid token"})
    }
}
module.exports = fetchUser;
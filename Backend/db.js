const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://abinashparida2021:Nirakara28@reviewhub-cluster.7s4zsap.mongodb.net/?retryWrites=true&w=majority&appName=ReviewHub-Cluster";
const connectToMongo = () => {
    mongoose.connect(mongoURI).then(() => {
        console.log("✅ Connected to MongoDB Atlas Successfully");
    }).catch((err) => {
        console.error("❌ Error connecting to MongoDB Atlas:", err);
    });
};
module.exports = connectToMongo;
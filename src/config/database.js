const mongoose = require('mongoose');
const uri = "mongodb+srv://astomar80dee:9lB9q6EzlFTrrYkB@cluster0.xyrj5.mongodb.net/find-dev";
const connectDb = async ()=>{
    try {
        await mongoose.connect(uri);
        console.log('Database connected');
    } catch (error) {
        console.error('Error connecting to database', error);
        throw error;
    }
};

module.exports = connectDb;
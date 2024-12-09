const express = require('express');
const connectDb = require('./config/database');
const app = express();

const user = require('./models/user');

connectDb().then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch((err) => {
    console.log('Error connecting to database', err);
});

app.post('/signup',async(req,res) =>{
    const obj = new user(
        {
            firstName:'John',
            lastName:'Doe',
            email:'john.doe@gmail.com',
            passsword:'password'
        }
    )
    await obj.save();
    res.send('User created');
})


// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
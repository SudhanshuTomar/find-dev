const express = require('express');
const connectDb = require('./config/database');
const app = express();

const user = require('./models/user');
app.use(express.json());

connectDb().then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch((err) => {
    console.log('Error connecting to database', err);
});

app.post('/signup',async(req,res) =>{
    const userdata = req.body;
    // const obj = new user(
    //     {
    //         "firstName": "John",
        // "lastName": "Doe",
        // "email": "john.doe@gmail.com",
    //         "passsword":"password"
    //     }
    // )
    console.log(userdata);
    const obj = new user(userdata);
    await obj.save();
    res.send('User created');
});

app.get('/getAllUser',async(req,res) =>{
    const userreq = req.body;
    const user1 = await user.find({});
    console.log(user1);
    res.send(user1);
})
app.get('/getUserByEmail',async(req,res) =>{
    const userreq = req.body;
    const user1 = await user.find(userreq);
    console.log(user1);
    res.send(user1);
})
app.delete('/deleteUserByEmail',async(req,res) =>{
    const userreq = req.body;
    const user1 = await user.findOneAndDelete(userreq);
    console.log(user1);
    res.send(user1);
})
app.patch('/updateUserByEmail',async(req,res) =>{
    const {email,name} = req.body;
    const allowedUpdates = ['firstName','lastName'];
    
    try{
        const updates = Object.keys(req.body);
        console.log(updates);
        if(!updates.every((update) => allowedUpdates.includes(update))){
            return res.status(400).send({error:'Invalid updates'});
        }
        const user1 = await user.findOneAndUpdate({email:email},{firstName:name},
            {
            returnDocument:'after',
            runValidators:true
        });
        console.log(user1);
        res.send(user1);
    }
    catch(e){
        console.log(e);
        res.send("some error occured" + e);
    }
    
});

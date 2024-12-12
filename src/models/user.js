const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        min:3,
        max:20,
    },
    lastName:{
        type:String,
        lowercase:true,
        trim:true,
        max:20,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,

    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        validate(value){
            if(!['male','female','others'].includes(value)){
                throw new Error('Invalid value');
            }
        },
    },
},
{timestamps:true}
);
const user = mongoose.model('User', userSchema);

module.exports = user;
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const schema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
}, email:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error('Email is invalid');
        }
    }
}, password: {
    type: String,  
    required: true,
    trim: true,
    validate(value){
        if(value.length < 6){
            throw new Error('Password must be at least 6 characters');
        }
    }
},age:{
    type: Number,
    required: true,
    validate(value){
        if(value < 0){
            throw new Error('Age must be a positive number');
        }
    }
},tokens:[{
    token:{
        type: String, 
        required: true
    }

}],
} );
schema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}
schema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'shehzaib',{expiresIn:'7 days'});

    user.tokens = user.tokens.concat({token});
    await user.save(); 
    return token;

}
schema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('Unable to login');
    }
    return user;
}


schema.pre("save",async function(next){
    const user = this;
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,8);
    }
next()
})

const User = mongoose.model('UsersAuth', schema);


module.exports = User;
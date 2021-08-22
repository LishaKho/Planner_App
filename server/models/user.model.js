const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new mongoose.Schema({

    username:{
        type: String,
        required: [true, 'username is required']
    },

    firstName:{
        type: String,
        required: [true, 'First name is required']
    },

    lastName:{
        type: String,
        required: [true, 'Last name is required']
    },

    email:{
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },

    password:{
        type: String,
        required: [true, 'password is required']
    }

}, {timestamps: true});

UserSchema.virtual('confirmPassword')
    .get(()=> this._confirmPassword)
    .set((value) => this._confirmPassword = value);

UserSchema.pre('validate', function(next){
    console.log('inside pre-validate');
    console.log(this.confirmPassword);
    if(this.password !== this.confirmPassword){
        console
        this.invalidate('confirmPassword', 'Passwords must match!')
    }

    next();
});

UserSchema.pre('save', function (next){

    console.log('inside pre-save');

    bcrypt.hash(this.password, 10)
        .then((hashedPassword)=>{

            this.password = hashedPassword;
            next();
        })
});

UserSchema.plugin(uniqueValidator, {message: 'Error user already exist'})

module.exports = mongoose.model('User', UserSchema);
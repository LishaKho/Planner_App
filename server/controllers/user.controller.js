const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports ={

    register: (request, response)=>{
        console.log('in register');
        console.log(request.body)

        const user = new User(request.body);

        user.save()
            .then((newUser)=>{
                console.log('successfully registered');
                console.log('newUser');
                response.json({
                    message: 'Successfully Registered',
                    user: newUser
                })
            })
            .catch((error)=>{
                console.log("register Not successful")
                response.status(400).json(error);
            });
    },

    login: (request, response) =>{

        User.findOne({username: request.body.username})

            .then((userRecord)=> {
                if(userRecord === null){
                    response.status(400).json({message: 'user not found'});

                } else {
                    bcrypt.compare(request.body.password, userRecord.password)
                        .then((isPasswordValid)=>{

                            if(isPasswordValid){
                                console.log('password is valid')
                                console.log(userRecord);
                                console.log(process.env.JWT_Secret);
                                response.cookie('userToken',
                                    jwt.sign({
                                        user_id: userRecord.id,
                                        username: userRecord.username
                                    },
                                        process.env.JWT_Secret),
                                    {
                                        httpOnly: true,
                                        expires: new Date(Date.now() + 90000000)
                                    })
                                    .json({
                                        message: 'Successfully logged in',
                                        userLoggedIn: userRecord.username
                                    })
                            } else {
                                response.status(400).json({message: "Invalid Login Attempt"});
                            }
                        })
                        .catch((error)=>{
                            console.log('error with compare passwords')
                            response.status(400).json({message: "invalid Login Attempt"});
                        })
                }
            })
            .catch((error)=>{
                console.log(request.body.username)
                console.log(request.body.password)
                console.log('error with find one');
                response.status(400).json({message: 'invalid Login Attempt'});
            })
    },

    logout: (request, response) =>{
        console.log('logging out!');
        response.clearCookie('userToken');
        response.json({
            message: 'You have successfully logged out',
        })
    }
}
const jwt = require('jsonwebtoken');

module.exports ={

    authenticate(request, response, next){
        jwt.verify(request.cookies.userToken,
            process.env.JWT_Secret,
            (error, payload) =>{
                if(error){
                    response.status(401).json({verified: false});
                } else {
                    console.log('all good to proceed');
                    next();
                }
            })
    }
}

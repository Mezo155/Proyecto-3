const jwt = require("jsonwebtoken")
const createError = require("http-errors")

module.exports.isAuthenticated = (req, res, next) => {
    const authorization = req.header("Authorization");

    if(!authorization){
        return next(createError(401, "Authorization header was not provided"));
    }
    const [schema, token] = authorization.split(" ");

    if(schema !== "Bearer"){
        return next(createError(401, "Authorization schema is not supported"));
    }

    if(!token){
        return next(createError(401, "A token must be provided"));
    }

    const secret = process.env.JWT_SECRET || "test"

    jwt.verify (token, secret, (err, decodedToken) =>{
        if(err){
            if (err instanceof jwt.TokenExpiredError) {
                return next(createError(401, 'Token expired'))
            } else {
                return next(err);
            }
        }
        req.currentUserId = decodedToken.id;
        next()
    })
}
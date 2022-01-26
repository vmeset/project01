require('dotenv').config()

const ApiError = require('../error/ApiError')

const jwt = require('jsonwebtoken')

const secret = process.env.SECRET_KEY

module.exports = function(roles) {
    return function(req, res, next) {
        if(req.method === "OPTIONS") {
            next()
        }
    
        try {
            const token = req.headers.authorization.split(' ')[1] 
            if(!token) {
                return res.status(403).json({message: "Пользователь не авторизован"})
                // return next(ApiError.forbidden('Пользователь не авторизован'))
            }
            const {roles: userRoles} = jwt.verify(token, secret)
            let hasRole = false
            userRoles.forEach(role => {
                if(roles.includes(role)) {
                    hasRole = true
                }
            })
            if(!hasRole) {
                return res.status(403).json({message: 'access denied'})
            }
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "Пользователь не авторизован"})
            // return next(ApiError.forbidden('Пользователь не авторизован'))
        }
    }
}
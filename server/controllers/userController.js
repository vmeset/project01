require('dotenv').config()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const ApiError = require("../error/ApiError")

const userModel = require('../models/userModel')
const roleModel = require('../models/roleModel')

const {validationResult} = require('express-validator')

const secret = process.env.SECRET_KEY

const generateAccessToken = (id, username, roles) => {
    const payload = {
        id,
        username,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest(errors))
            }
            const {username, password, role} = req.body
            const candidate = await userModel.findOne({username})
            if(candidate) {
                return next(ApiError.badRequest('Пользователь с таким именем уже существует'))
            }
            const hashPassword = bcrypt.hashSync(password, 5)
            const userRole = await roleModel.findOne({value: "USER"})
            const newUser = new userModel({username, password: hashPassword, roles: [userRole.value]})
            await newUser.save()
            return res.json(`Пользователь ${username} успешно зареган`)
        } catch (e) {
            next(ApiError.badRequest(e))
        }
    }

    async login(req, res, next) {
        try {
            const {username, password} = req.body
            const user = await userModel.findOne({username})
            if(!user) {
                return next(ApiError.badRequest('такого пользователя не существует'))
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return next(ApiError.badRequest('неверный пароль'))
            }
            const token = generateAccessToken(user._id, user.username, user.roles)
            return res.json({token})
        } catch (e) {
            next(ApiError.badRequest(e))
        }
    }

    async check(req, res, next) {
        const token = generateAccessToken(req.user._id, req.user.username, req.user.roles)
        return res.json({token})
    }

    async delete(req, res, next) {
        try {
            const username = req.body
            const candidate = await userModel.findByIdAndDelete(username)
            return res.json({candidate})
        } catch(e) {
            next(ApiError.badRequest(e))
        }
    }
}

module.exports = new UserController()
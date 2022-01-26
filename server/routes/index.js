const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const noteRouter = require('./noteRouter')
const buyRouter = require('./buyRouter')

const authMiddleware = require('../middleware/authMiddleware')

router.use('/user', userRouter)
router.use('/buy', authMiddleware, buyRouter)
router.use('/note', noteRouter)

module.exports = router
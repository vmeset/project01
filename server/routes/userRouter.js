const Router = require('express')
const userController = require('../controllers/userController')
const router = new Router()
const {check} = require('express-validator')
const roleMiddleware = require('../middleware/roleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/login', userController.login)
router.post('/registration', [
    check('username', 'Добавь имя').notEmpty(),
    check('password', 'не меньше четырех символов').isLength({min: 4})
],  roleMiddleware(['ADMIN']), userController.registration)
router.get('/check', authMiddleware, userController.check)
router.delete('/delete', roleMiddleware(['ADMIN']), userController.delete)

module.exports = router
const Router = require('express')
const userController = require('../controllers/userController')
const router = new Router()
const {check} = require('express-validator')
// const roleMiddleware = require('../middleware/roleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/login', userController.login)
router.post('/registration', [
    check('username', 'Добавь имя').notEmpty(),
    check('password', 'не меньше четырех символов').isLength({min: 4})
], userController.registration)
router.get('/check', authMiddleware, userController.check)
router.get('/fetch', userController.getAll)
router.put('/update', userController.updateRole)
router.delete('/:id', userController.delete)
// roleMiddleware(['ADMIN'])

module.exports = router
const Router = require('express')
const noteController = require('../controllers/noteController')
const router = new Router()


router.post('/create', noteController.create)
router.get('/list', noteController.getAll)
router.get('/:id', noteController.getOne)
router.delete('/:id', noteController.delete)
router.put('/update', noteController.update)

module.exports = router
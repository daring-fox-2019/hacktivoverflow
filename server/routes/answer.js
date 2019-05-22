const router = require('express').Router();
const answer = require('../controller/answer')
const { multer, sendUploadToGCS, fromBase64toFile } = require('../helpers/image-utility')
const { authorizeOnAnswer } = require('../middlewares')

// router.get('/', answer.Get)
router.post('/', answer.Post)

router.use(authorizeOnAnswer)
router.patch('/:id', answer.Patch)
router.delete('/:id', answer.Delete)


module.exports = router
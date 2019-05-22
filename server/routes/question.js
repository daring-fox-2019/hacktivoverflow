const router = require('express').Router();
const question = require('../controller/question')
const { multer, sendUploadToGCS, fromBase64toFile } = require('../helpers/image-utility')


router.post('/',question.Post)
router.patch('/:id',  question.Patch)
router.delete('/:id', question.Delete)


module.exports = router
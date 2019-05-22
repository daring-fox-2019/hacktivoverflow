const router = require('express').Router();
const comment = require('../controller/comment')
const { multer, sendUploadToGCS, fromBase64toFile } = require('../helpers/image-utility')


router.post('/',comment.Post)
router.patch('/:id',  comment.Patch)
router.delete('/:id', comment.Delete)


module.exports = router
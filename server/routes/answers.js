const express = require('express');
const routes = express.Router();
const AnswerController = require('../controllers/AnswerController')
const Authentication = require('../middlewares/authenticate')

routes.get('/', AnswerController.findAll)
routes.get('/:questionId', Authentication, AnswerController.findBelongs)
routes.post('/:questionId', Authentication, AnswerController.create)
routes.get('/:id', AnswerController.findOne)
routes.patch("/:id", Authentication, AnswerController.update);
routes.patch("/vote/:answerId/:voteType", Authentication, AnswerController.updateVote);
routes.delete('/:id', AnswerController.delete)

module.exports = routes
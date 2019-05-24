const express = require('express');
const routes = express.Router();
const QuestionController = require('../controllers/QuestionController')
const Authentication = require('../middlewares/authenticate')

routes.get('/', QuestionController.findAll)
routes.get('/user', Authentication, QuestionController.findBelongs)
routes.get('/:id', QuestionController.findOne)
routes.patch("/:id", Authentication, QuestionController.update);
routes.post('/ask', Authentication, QuestionController.create)
routes.patch("/vote/:questionId/:voteType", Authentication, QuestionController.updateVote);
routes.delete('/:id', QuestionController.delete)

module.exports = routes
const chai = require('chai')
const chaiHttp = require('chai-http')
const dirtyChai = require('dirty-chai')

const app = require('../app')
const { Answer } = require('./helpers/models')
const { createUser, createQuestion } = require('./helpers/db')
const { createToken } = require('./helpers/auth')

const expect = chai.expect

chai.use(chaiHttp)
chai.use(dirtyChai)

describe('Answers Tests', function () {
  before(function (done) {
    createUser()
      .then((user) => {
        this.user = user
        this.user.token = createToken(user)
        return createQuestion(user)
      })
      .then((question) => {
        this.question = question
        done()
      })
      .catch(done)
  })
  after

  describe('POST /questions/:question_id/answers', function () {
    let createdAnswer = new Answer()

    it('should send 201 status code', function (done) {
      chai
        .request(app)
        .post(`/questions/${this.question.id}/answers`)
        .set('Authorization', this.user.token)
        .send(createdAnswer)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).status(201)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('answer')

          let { answer } = body
          expect(answer).to.be.an('object')
          expect(answer).to.have.property('_id')
          expect(answer).to.have.property('description')
          expect(answer).to.have.property('upvotes')
          expect(answer).to.have.property('downvotes')
          expect(answer).to.have.property('author')

          done()
        })
    })
  })
})

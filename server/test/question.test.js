const chai = require('chai')
const chaiHttp = require('chai-http')
const dirtyChai = require('dirty-chai')

const app = require('../app')
const { Question } = require('./helpers/models')
const { createToken } = require('./helpers/auth')
const { clearDb, createQuestion, createUser } = require('./helpers/db')

const expect = chai.expect

chai.use(chaiHttp)
chai.use(dirtyChai)

describe('Questions Tests', function () {
  before(function (done) {
    createUser()
      .then(user => {
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
  after(clearDb('User', 'Question', 'Answer'))

  describe('GET /questions', function () {
    it('should send 200 status code', function (done) {
      chai
        .request(app)
        .get('/questions')
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(200)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('questions')
          expect(body.questions).to.be.an('array')

          done()
        })
    })
  })

  describe('GET /questions/:question_id', function () {
    it('should send 200 status code', function (done) {
      chai
        .request(app)
        .get(`/questions/${this.question._id}`)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(200)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('question')

          let { question } = body
          expect(question).to.be.an('object')
          expect(question).to.have.property('_id')
          expect(question).to.have.property('title')
          expect(question).to.have.property('description')
          expect(question).to.have.property('answers')
          expect(question).to.have.property('tags')
          expect(question).to.have.property('upvotes')
          expect(question).to.have.property('downvotes')
          expect(question).to.have.property('author')

          done()
        })
    })
  })

  describe('POST /questions', function () {
    let createdQuestion = new Question()

    it('should send 201 status code', function (done) {
      chai
        .request(app)
        .post('/questions')
        .set('Authorization', this.user.token)
        .send(createdQuestion)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(201)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('question')

          let { question } = body
          expect(question).to.be.an('object')
          expect(question).to.have.property('_id')
          expect(question).to.have.property('title')
          expect(question).to.have.property('description')
          expect(question).to.have.property('answers')
          expect(question).to.have.property('tags')
          expect(question).to.have.property('upvotes')
          expect(question).to.have.property('downvotes')
          expect(question).to.have.property('author')

          done()
        })
    })
  })
})

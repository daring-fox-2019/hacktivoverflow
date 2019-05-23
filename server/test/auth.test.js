const chai = require('chai')
const chaiHttp = require('chai-http')
const dirtyChai = require('dirty-chai')

const app = require('../app')
const { User } = require('./helpers/models')
const { clearDb, createUser } = require('./helpers/db')
const { verifyToken } = require('./helpers/auth')

chai.use(chaiHttp)
chai.use(dirtyChai)

const expect = chai.expect

describe('Auth Tests', function () {
  before(function (done) {
    createUser()
      .then((user) => {
        this.user = user
        done()
      })
      .catch(done)
  })
  after(clearDb('User'))

  describe('POST /auth/register', function () {
    let createdUser = new User()

    it('should send 201 status code', function (done) {
      chai
        .request(app)
        .post('/auth/register')
        .send(createdUser)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(201)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('user')

          let { user } = body
          expect(user).to.have.property('email')
          expect(user.email).to.be.equal(createdUser.email)

          done()
        })
    })
  })

  describe('POST /auth/login', function () {
    it('should send 200 status code', function (done) {
      chai
        .request(app)
        .post('/auth/login')
        .send({
          email: this.user.email,
          password: this.user.rawPassword
        })
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(200)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('user')
          expect(body).to.have.property('jwtToken')

          let { user } = body
          expect(user).to.be.an('object')
          expect(user).to.have.property('_id')
          expect(user).to.have.property('email')
          expect(user.email).to.be.equal(this.user.email)

          let { jwtToken } = body
          expect(() => verifyToken(jwtToken)).to.not.throw()

          done()
        })
    })
  })
})

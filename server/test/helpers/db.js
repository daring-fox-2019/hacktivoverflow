const models = require('../../models')
const FakeUser = require('./models').User
const FakeQuestion = require('./models').Question

const clearDb = (...modelNames) => done => {
  Promise.all(
    modelNames.map(modelName => models[modelName].deleteMany({}))
  )
    .then(() => done())
    .catch(done)
}

const createUser = () => {
  let user = new FakeUser()
  let rawPassword = user.password

  return models.User
    .create({
      email: user.email,
      password: user.password
    })
    .then((user) => {
      user.rawPassword = rawPassword
      return user
    })
}

const createQuestion = (author) => {
  let question = new FakeQuestion()
  question.author = author._id
  return models.Question.create(question)
}

module.exports = {
  clearDb,
  createUser,
  createQuestion
}

const faker = require('faker')

const User = function () {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

const Question = function () {
  return {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph()
  }
}

const Answer = function () {
  return {
    description: faker.lorem.paragraph()
  }
}

module.exports = {
  User,
  Question,
  Answer
}

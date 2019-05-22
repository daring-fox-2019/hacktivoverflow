# Hackover

Hackover or Hacktiv Overflow is a simple version of stack overflow. made for education purposes only, by Dion Michael in 2019

## Endpoints

```
javascript

GET /questions # get all question
POST /questions # create a new question
GET /questions/:questionId # get one question
PUT /questions/:questionId # edit a question
PUT /questions/:questionId/upvote # upvote a question
PUT /questions/:questionId/downvote # downvote a question
PUT /questions/:questionId/solve # mark a question as solved
PUT /questions/:questionId/unsolve # mark a question as unsolved
GET /questions/:questionId/answers # get all answers from a question
POST /questions/:questionId/answers # answer a question
GET /questions/:questionId/answers/:answerId # get one answer
PUT /questions/:questionId/answers/:answerId # update an answer
PUT /questions/:questionId/answers/:answerId/upvote # upvote an answer
PUT /questions/:questionId/answers/:answerId/downvote # downvote an answer
DELETE /questions/:questionId # delete a question
DELETE /questions/:questionId/answers/:answerId # delete an answer

GET /users # get logged user detail
GET /users/questions # get all questions associated with a user

POST /signin # sign in a user
POST /register # register a user
POST /upload # upload an image


```

## Features
### mark solved/unsolved

so user can know whether a question already has a solution

### SPA
crazy fast

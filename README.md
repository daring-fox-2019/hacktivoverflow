## Usage
```javascript
$ npm install
$ node app.js

```
Access server via `http://54.169.48.136`<br>
Access client via `http://localhost:8080`
##  User Routes
|Routes|HTTP|Header(s)|Body|Response|Description|
|:--:|:--:|:--:|:--:|:--:|:--:|
|/users/signUp  |POST  |none|name : String (**required**); email: String (**required**),  password: String (**required**)|**Success**: Register a user, **Error**: Internal server error (Validation)|Register a user|
|/users/signIn  |POST  |none|email: String (**required**), password: String (**required**) |**Success**: Login as a user, **Error**: Internal server error (Validation)|Login as a user|

## Question Routes
|Routes|HTTP|Header(s)|Body|Response|Description|
|:--:|:--:|:--:|:--:|:--:|:--:|
|/questions  |GET  |token|none|**Success**: Get all questions, **Error**: Internal server error (Validation)|Get all questions|
|/questions/myList  |GET  |token|none|**Success**: Get logged in user's questions, **Error**: Internal server error (Validation)|Get logged in user's questions|
|/questions/:questionId  |GET  |token|none|**Success**: Get a logged in user's question, **Error**: Internal server error (Validation)|Get logged in user's question|
|/questions/:questionId/upvote  |PUT  |token|none|**Success**: Upvote a question, **Error**: Internal server error (Validation)|Upvote a question|
|/questions/:questionId/downvote  |PUT  |token|none|**Success**: Downvote a question, **Error**: Internal server error (Validation)|Downvote a question|
|/questions/:id  |PATCH  |token|none|**Success**: UPDATE a question, **Error**: Internal server error (Validation)|update a question|
|/questions/preferred-discussions  |GET  |token|none|**Success**: get a users watched tags, **Error**: Internal server error (Validation)|show a users watched tags|


## Answer Routes
|Routes|HTTP|Header(s)|Body|Response|Description|
|:--:|:--:|:--:|:--:|:--:|:--:|
|/answers/myAnswers  |GET  |token|none|**Success**: Get logged in user's questions, **Error**: Internal server error (Validation)|Get logged in user's questions|
|/answers/:QuestionId  |GET  |token|none|**Success**: Get logged in user's answer to a question, **Error**: Internal server error (Validation)|Get logged in user's answer to a question|
|/answers/detail/:answerId  |GET  |token|none|**Success**: Get logged in user's answer, **Error**: Internal server error (Validation)|Get logged in user's answer|
|/answers  |POST  |token|answer: String (**required**), QuestionId: String (**required**)|**Success**: Create an answer to a question, **Error**: Internal server error (Validation)|Create an answer to a question|
|/answers/:answerId/upvote  |PUT  |token|none|**Success**: Upvote an answer, **Error**: Internal server error (Validation)|Upvote an answer|
|/answers/:answerId/downvote  |PUT  |token|none|**Success**: Downvote an answer, **Error**: Internal server error (Validation)|Downvote an answer|
|/answers/answerId  |PUT  |token|none|**Success**: Update logged in user's answer, **Error**: Internal server error (Validation)|Update logged in user's answer|
|/answers/:AnswerId  |DELETE  |token|none|**Success**: Delete logged in user's answer, **Error**: Internal server error (Validation)|Delete logged in user's answer|

## Tag Routes
|Routes|HTTP|Header(s)|Body|Response|Description|
|:--:|:--:|:--:|:--:|:--:|:--:|
|/tags  |GET  |token|none|**Success**: get tags list available, **Error**: Internal server error (Validation)|Show tags list|
|/tags/  |POST  |token|none|**Success**: Create tag, **Error**: Internal server error (Validation)|Show created tag|

## API Routes
|Routes|HTTP|Header(s)|Body|Response|Description|
|:--:|:--:|:--:|:--:|:--:|:--:|
|/API/news  |GET  |token|none|**Success**: get news list from 3rd API, **Error**: Internal server error (Validation)|Show news list|
|/API/:jobs  |GET  |token|none|**Success**: Get jobs list from 3rd API, **Error**: Internal server error (Validation)|Show jobs list|

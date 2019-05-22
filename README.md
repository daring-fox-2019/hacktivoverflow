#hacktivoverflow
server `http://localhost:3000`
client `http://localhost:8080`

##  User Routes
|Routes|HTTP|Header(s)|Body|Response|Description|
|:--:|:--:|:--:|:--:|:--:|:--:|
|/users/signUp  |POST  |none|first_name: String(**required**), last_name: String (**required**), email: String (**required**),  password: String (**required**)|**Success**: Register a user, **Error**: Internal server error (Validation)|Register a user|
|/users/signIn  |POST  |none|email: String (**required**), password: String (**required**) |**Success**: Login as a user, **Error**: Internal server error (Validation)|Login as a user|

## Question Routes
|Routes|HTTP|Header(s)|Body|Response|Description|
|:--:|:--:|:--:|:--:|:--:|:--:|
|/questions  |POST  |token|title: String (**required**), description: String (**required**), UserId: String (**required**) |**Success**: Publish a question, **Error**: Internal server error (Validation)|Publish a question|
|/questions  |GET  |token|none|**Success**: Get all questions, **Error**: Internal server error (Validation)|Get all questions|
|/questions/myQuestions  |GET  |token|none|**Success**: Get logged in user's questions, **Error**: Internal server error (Validation)|Get logged in user's questions|
|/questions/:QuestionId  |GET  |token|none|**Success**: Get a logged in user's question, **Error**: Internal server error (Validation)|Get logged in user's question|
|/questions/upvote/:QuestionId  |PATCH  |token|none|**Success**: Upvote a question, **Error**: Internal server error (Validation)|Upvote a question|
|/questions/downvote/:QuestionId  |PATCH  |token|none|**Success**: Downvote a question, **Error**: Internal server error (Validation)|Downvote a question|
|/questions/:QuestionId  |PATCH  |token|none|**Success**: Update logged in user's question, **Error**: Internal server error (Validation)|Update logged in user's question|
|/questions/:QuestionId  |DELETE  |token|none|**Success**: Delete logged in user's question, **Error**: Internal server error (Validation)|Delete logged in user's question|

## Answer Routes
|Routes|HTTP|Header(s)|Body|Response|Description|
|:--:|:--:|:--:|:--:|:--:|:--:|
|/answers/myAnswers  |GET  |token|none|**Success**: Get logged in user's questions, **Error**: Internal server error (Validation)|Get logged in user's questions|
|/answers/:QuestionId  |GET  |token|none|**Success**: Get logged in user's answer to a question, **Error**: Internal server error (Validation)|Get logged in user's answer to a question|
|/answers/:AnswerId  |GET  |token|none|**Success**: Get logged in user's answer, **Error**: Internal server error (Validation)|Get logged in user's answer|
|/answers  |POST  |token|answer: String (**required**), QuestionId: String (**required**)|**Success**: Create an answer to a question, **Error**: Internal server error (Validation)|Create an answer to a question|
|/answers/upvote/:AnswerId  |PATCH  |token|none|**Success**: Upvote an answer, **Error**: Internal server error (Validation)|Upvote an answer|
|/answers/downvote/:AnswerId  |PATCH  |token|none|**Success**: Downvote an answer, **Error**: Internal server error (Validation)|Downvote an answer|
|/answers/:AnswerId  |PATCH  |token|none|**Success**: Update logged in user's answer, **Error**: Internal server error (Validation)|Update logged in user's answer|
|/answers/:AnswerId  |DELETE  |token|none|**Success**: Delete logged in user's answer, **Error**: Internal server error (Validation)|Delete logged in user's answer|
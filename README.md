# hacktivoverflow

## URLs

Client URL : `http://localhost:8080`<br>
Server URL : `http://localhost:3000`

## Usage

Make sure you have Node.js and nom in your computer and then run `npm install`.

In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after you sign in successfully.

Run `nodemon app.js` to start the server.

Run `npm run serve` to start the client

## Routes on Answers

| Route                           | HTTP      | Headers(s)                                      | Body                                                         | Description                            | Response Success                                             | Response Error                              |
| ------------------------------- | --------- | ----------------------------------------------- | ------------------------------------------------------------ | -------------------------------------- | ------------------------------------------------------------ | ------------------------------------------- |
| `/answers/question/:questionId` | **GET**   | None                                            | none                                                         | Get answer based on specified question | Show all the answers list in `array of object` :<br> [{ _id: ObjectId, title: String, description: String,upVotes: [ObjectId],createdAt:DatedownVotes: [ObjectId],questionId:ObjectId,userId:ObjectId}] with status code 200 | Status 400                                  |
| `/answers/:answerId`            | **POST**  | None                                            | title: String(**Required**),<br>description: String(**Required**),<br>upVotes: ObjectId(**Default:[]**),<br>downVotes: ObjectId(**Default:[]**),<br>questionId: ObjectId(**Required**),<br>userId: ObjectId(**Required**) | Create a new answer                    | Show the created answer in `object` : { _id: ObjectId, title: String, description: String, upVotes: [ObjectId], createdAt:Date downVotes: [ObjectId],questionId:ObjectId, userId:ObjectId} with status code 201 | Status 400                                  |
| `/answers/:answerId`            | **PATCH** | An Authenticated JWT Token, Authorization Token | title: String,<br> description: String,<br>upvotes: [ObjectId],<br>downvotes: [ObjectId],<br>questionId: ObjectId,<br>userId: ObjectId | Update an answer's information         | Show the updated answer's information in `object` : { _id: ObjectId, title: String, description: String,upvotes: [ObjectId],downvotes: [ObjectId],userId:ObjectId} with status code 200 | Status code: 400                            |
| `/answers/upvote/:answerId`     | **PATCH** | An Authenticated JWT Token                      | userId: ObjectId                                             | Update an answer's upvote              | Show the updated answer's information in `object` : { _id: ObjectId, title: String, description: String,upVotes: [ObjectId],downVotes: [ObjectId],userId:ObjectId} with status code 200 | Status code: 500 or 409, Error info in JSON |
| `/answers/downvote/:answerId`   | **PUT**   | An Authenticated JWT Token                      | userId: ObjectId                                             | Update an answer's downvote            | Show the updated answer's information in `object` : { _id: ObjectId, title: String, description: String,upvotes: [ObjectId],downvotes: [ObjectId],userId:ObjectId} with status code 200 | Status code: 500 or 409, Error info in JSON |
| `/answers/edit/:answerId`       | **PATCH** | An Authenticated JWT Token, Authorization token | {title: String,<br/>description: String, upVotes: ObjectId(**Default:[]**), downVotes: ObjectId(**Default:[]**), userId: ObjectId(**Required**)} | Edit an answer     | Show the updated answer's information in `object` : { _id: ObjectId,
 title: String, description: String, upvotes: [ObjectId], downvotes: [ObjectId], userId:ObjectId} with status code 200 |        |



## Routes on Questions



| Route                             | HTTP       | Headers(s)                                                 | Body                                                         | Description                     | Response Success                                             | Response Error                              |
| --------------------------------- | ---------- | ---------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------- | ------------------------------------------------------------ | ------------------------------------------- |
| `/questions`                      | **GET**    | none                                                       | none                                                         | Get all users questions         | Show all the questions in `array of object` : [{ _id: ObjectId, title: String, description: String,upVotes: [ObjectId], createdAt:Date, downVotes: [ObjectId],userId:ObjectId}...] with status code 200 | Status code: 400                            |
| `/questions`                      | **POST**   | Authenticated JWT Token                                    | {title: String(**Required**),<br>description: String(**Required**),<br>upvotes: ObjectId(**Default:[]**),<br>downvotes: ObjectId(**Default:[]**),<br>userId: ObjectId(**Required**)} | Create new question             | Show the created question in `object` : { _id: ObjectId, title: String, description: String,upVotes: [ObjectId], createdAt:Date, downVotes: [ObjectId],userId:ObjectId}
 with status code 201 | Status code 400                             |
| `/questions/:questionId`          | **GET**    | None                                                       | none                                                         | Get a single question           | Show the question's info in `object` : { _id: ObjectId, title: String, description: String,upvotes: [ObjectId],downvotes: [ObjectId],userId:ObjectId} with status code 200 | Status 400                                  |
| `/questions/edit/:questionId`     | **PATCH**  | An Authenticated JWT Token, An Authorization User Token    | {title: String,<br/>description: String, upVotes: ObjectId(**Default:[]**), downVotes: ObjectId(**Default:[]**), userId: ObjectId(**Required**)} | Update a question's information | Show the updated question's information in `object` : { _id: ObjectId, title: String, description: String,upvotes: [ObjectId],downvotes: [ObjectId],createdAt:Date,userId:ObjectId} with status code 200 | Status code 400                             |
| `/questions/upvote/:questionId`   | **PATCH**  | An Authenticated JWT Token                                 | userId: ObjectId                                             | Update a question's upvote      | Show the updated question's information in `object` : { _id: ObjectId, title: String, description: String,upVotes: [ObjectId],downVotes: [ObjectId],createdAt:Date,userId:ObjectId} with status code 200 | Status code 400                             |
| `/questions/downvote/:questionId` | **PATCH**  | An Authenticated JWT Token                                 | userId: ObjectId                                             | Update a question's downvote    | Show the updated question's information in `object` : { _id: ObjectId, title: String, description: String,upVotes: [ObjectId],downVotes: [ObjectId],createdAt:Date <userId:ObjectId} wth status code 200 | Status code 400                             |
| `/questions/delete/:id`           | **DELETE** | An Authenticated JWT Token,<br>An Authorization User Token | none                                                         | Delete a question               | Show the updated question's information in `object` : { _id: ObjectId,
 title: String, description: String,upVotes: [ObjectId],downVotes: [ObjectId],createdAt:Date userId:ObjectId} with status code 200 | Status code: 500 or 409, Error info in JSON |
| `/questions/user/:userId`         | **GET**    | None                                                       | none                                                         | Get questions by specifed user  | Show the question's info in `array` : [{ _id: ObjectId, title: String, description: String,upVotes: [ObjectId],createdAt:DatedownVotes: [ObjectId],userId:ObjectId}] with status code 200 | Status 400                                  |

## Routes on Users

| Route             | HTTP | Headers(s) | Body                                                         | Description               | Response Success                       | Response Error  |
| ----------------- | ---- | ---------- | ------------------------------------------------------------ | ------------------------- | -------------------------------------- | --------------- |
| `/users/signIn`   | POST | none       | email: String (**required**),  password: String (**required**) | Log in as registered user | Response an`object` {token, id, email} | Status code 400 |
| `/users/register` | POST | none       | email: String (**required**),  password: String (**required**) | Register as new user      | Response an`object` {_id, email}       | Status code 200 |
|                   |      |            |                                                              |                           |                                        |                 |

## 
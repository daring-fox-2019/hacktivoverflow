# foxoverflow

## List of user routes:

Route | HTTP | Params | Headers | Body | Authentication | Authorization | Description | Response
--- | --- | --- | --- | --- | --- | --- | --- | ---
```/api/login``` | POST | none | none | email:String, fullName:String, password:String | no | no | Sign in and get an access token based on credentials | Success: Return token, email, fullName and status 200. Error: Return error message and status 500.
```/api/register``` | POST | none | none | email:String, fullName:String, password:String | no | no | Sign up with new user info | Success: Return token, email, fullName and status 200. Error: Return error message and status 500.
```/api/tags``` | POST | none | none | tag:String | yes | no | Sign up with new user info | Success: Return created tag and status 200. Error: Return error message and status 500.

## List of question routes:

Route | HTTP | Params | Headers | Body | Authentication | Authorization |Description | Response
--- | --- | --- | --- | --- | --- | --- | --- | --- 
```/api/questions``` | GET | none | token:String | none | no | no | Get all questions  | Success: Return all questions and status 200. Error: Return error message and status 500.
```/api/questions/user``` | GET | none | token:String | none | yes | no | Get user questions  | Success: Return user questions and status 200. Error: Return error message and status 500.
```/api/questions/:id``` | GET | _id:ObjectID | token:String | none | yes | no | Get a single question info | Success: Return question and status 200. Error: Return error message and status 500.
```/api/questions``` | POST | none | token:String | title:String, description:String | yes | no | Create an question | Success: Return created question and status 201. Error: Return error message and status 500.
```/api/questions/:id``` | PUT | _id:ObjectID | token:String | none | yes | yes | Update a question with new info | Success: Return updated question and status 200. Error: Return error message and status 500.
```/api/questions/:id``` | PATCH | _id:ObjectID | token:String | none | yes | no | Update vote of the selected question | Success: Return updated question and status 200. Error: Return error message and status 500.
```/api/questions/:id``` | DELETE | _id:ObjectID| token:String | none | yes | yes | Delete a question (Admin only) | Success: Return deleted question and status 200. Error: Return error message and status 500.

## List of answer routes:

Route | HTTP | Params | Headers | Body | Authentication | Authorization |Description | Response
--- | --- | --- | --- | --- | --- | --- | --- | --- 
```/api/answers``` | GET | none | token:String | none | no | no | Get all answers  | Success: Return all answers and status 200. Error: Return error message and status 500.
```/api/answers/:id``` | GET | _id:ObjectID | token:String | none | yes | no | Get a single answer info | Success: Return answer and status 200. Error: Return error message and status 500.
```/api/answers``` | POST | none | token:String | content:String | yes | no | Create an answer | Success: Return created answer and status 201. Error: Return error message and status 500.
```/api/answers/:id``` | PUT | _id:ObjectID | token:String | none | yes | yes | Update a answer with new info | Success: Return updated answer and status 200. Error: Return error message and status 500.
```/api/answers/:id``` | PATCH | _id:ObjectID | token:String | none | yes | no | Update vote of the selected answer | Success: Return updated answer and status 200. Error: Return error message and status 500.
```/api/answers/:id``` | DELETE | _id:ObjectID| token:String | none | yes | yes | Delete a answer (Admin only) | Success: Return deleted answer and status 200. Error: Return error message and status 500.

# Usage
Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$ cd server
$ npm init
$ npm install
```

Read ```.env.example``` and then you can create your own ```.env``` file.

After you have finished, on your server run the following command:

```
$ npm run dev
```

For your client, run the following commands:

```
$ cd client/foxoverflow-vue
$ npm install
$ npm run serve
```

You can browse the questions without signing in. You need to register or login if you want to add a new answer or question.
For register, you need to fill out email, full name, and password. For login, insert email and password.
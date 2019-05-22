# hacktivoverflow

## User Routes

### GET
1. GET /user/:id
* Route

        POST http://localhost:3000/user/:id

* Description

        Get user data using params.id

* Response (Status: 200)

        Returns object of curently logged in user
        {
            _id: ID,
            username: STRING,
            email: STRING,
            password: STRING
        }

* Reject (Status: 500)

        Internal server error

### POST
1. GET /user/token
* Route

        POST http://localhost:3000/user/token

* Description

        Get user data using decoded file received from authentication

* Response (Status: 200)

        Returns object of curently logged in user
        {
            _id: ID,
            username: STRING,
            email: STRING,
            password: STRING
        }

* Reject (Status: 500)

        Internal server error

2. POST /user/login
* Route

        POST http://localhost:3000/user/login

* Description

        Let user login

* Response (Status: 200)

        Returns token of logged in user
        {
            token: STRING,
            username: STRING,
            email: STRING,
            role: STRING
        }

* Reject (Status: 400)

        Wrong email / password

* Reject (Status: 500)

        Internal server error

3. POST /user/register
* Route

        POST http://localhost:3000/user/register

* Description

        Create a new user in database

* Response (Status: 201)

        Object of created user
        {
            _id: ID,
            username: STRING,
            email: STRING,
            password: STRING
        }

* Reject (Status: 500)

        Internal server error



## Question Routes

### GET
1. GET /question
* Route  

        GET http://localhost:3000/question
* Description

        Get all questions

* Response (Status 200)

        Array of object of all questions
        [
            { 
                _id: ID,
                title: STRING,
                description: STRING,
                upvote: [Object_Id("User")],
                downvote: [Object_Id("User")],
                user: Object_Id("User"),
                createdAt: DATE,
                updatedAt: DATE
            },
            OBJECTS
        ]

* Reject (Status: 500)

        Internal server error

2. GET /question/:id
* Route  

        GET http://localhost:3000/question/:id
* Description

        Get question according to id parameter

* Response (Status 200)

        Object of question
            { 
            _id: ID,
            title: STRING,
            description: STRING,
            upvote: [Object_Id("User")],
            downvote: [Object_Id("User")],
            user: Object_Id("User"),
            createdAt: DATE,
            updatedAt: DATE
        }

* Reject (Status: 500)

        Internal server error

3. GET /question/random
* Route  

        GET http://localhost:3000/question/random
* Description

        Get random question from api

* Response (Status 200)

        Object of random question
            {   
                response_code: 0,
                results:
                [ 
                    { 
                        category: STRING,
                        type: STRING,
                        difficulty: STRING,
                        question: STRING,
                        incorrect_answers: ARRAY
                    } 
                ] 
            }

* Reject (Status: 500)

        Internal server error

### POST
1. POST /question
* Route
        
        POST http://localhost:3000/question

* Description

        Create a new question

* Response (Status: 201)

        Object of created question
        { 
            _id: ID,
            title: STRING,
            description: STRING,
            upvote: [Object_Id("User")],
            downvote: [Object_Id("User")],
            user: Object_Id("User"),
            createdAt: DATE,
            updatedAt: DATE
        }

* Reject (Status: 500)

        Internal server error


### PATCH
1. PATCH /question/:id
* Route

        PATCH http://localhost:3000/question/:id

* Description

        Edit or update a question

* Response (Status: 200)

        Object of updated question
        { 
            _id: ID,
            title: STRING,
            description: STRING,
            upvote: [Object_Id("User")],
            downvote: [Object_Id("User")],
            user: Object_Id("User"),
            createdAt: DATE,
            updatedAt: DATE
        }

* Reject (Status: 500)

        Internal server error

2. PATCH /question/upvote/:id
* Route

        PATCH http://localhost:3000/question/upvote/:id

* Description

        Update upvotes of question

* Response (Status: 200)

        Object of updated question
        { 
            _id: ID,
            title: STRING,
            description: STRING,
            upvote: [Object_Id("User")],
            downvote: [Object_Id("User")],
            user: Object_Id("User"),
            createdAt: DATE,
            updatedAt: DATE
        }

* Reject (Status: 500)

        Internal server error

3. PATCH /question/upvote/:id
* Route

        PATCH http://localhost:3000/question/upvote/:id

* Description

        Update downvotes of question

* Response (Status: 200)

        Object of updated question
        { 
            _id: ID,
            title: STRING,
            description: STRING,
            upvote: [Object_Id("User")],
            downvote: [Object_Id("User")],
            user: Object_Id("User"),
            createdAt: DATE,
            updatedAt: DATE
        }

* Reject (Status: 500)

        Internal server error


### DELETE 
1. DELETE /question/:id
* Route

        DELETE http://localhost:3000/question/:id

* Description

        Delete a question

* Response (Status: 200)

        Object of deleted question
        { 
            _id: ID,
            title: STRING,
            description: STRING,
            upvote: [Object_Id("User")],
            downvote: [Object_Id("User")],
            user: Object_Id("User"),
            createdAt: DATE,
            updatedAt: DATE
        }

* Reject (Status: 500)

        Internal server error

## ANSWER ROUTES

### GET
1. GET /answer/allAnswer
* Route  

        GET http://localhost:3000/answer/allAnswer
* Description

        Get all answers of logged in user

* Response (Status 200)

        Array of object of all answers
        [
            { 
                _id: ID,
                description: STRING,
                upvote: [Object_Id("User")],
                downvote: [Object_Id("User")],
                user: Object_Id("User"),
                question: Object_Id("Question")
                createdAt: DATE,
                updatedAt: DATE
            },
            OBJECTS
        ]

* Reject (Status: 500)

        Internal server error

2. GET /answer/:id
* Route  

        GET http://localhost:3000/answer/:id
* Description

        Get answer according to id parameter

* Response (Status 200)

        Object of answer
            { 
                _id: ID,
                description: STRING,
                upvote: [Object_Id("User")],
                downvote: [Object_Id("User")],
                user: Object_Id("User"),
                question: Object_Id("Question")
                createdAt: DATE,
                updatedAt: DATE
            }

* Reject (Status: 500)

        Internal server error

### POST
1. POST /answer
* Route
        
        POST http://localhost:3000/answer

* Description

        Create a new answer

* Response (Status: 201)

        Object of created answer
        { 
            _id: ID,
            description: STRING,
            upvote: [Object_Id("User")],
            downvote: [Object_Id("User")],
            user: Object_Id("User"),
            question: Object_Id("Question")
            createdAt: DATE,
            updatedAt: DATE
        }

* Reject (Status: 500)

        Internal server error

### PATCH
1. PATCH /answer/:id
* Route

        PATCH http://localhost:3000/answer/:id

* Description

        Edit or update a answer

* Response (Status: 200)

        Object of updated answer
        { 
            _id: ID,
            description: STRING,
            upvote: [Object_Id("User")],
            downvote: [Object_Id("User")],
            user: Object_Id("User"),
            question: Object_Id("Question")
            createdAt: DATE,
            updatedAt: DATE
        }

* Reject (Status: 500)

        Internal server error

2. PATCH /answer/upvote/:id
* Route

        PATCH http://localhost:3000/answer/upvote/:id

* Description

        Update upvotes of answer

* Response (Status: 200)

        Object of updated answer
        { 
            _id: ID,
            description: STRING,
            upvote: [Object_Id("User")],
            downvote: [Object_Id("User")],
            user: Object_Id("User"),
            question: Object_Id("Question")
            createdAt: DATE,
            updatedAt: DATE
        }

* Reject (Status: 500)

        Internal server error

3. PATCH /answer/upvote/:id
* Route

        PATCH http://localhost:3000/answer/upvote/:id

* Description

        Update downvotes of answer

* Response (Status: 200)

        Object of updated answer
        { 
            _id: ID,
            description: STRING,
            upvote: [Object_Id("User")],
            downvote: [Object_Id("User")],
            user: Object_Id("User"),
            question: Object_Id("Question")
            createdAt: DATE,
            updatedAt: DATE
        }

* Reject (Status: 500)

        Internal server error

### DELETE
1. DELETE /answer/:id
* Route

        DELETE http://localhost:3000/answer/:id

* Description

        Delete a answer

* Response (Status: 200)

        Object of deleted answer
        { 
            _id: ID,
            description: STRING,
            upvote: [Object_Id("User")],
            downvote: [Object_Id("User")],
            user: Object_Id("User"),
            question: Object_Id("Question")
            createdAt: DATE,
            updatedAt: DATE
        }

* Reject (Status: 500)

        Internal server error
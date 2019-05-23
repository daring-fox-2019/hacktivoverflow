# hacktivoverflow

## REST API Documentation

### Resource Endpoints

- Auth
    - [Register](#register): `POST /auth/register`
    - [Login](#login): `POST /auth/login`
- Question
    - [Fetch questions](#fetch-questions): `GET /questions`
    - [Fetch question](#fetch-question): `GET /questions/:question_id`
    - [Create a question](#create-a-question): `POST /questions`
    - [Votes a question](#votes-a-question): `PUT /questions/:question_id/votes`
- Answer
    - [create an answer](#create-an-answer): `POST /questions/:question_id/answers`



#### Register

<hr>

**Method**: `POST`

**URL**: `/auth/register`

**Request Body**:
```javascript
{
    email: "your@email.com",
    password: "secretpassword"
}
```

**Response Success**:

**Status**: `201`

**Body**:
```javascript
{
    user: {
        _id: ObjectId,
        email: "your@email.com",
    }
}
```

**Response Failure**:

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```



#### Login

<hr>

**Method**: `POST`

**URL**: `/auth/login`

**Request Body**:
```javascript
{
    email: "your@email.com",
    password: "secretpassword
}
```

**Response Success**

**Status**: `200`

**Body**:
```javascript
{
    user: {
        _id: ObjectId,
        email: "your@email.com"
    },
    jwtToken: "eyJ0eXAiOi...<jwt string>"
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Email or password wrong"
}
```



#### Fetch Questions

<hr>

**Method**: `GET`

**URL**: `/questions`

**Response Success**

**Status**: `200`

**Body**:
```javascript
{
    questions: [
        {
            _id: ObjectId,
            title: String,
            description: String,
            answers: [ObjectId],
            upvotes: Number,
            downvotes: Number,
            tags: [String]
            author: {
                _id: ObjectId,
                email: String
            }
        },
        ...
    ]
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: 'Internal Server Error'
}
```



#### Fetch Question

<hr>

**Method**: `GET`

**URL**: `/questions/:question_id`

**Response Success**

**Status**: `200`

**Body**:
```javascript
{
    question :{
        _id: ObjectId,
        title: String,
        description: String,
        answers: [ObjectId],
        upvotes: [ObjectId],
        downvotes: [ObjectId],
        tags: [String]
        author: {
            _id: ObjectId,
            email: String
        }
    }
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```

**Status**: `404`

**Body**:
```javascript
{
    message: "Question Not Found"
}
```



#### Create a Question

<hr>

**Method**: `POST`

**URL**: `/questions`

**Request Header**:
```javascript
{
    Authorization: String
}
```

**Request Body**:
```javascript
{
    title: String,
    description: String
}
```

**Response Success**

**Status**: `201`

**Body**:
```javascript
{
    question: {
        _id: ObjectId,
        title: String,
        description: String,
        answers: []
        upvotes: [],
        downvotes: [],
        tags: []
        author: {
            _id: ObjectId,
            email: String
        }
    }
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Missing Token"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Invalid Token"
}
```



#### Create an Answer

<hr>

**Method**: `POST`

**URL**: `/question/:question_id/answers`

**Request Header**:
```javascript
{
    Authorization: String
}
```

**Request Body**:
```javascript
{
    description: String
}
```

**Response Success**

**Status**: `201`

**Body**:
```javascript
{
    answer: {
        _id: ObjectId,
        description: String,
        upvotes: [ObjectId],
        downvotes: [ObjectId],
        author: {
            _id: ObjectId,
            email: String
        }
    }
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Missing Token"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Invalid Token"
}
```

**Status**: `404`

**Body**:
```javascript
{
    message: "Question Not Found"
}
```



#### Votes a question

<hr>

**Method**: `PUT`

**URL**: `/questions/:question_id/votes`

**Request Header**:
```javascript
{
    Authorization: String
}
```

**Request Body**:
```javascript
{
    votes: String
}
```

**Response Success**

**Status**: `200`

**Body**:
```javascript
{
    question: {
        _id: ObjectId,
        title: String,
        description: String,
        answers: []
        upvotes: [ObjectId],
        downvotes: [ObjectId],
        tags: []
        author: {
            _id: ObjectId,
            email: String
        }
    }
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```

**Status**: `404`

**Body**:
```javascript
{
    message: "Question Not Found"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Invalid Token"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Missing Token"
}
```

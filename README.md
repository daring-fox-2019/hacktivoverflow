# hacktivoverflow


## User route
### User Register
```sh
POST /users/register
```
* Headers : none
* Body    : {email, name, password}
* Success : Status:201, dataTypes:{}
* Error : Status:500 , dataTypes:{}
* Description : email is unique, register will return token

Example Output
```javascript
{
    "_id": "5ce275d374a6e06f370e26a1",
    "email": "michael@yahoo.com",
    "name": "michael ryan",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2UyNzVkMzc0YTZlMDZmMzcwZTI2YTEiLCJlbWFpbCI6Im1pY2hhZWxAeWFob28uY29tIiwibmFtZSI6Im1pY2hhZWwgcnlhbiIsImlhdCI6MTU1ODM0NTE3MX0.2sVixaHayzSsIPgKZo2oXEZYMkeJSBfLZbGx5I56RKI"
}
```


Error Example
```javascript
{
    "error": {
        "errors": {
            "email": {
                "message": "Email is registered",
                "name": "ValidatorError",
                "properties": {
                    "message": "Email is registered",
                    "type": "user defined",
                    "path": "email",
                    "value": "michael@yahoo.com"
                },
                "kind": "user defined",
                "path": "email",
                "value": "michael@yahoo.com"
            }
        },
        "_message": "User validation failed",
        "message": "User validation failed: email: Email is registered",
        "name": "ValidationError"
    },
    "message": "Email is registered"
}
```

### User Login
```sh
POST /users/register
```
* Headers : none
* Body    : {email, name, password}
* Success : Status:201, dataTypes:{}
* Error : Status:500 , dataTypes:{}
* Description : email is unique, register will return token

Example Output
```javascript
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2UyNzVkMzc0YTZlMDZmMzcwZTI2YTEiLCJlbWFpbCI6Im1pY2hhZWxAeWFob28uY29tIiwibmFtZSI6Im1pY2hhZWwgcnlhbiIsImlhdCI6MTU1ODM0NjMwMX0.ZlYqKT-9ktfXxo6RMd6WZhwGADsQ0vakfi_5-oMpHPU",
    "_id": "5ce275d374a6e06f370e26a1",
    "name": "michael ryan",
    "email": "michael@yahoo.com"
}
```

Error Example
```javascript
{
    "message": "Invalid email/password"
}
```

## Question Route
### Create Question
```sh
POST /questions
```
* Headers : {token}
* Body    : {question, description, tags}
* Success : Status:201, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
{
    "upvotes": [],
    "downvotes": [],
    "comments": [],
    "tags": [
        " halo"
    ],
    "_id": "5ce27f3c943a82720c155277",
    "question": "Lorem ipsum?",
    "description": "test",
    "user": "5ce275d374a6e06f370e26a1",
    "createdAt": "2019-05-20T10:19:40.416Z",
    "updatedAt": "2019-05-20T10:19:40.416Z",
    "__v": 0
}
```

### Find All Question
```sh
GET /questions
```
* Headers : none
* Body    : none
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
[
    {
        "upvotes": [],
        "downvotes": [],
        "comments": [],
        "_id": "5ce27f3c943a82720c155277",
        "question": "Lorem ipsum?",
        "description": "test",
        "user": "5ce275d374a6e06f370e26a1",
        "createdAt": "2019-05-20T10:19:40.416Z",
        "updatedAt": "2019-05-20T10:19:40.416Z",
        "__v": 0
    }
]
```

### Find Specific QUestion
```sh
GET /questions/:question_id
```
* Headers : none
* Body    : none
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
{
    "upvotes": [],
    "downvotes": [],
    "comments": [],
    "_id": "5ce27f3c943a82720c155277",
    "question": "Lorem ipsum?",
    "description": "test",
    "user": "5ce275d374a6e06f370e26a1",
    "createdAt": "2019-05-20T10:19:40.416Z",
    "updatedAt": "2019-05-20T10:19:40.416Z",
    "__v": 0
}
```

### Delete Specific Question
```sh
DELETE /questions/:question_id
```
* Headers : {token}
* Body    : none
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
//deleted question
{
    "upvotes": [],
    "downvotes": [],
    "comments": [],
    "_id": "5ce27f3c943a82720c155277",
    "question": "Lorem ipsum? updated_",
    "description": "test updated",
    "user": "5ce275d374a6e06f370e26a1",
    "createdAt": "2019-05-20T10:19:40.416Z",
    "updatedAt": "2019-05-21T02:27:59.790Z",
    "__v": 0
}
```

### Upvote a Question
```sh
PATCH /questions/:question_id/upvote
```
* Headers : {token}
* Body    : {}
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
{
    "upvotes": [
        "5ce275d374a6e06f370e26a1"
    ],
    "downvotes": [],
    "comments": [],
    "_id": "5ce27f3c943a82720c155277",
    "question": "Lorem ipsum? updated_",
    "description": "test updated",
    "user": "5ce275d374a6e06f370e26a1",
    "createdAt": "2019-05-20T10:19:40.416Z",
    "updatedAt": "2019-05-20T10:43:56.073Z",
    "__v": 0
}
```
Example Error
```javascript
{
    "message": "Already in the upvote"
}
```

### Downvote a Question
```sh
PATCH /questions/:question_id/downvote
```
* Headers : {token}
* Body    : {}
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
{
    "upvotes": [],
    "downvotes": [
        "5ce275d374a6e06f370e26a1"
    ],
    "comments": [],
    "_id": "5ce3635a4c85bd7b3003c2e0",
    "question": "Lorem ipsum?",
    "description": "test",
    "user": "5ce275d374a6e06f370e26a1",
    "createdAt": "2019-05-21T02:32:58.301Z",
    "updatedAt": "2019-05-21T02:33:20.727Z",
    "__v": 0
}
```
Example Error
```javascript
{
    "message": "Already in the downvote"
}
```

### Update Specific Question
```sh
PATCH /questions/:question_id
```
* Headers : {token}
* Body    : {...question, description}
* Success : Status:201, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
{
    "upvotes": [],
    "downvotes": [],
    "comments": [],
    "_id": "5ce27f3c943a82720c155277",
    "question": "Lorem ipsum? updated_", // --> updated
    "description": "test updated", // --> updated
    "user": "5ce275d374a6e06f370e26a1",
    "createdAt": "2019-05-20T10:19:40.416Z",
    "updatedAt": "2019-05-20T10:28:18.512Z",
    "__v": 0
}
``` 

/////


## Answer Route
### Create Answer
```sh
POST /answers
```
* Headers : {token}
* Body    : {question:question_id, answer}
* Success : Status:201, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
{
    "upvotes": [],
    "downvotes": [],
    "comments": [],
    "_id": "5ce36c7547731601ddaa4e97",
    "question": "5ce275d374a6e06f370e26a1",
    "answer": "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:\n\n    “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”\n\nThe purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content. ",
    "user": "5ce275d374a6e06f370e26a1",
    "createdAt": "2019-05-21T03:11:49.126Z",
    "updatedAt": "2019-05-21T03:11:49.126Z",
    "__v": 0
}

```

### Find All Answer
```sh
GET /answers
```
* Headers : none
* Body    : none
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
[
    {
        "comments": [],
        "_id": "5ce36a4674bbe37c688e94f3",
        "question": "5ce275d374a6e06f370e26a1",
        "answer": "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:\n\n    “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”\n\nThe purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content. ",
        "createdAt": "2019-05-21T03:02:30.485Z",
        "updatedAt": "2019-05-21T03:02:30.485Z",
        "user": "5ce36c7547731601ddaa4e97",
        "__v": 0
    }
]
```

### Find a Specific Answer
```sh
GET /answers/:answer_id
```
* Headers : none
* Body    : none
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
{
    "comments": [],
    "_id": "5ce36a4674bbe37c688e94f3",
    "question": "5ce275d374a6e06f370e26a1",
    "answer": "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:\n\n    “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”\n\nThe purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content. ",
    "createdAt": "2019-05-21T03:02:30.485Z",
    "updatedAt": "2019-05-21T03:02:30.485Z",
    "user": "5ce36c7547731601ddaa4e97",
    "__v": 0
}
```



### Upvote an Answer
```sh
PATCH /answers/:answer_id/upvote
```
* Headers : {token}
* Body    : {}
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
{
    "upvotes": [
        "5ce275d374a6e06f370e26a1"
    ],
    "downvotes": [],
    "comments": [],
    "_id": "5ce36c7547731601ddaa4e97",
    "question": "5ce275d374a6e06f370e26a1",
    "answer": "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:\n\n    “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”\n\nThe purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content. ",
    "user": "5ce275d374a6e06f370e26a1",
    "createdAt": "2019-05-21T03:11:49.126Z",
    "updatedAt": "2019-05-21T03:12:48.890Z",
    "__v": 0
}
```
Example Error
```javascript
{
    "message": "Already in the upvote"
}
```

### Downvote an Answer
```sh
PATCH /answers/:answer_id/downvote
```
* Headers : {token}
* Body    : {}
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
{
    "upvotes": [],
    "downvotes": [
        "5ce275d374a6e06f370e26a1"
    ],
    "comments": [],
    "_id": "5ce370475249c003be6a1fb0",
    "question": "5ce275d374a6e06f370e26a1",
    "answer": "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:\n\n    “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”\n\nThe purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content. ",
    "user": "5ce275d374a6e06f370e26a1",
    "createdAt": "2019-05-21T03:28:07.680Z",
    "updatedAt": "2019-05-21T03:28:20.762Z",
    "__v": 0
}
```
Example Error
```javascript
{
    "message": "Already in the downvote"
}
```


### Update a Specific Question
```sh
PATCH /answers/:answer_id
```
* Headers : {token}
* Body    : {...question, description}
* Success : Status:201, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
{
    "upvotes": [],
    "downvotes": [
        "5ce275d374a6e06f370e26a1"
    ],
    "comments": [],
    "_id": "5ce370475249c003be6a1fb0",
    "question": "5ce275d374a6e06f370e26a1",
    "answer": "updated_",
    "user": "5ce275d374a6e06f370e26a1",
    "createdAt": "2019-05-21T03:28:07.680Z",
    "updatedAt": "2019-05-21T03:29:35.300Z",
    "__v": 0
}
``` 
### Delete a Specific Question
```sh
DELETE /answers/:answer_id
```
* Headers : {token}
* Body    : none
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
//deleted answer
{
    "upvotes": [
        "5ce275d374a6e06f370e26a1"
    ],
    "downvotes": [],
    "comments": [],
    "_id": "5ce36c7547731601ddaa4e97",
    "question": "5ce275d374a6e06f370e26a1",
    "answer": "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:\n\n    “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”\n\nThe purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content. ",
    "user": "5ce275d374a6e06f370e26a1",
    "createdAt": "2019-05-21T03:11:49.126Z",
    "updatedAt": "2019-05-21T03:12:48.890Z",
    "__v": 0
}
```

### Find Answers based on question id
```sh
GET /answers/question/:question_id
```
* Headers : none
* Body    : none
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example
```javascript
{
    "question": "Lorem ipsum? updated_",
    "description": "test updated"
}
```

Example Output
```javascript
[
    {
        "upvotes": [
            "5ce275d374a6e06f370e26a1"
        ],
        "downvotes": [
            "5ce275d374a6e06f370e26a1"
        ],
        "comments": [],
        "_id": "5ce36a4674bbe37c688e94f3",
        "question": "5ce275d374a6e06f370e26a1",
        "answer": "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:\n\n    “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”\n\nThe purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content. ",
        "createdAt": "2019-05-21T03:02:30.485Z",
        "updatedAt": "2019-05-21T03:21:50.320Z",
        "__v": 0
    },
    {
        "upvotes": [],
        "downvotes": [
            "5ce275d374a6e06f370e26a1"
        ],
        "comments": [],
        "_id": "5ce370475249c003be6a1fb0",
        "question": "5ce275d374a6e06f370e26a1",
        "answer": "updated_",
        "user": "5ce275d374a6e06f370e26a1",
        "createdAt": "2019-05-21T03:28:07.680Z",
        "updatedAt": "2019-05-21T03:29:35.300Z",
        "__v": 0
    }
]
```



<!-- ### User Register
```sh
POST /users/register
```
* Headers : none
* Body    : {email, name, password}
* Success : Status:201, dataTypes:{}
* Error : Status:500 , dataTypes:{}
* Description : email is unique, register will return token

Example Output
```javascript
``` -->

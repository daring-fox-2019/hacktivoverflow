# hacktivoverflow
##  User Register
```
    URL : /users/register
    Method : POST
    Headers: None
    Authenticate = None
    Body : name=[string], password=[string], email=[string], address=[object]
    Params : None
    Success Response :
        Code 201
            {
                "_id": "5ccb24a09d738f4fd1011de0",
                "name": "komangmahendra",
                "email": "mail@mail.com",
                "password": "$2a$10$.HDPulTBd1.M0vTnU7oyDe4j8b3o68uj2FWAFJc.jhEgF4478rxna",
                "__v": 0
            }
    Error Response :
        Code: 500 
        Content: { message : <error message> }
```
##  User Login
```
    URL : /users/login
    Method : POST
    Headers: None
    Authenticate = None
    Body : password=[string], email=[string]
    Params : None
    Success Response :
        Code 201
            {
                "token": <token> ,
                "id" : <id>,
                "name": <name>,
            }
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
##  Google sign in
```
    URL : /oauth/google-sign-in
    Method : POST
    Headers: None
    Authenticate = None
    Body : id_token=[string]
    Params : None
    Success Response :
        Code 201
              {
                "token": <token> ,
                "id" : <id>,
                "name": <name>,
            }
    Error Response :
        Code: 500
        Content: { message : <error message> }
```
##  Get user detail
```
    URL : /users/:id
    Method : GET
    Headers: None
    Authenticate : YES
    Body : None
    Params : None
    Success Response :
        Code 201
            {
                "tags": [
                    "nasi"
                ],
                "_id": "5ce35fb19078561649ffb2a1",
                "name": "hoho hoho"
            }
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
##  create question
```
    URL : /questions
    Method : POST
    Headers: None
    Authenticate : YES
    Body : title=[string], description=[string], tags=[array]
    Params : None
    Success Response :
        Code 201
            {
                "upvotes": [],
                "downvotes": [],
                "answers": [],
                "tags": [],
                "_id": "5ce514835ee9fa2d51cb0fe4",
                "title": "apakah manusia",
                "description": "hahaha",
                "user_id": "5cc054812cbd411d360df290",
                "createdAt": "2019-05-22T09:21:07.160Z",
                "updatedAt": "2019-05-22T09:21:07.160Z",
                "__v": 0
            }
    Error Response :
        Code: 500
        Content: { message : <error message> }
```
##  update question
```
    URL : /questions/:id
    Method : PATCH
    Headers: token=[string]
    Authenticate : YES
    Authorization : YES
    Body : title=[string], description=[string], tags=[array]
    Params : None
    Success Response :
        Code 201
            {
                "upvotes": [],
                "downvotes": [],
                "answers": [],
                "tags": [],
                "_id": "5ce5150d5ee9fa2d51cb0fe5",
                "title": "apakah manusia ???",
                "description": "hahaha",
                "user_id": "5cc054812cbd411d360df290",
                "createdAt": "2019-05-22T09:23:25.342Z",
                "updatedAt": "2019-05-22T09:23:44.985Z",
                "__v": 0
            }
    Error Response :
        Code: 500
        Content: { message : <error message> }
```
##  delete question
```
    URL : /questions/:id
    Method : PATCH
    Headers: token=[string]
    Authenticate : YES
    Authorization : YES
    Body : None
    Params : None
    Success Response :
        Code 201
            {
                "upvotes": [],
                "downvotes": [],
                "answers": [],
                "tags": [],
                "_id": "5ce5150d5ee9fa2d51cb0fe5",
                "title": "apakah manusia ???",
                "description": "hahaha",
                "user_id": "5cc054812cbd411d360df290",
                "createdAt": "2019-05-22T09:23:25.342Z",
                "updatedAt": "2019-05-22T09:23:44.985Z",
                "__v": 0
            }
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
##  upvote question
```
    URL : /questions/upvote/:id
    Method : PATCH
    Headers: token=[string]
    Authenticate : YES
    Authorization : None
    Body : None
    Params : None
    Success Response :
        Code 201
            {
                "upvotes": ["5cc054812cbd411d360df290"],
                "downvotes": [],
                "answers": [],
                "tags": [],
                "_id": "5ce5150d5ee9fa2d51cb0fe5",
                "title": "apakah manusia ???",
                "description": "hahaha",
                "user_id": "5cc054812cbd411d360df290",
                "createdAt": "2019-05-22T09:23:25.342Z",
                "updatedAt": "2019-05-22T09:23:44.985Z",
                "__v": 0
            }
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
##  downvote question
```
    URL : /questions/downvote/:id
    Method : PATCH
    Headers: token=[string]
    Authenticate : YES
    Authorization : None
    Body : None
    Params : None
    Success Response :
        Code 201
            {
                "upvotes": [],
                "downvotes": ["5cc054812cbd411d360df290"],
                "answers": [],
                "tags": [],
                "_id": "5ce5150d5ee9fa2d51cb0fe5",
                "title": "apakah manusia ???",
                "description": "hahaha",
                "user_id": "5cc054812cbd411d360df290",
                "createdAt": "2019-05-22T09:23:25.342Z",
                "updatedAt": "2019-05-22T09:23:44.985Z",
                "__v": 0
            }
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
##  get one question
```
    URL : /questions/:id
    Method : GET
    Headers: token=[string]
    Authenticate : YES
    Authorization : None
    Body : None
    Params : None
    Success Response :
        Code 200
            {
                "upvotes": [],
                "downvotes": ["5cc054812cbd411d360df290"],
                "answers": [],
                "tags": [],
                "_id": "5ce5150d5ee9fa2d51cb0fe5",
                "title": "apakah manusia ???",
                "description": "hahaha",
                "user_id": "5cc054812cbd411d360df290",
                "createdAt": "2019-05-22T09:23:25.342Z",
                "updatedAt": "2019-05-22T09:23:44.985Z",
                "__v": 0
            }
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
##  get all question per user
```
    URL : /questions/user
    Method : GET
    Headers: token=[string]
    Authenticate : YES
    Authorization : None
    Body : None
    Params : None
    Success Response :
        Code 200
        [
            {
                "upvotes": [],
                "downvotes": ["5cc054812cbd411d360df290"],
                "answers": [],
                "tags": [],
                "_id": "5ce5150d5ee9fa2d51cb0fe5",
                "title": "apakah manusia ???",
                "description": "hahaha",
                "user_id": "5cc054812cbd411d360df290",
                "createdAt": "2019-05-22T09:23:25.342Z",
                "updatedAt": "2019-05-22T09:23:44.985Z",
                "__v": 0
            },
            <object>
        ]
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
##  get suggest tag from all question
```
    URL : /questions/tag
    Method : GET
    Headers: None
    Authenticate : None
    Authorization : None
    Body : None
    Params : tag=[string]
    Success Response :
        Code 200
        [
            "nasi",
            "javascript",
            "ajaib"
        ]
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
##  create answer
```
    URL : /answers
    Method : POST
    Headers: token=[string]
    Authenticate : YES
    Authorization : None
    Body : description=[string], question_id=[string]
    Params : None
    Success Response :
        Code 201
        {
            "upvotes": [],
            "downvotes": [],
            "_id": "5ce514635ee9fa2d51cb0fe3",
            "description": "coba cari di stuck operplow",
            "user_id": "5cc054812cbd411d360df290",
            "question_id": "5ce2700499179556aef720f9",
            "createdAt": "2019-05-22T09:20:35.627Z",
            "updatedAt": "2019-05-22T09:20:35.627Z",
            "__v": 0
        }
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
##  upvote answer
```
    URL : /answers/upvote/:id
    Method : POST
    Headers: token=[string]
    Authenticate : YES
    Authorization : None
    Body : None
    Params : None
    Success Response :
        Code 200
        {
            "upvotes": [
                "5cc054812cbd411d360df290"
            ],
            "downvotes": [],
            "_id": "5ce514635ee9fa2d51cb0fe3",
            "description": "coba cari di stuck operplow",
            "user_id": "5cc054812cbd411d360df290",
            "question_id": "5ce2700499179556aef720f9",
            "createdAt": "2019-05-22T09:20:35.627Z",
            "updatedAt": "2019-05-22T09:39:16.813Z",
            "__v": 0
        }
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
##  downvote answer
```
    URL : /answers/upvote/:id
    Method : POST
    Headers: token=[string]
    Authenticate : YES
    Authorization : None
    Body : None
    Params : None
    Success Response :
        Code 200
        {
            "upvotes": [],
            "downvotes": ["5cc054812cbd411d360df290"],
            "_id": "5ce514635ee9fa2d51cb0fe3",
            "description": "coba cari di stuck operplow",
            "user_id": "5cc054812cbd411d360df290",
            "question_id": "5ce2700499179556aef720f9",
            "createdAt": "2019-05-22T09:20:35.627Z",
            "updatedAt": "2019-05-22T09:39:16.813Z",
            "__v": 0
        }
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
##  update answer
```
    URL : /answers/:id
    Method : PATCH
    Headers: token=[string]
    Authenticate : YES
    Authorization : YES
    Body : description=[string], 
    Params : None
    Success Response :
        Code 200
        {
            "upvotes": [
                "5cc054812cbd411d360df290"
            ],
            "downvotes": [],
            "_id": "5ce514635ee9fa2d51cb0fe3",
            "description": "coba cari di stuck operplow hahaha",
            "user_id": "5cc054812cbd411d360df290",
            "question_id": "5ce2700499179556aef720f9",
            "createdAt": "2019-05-22T09:20:35.627Z",
            "updatedAt": "2019-05-22T09:41:44.384Z",
            "__v": 0
        }
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
##  delete answer
```
    URL : /answers/:id
    Method : DELETE
    Headers: token=[string]
    Authenticate : YES
    Authorization : YES
    Body : None
    Params : None
    Success Response :
        Code 200
        {
            "upvotes": [
                "5cc054812cbd411d360df290"
            ],
            "downvotes": [],
            "_id": "5ce514635ee9fa2d51cb0fe3",
            "description": "coba cari di stuck operplow hahaha",
            "user_id": "5cc054812cbd411d360df290",
            "question_id": "5ce2700499179556aef720f9",
            "createdAt": "2019-05-22T09:20:35.627Z",
            "updatedAt": "2019-05-22T09:41:44.384Z",
            "__v": 0
        }
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```




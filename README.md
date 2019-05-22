# hacktivoverflow

### LOGIN :
```sh
http://localhost:3000/users/login
METHOD : POST
Authenticated Required : NO
Authorized Required : NO

Data Input :
    {
        email: "naruto@gmail.com",
        password: "naruto",
    }
    
Response Status : 200
Data Output :
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1Y2UzNmIxNWViNTQzNzM5Mjg0YTdhZWMiLCJlbWFpbCI6Im5hcnV0b0BnbWFpbC5jb20iLCJpYXQiOjE1NTg1MjE3NjgsImV4cCI6MTU1ODYwODE2OH0.Wu6KNokMgxegC7FswDkY2JaT7kLfc0JZ3cpiD1afjcg",
        "name": "naruto",
        "email": "naruto@gmail.com",
        "id": "5ce36b15eb543739284a7aec"
    }
    
Response Status : 400 Bad Request
Output :
    "email/password wrong!"

Response Status : 500
Output :
    "Internal Server Error"
```


### Register :

```sh
http://localhost:3000/users
METHOD : GET
Authenticated Required : NO
Authorized Required : NO
Data Input :
    {
        name: "naruto"
        email: "naruto@gmail.com",
        password: "naruto"
    }
Response Status : 201
    {
        "_id": "5ce5284f8ab94d406f538980",
        "name": "naruto",
        "email": "naruto@gmail.com",
        "password": "$2a$10$fQyHD0De2yiy1vjl0JjLD.jYooXaTizY.pcbYgXSs/xTM8GG559IS",
        "__v": 0
    }
Response Status : 400 Bad Request
Output :
    "User validation failed: email: Email is already registered"
           
Response Status : 500
Output :
    "Internal Server Error"

```

### List Users :

```sh
http://localhost:3000/users
METHOD : GET
Authenticated Required : NO
Authorized Required : NO
    
Response Status : 200
Data Output :
    [
        {
            "_id": "5ce36b15eb543739284a7aec",
            "name": "naruto",
            "email": "naruto@gmail.com",
            "password": "$2a$10$i2wu6UlEltdebBMu32L/cuzM3YHSHjliOLXq6v03msHag94VHGJdK",
            "__v": 0
        },{...},{...}
    ]
    
Response Status : 500
Output :
    "Internal Server Error"
```

### Delete User :

```sh
http://localhost:3000/users/5ce36b15eb543739284a7aec
METHOD : DELETE
Authenticated Required : NO
Authorized Required : NO
    
Response Status : 200
Data Output :
    {
        "_id": "5ce36b15eb543739284a7aec",
        "name": "naruto",
        "email": "naruto@gmail.com",
        "password": "$2a$10$i2wu6UlEltdebBMu32L/cuzM3YHSHjliOLXq6v03msHag94VHGJdK",
        "__v": 0
    }
    
Response Status : 500
Output :
    "Internal Server Error"
```

### Create Question :
```sh
http://localhost:3000/questions
METHOD : POST
Authenticated Required : YES
Authorized Required : NO
Data Input :
    {
        title: "title",
        description: "description",
        auhtor: "5ce36b15eb543739284a7aec",
    }
Response Status : 201
Data Output :
    {
        "_id": "5ce43bff340f7209711f6c38",
        "title": "tes title",
        "description": "tes description",
        "author": "5ce36b15eb543739284a7aec",
        "upvotes": 0,
        "downvotes": 0,
        "createdAt": "2019-05-21T17:57:19.682Z",
        "updatedAt": "2019-05-21T17:57:19.682Z",
        "__v": 0
    }

Response Status : 400 Bad Request
Output :
    {
        "title is required"
        "description is required"
        "author is required"
    }

Response Status : 500
Output :
    "Token wrong!"
```

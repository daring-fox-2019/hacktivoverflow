# hacktivoverflow

## First Initial


## List of user routes
### URL : 'user/register'
* METHOD : POST
* BODY : {
    * username : ""
    * email : ""
    * password : ""
}
* AUTHENTICATION : NO
* RESPONSE STATUS : 201
    ``` 
    OUTPUT : {
        token : <jwt token>
    }
    ```
* RESPONSE STATUS : 400
    ``` 
    OUTPUT : {
        message : "email already used"
    }
    ```
* RESPONSE STATUS : 500
    ``` 
    OUTPUT {
        message : "Internal server error"
    }
    ```

### URL : '/login'
* METHOD : POST
* BODY : {
    * email : ""
    * password : ""
}
* AUTHENTICATION : NO
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
        token : <jwt token>
    }
    ```
* RESPONSE STATUS : 400
    ``` 
    OUTPUT : {
        message : "username / password invalid"
    }
    ```
* RESPONSE STATUS : 500
    ``` 
    OUTPUT {
        message : "Internal server error"
    }
    ```

## List of questions routes
### URL : '/questions'
* METHOD : POST
* HEADERS : < TOKEN >
* BODY : {
    * title : "",
    * description : "",
    }
* AUTHENTICATION : YES
* RESPONSE STATUS : 201
    ``` 
    OUTPUT : {
        title : "Sweater Wool",
        description : "",
        upVotes : []
        downVotes : [],
        userId : "",
        username : ""
    }
    ```
* RESPONSE STATUS : 400
    ```
    OUTPUT : {
        _id : "knkn89797sg8jh9spjsa9obcaiscal7"
        title validation : title : "Title is required",
        description validation : "Description is required",
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT : {
        message : "Internal server error"
    }
    ```'

### URL : '/questions'
* METHOD : GET
* AUTHENTICATION : YES
* HEADERS : < TOKEN >
* RESPONSE STATUS : 200
    ```
    OUTPUT : [{
        _id : ""      
        title : "",
        description : "",
        upVotes : []
        downVotes : [],
        userId : "",
        username : ""
    }]
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```

### URL : '/questions/:id'
* METHOD : GET
* AUTHENTICATION : YES
* HEADERS : < TOKEN >
* RESPONSE STATUS : 200
    ```
    OUTPUT : {
        _id : ""      
        title : "",
        description : "",
        upVotes : []
        downVotes : [],
        userId : "",
        username : ""
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```

### URL : '/questions/:id'
* METHOD : PUT
* AUTHENTICATION : YES
* HEADERS : < TOKEN >
* BODY : {
       title : "",
       description : ""
    }
* RESPONSE STATUS : 200
    ```
    OUTPUT : {
        _id : ""      
        title : "",
        description : "",
        upVotes : []
        downVotes : [],
        userId : "",
        username : ""
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```

### URL : '/questions/:id'
* METHOD : DELETE
* AUTHENTICATION : YES
* HEADERS : < TOKEN >
* RESPONSE STATUS : 200
     ```
     OUTPUT : {
        message : "delete succesfully"
    }
    ```
* RESPONSE STATUS : 500 
    ```
    OUTPUT : {
        message : "Internal server error"
    }
    ```
### URL : 'question/:questionId/answers'
* METHOD : GET
* AUTHENTICATION : YES
* HEADERS : < TOKEN >
* RESPONSE STATUS : 200
     ```
     OUTPUT : {
         description : "",
         questionId : "",
         upVotes : [],
         downVotes : [],
         userId : "",
         username : ""
    ```
* RESPONSE STATUS : 500 
    ```
    OUTPUT : {
        message : "Internal server error"
    }
    ```
### URL : '/questions/:id/upVotes'
* METHOD : POST
* AUTHENTICATION : YES
* HEADERS : < TOKEN >
* RESPONSE STATUS : 200
     ```
     OUTPUT : [{
         _id : absjda89dsa7d9aba9-d0aoh
        description : "",
        questionId : "",
        upVotes : [],
        downVotes : [],
        userId : "",
        username : ""
    }]
    ```
* RESPONSE STATUS : 500 
    ```
    OUTPUT : {
        message : "Internal server error"
    }
    ```
### URL : '/questions/:id/downVotes'
* METHOD : POST
* AUTHENTICATION : YES
* HEADERS : < TOKEN >
* RESPONSE STATUS : 200
     ```
     OUTPUT : [{
         _id : absjda89dsa7d9aba9-d0aoh
        description : "",
        questionId : "",
        upVotes : [],
        downVotes : [],
        userId : "",
        username : ""
    }]
    ```
* RESPONSE STATUS : 500 
    ```
    OUTPUT : {
        message : "Internal server error"
    }
    ```

## List of answer routes
### URL : '/answers'
* METHOD : POST
* AUTHENTICATION : YES
* HEADERS : < TOKEN >
* BODY : {
        description : "",
}
* RESPONSE STATUS : 201
     ```
     OUTPUT : {
        _id : absjda89dsa7d9aba9-d0aoh
        description : "",
        questionId : "",
        upVotes : [],
        downVotes : [],
        userId : "",
        username : ""
    }
    ```
* RESPONSE STATUS : 500 
    ```
    OUTPUT : {
        message : "Internal server error"
    }
    ```
### URL : '/answers/:id'
* METHOD : GET
* AUTHENTICATION : YES
* HEADERS : < TOKEN >
* RESPONSE STATUS : 200
     ```
     OUTPUT : {
        _id : absjda89dsa7d9aba9-d0aoh
        description : "",
        questionId : "",
        upVotes : [],
        downVotes : [],
        userId : "",
        username : ""
    }
    ```
* RESPONSE STATUS : 500 
    ```
    OUTPUT : {
        message : "Internal server error"
    }
    ```
### URL : '/answers/:id'
* METHOD : PUT
* AUTHENTICATION : YES
* HEADERS : < TOKEN >
* BODY : {
        description : ""
    }
* RESPONSE STATUS : 200
     ```
     OUTPUT : [{
        _id : absjda89dsa7d9aba9-d0aoh
        description : "",
        questionId : "",
        upVotes : [],
        downVotes : [],
        userId : "",
        username : ""
    }]
    ```
* RESPONSE STATUS : 500 
    ```
    OUTPUT : {
        message : "Internal server error"
    }
    ```

### URL : '/answers/:id'
* METHOD : DELETE
* AUTHENTICATION : YES
* HEADERS : < TOKEN >
* RESPONSE STATUS : 200
     ```
     OUTPUT : [{
         _id : absjda89dsa7d9aba9-d0aoh
        description : "",
        questionId : "",
        upVotes : [],
        downVotes : [],
        userId : "",
        username : ""
    }]
    ```
* RESPONSE STATUS : 500 
    ```
    OUTPUT : {
        message : "Internal server error"
    }
    ```
### URL : '/answers/:id/upVotes'
* METHOD : POST
* AUTHENTICATION : YES
* HEADERS : < TOKEN >
* RESPONSE STATUS : 200
     ```
     OUTPUT : [{
         _id : absjda89dsa7d9aba9-d0aoh
        description : "",
        questionId : "",
        upVotes : [],
        downVotes : [],
        userId : "",
        username : ""
    }]
    ```
* RESPONSE STATUS : 500 
    ```
    OUTPUT : {
        message : "Internal server error"
    }
    ```
### URL : '/answers/:id/downVotes'
* METHOD : POST
* AUTHENTICATION : YES
* HEADERS : < TOKEN >
* RESPONSE STATUS : 200
     ```
     OUTPUT : [{
         _id : absjda89dsa7d9aba9-d0aoh
        description : "",
        questionId : "",
        upVotes : [],
        downVotes : [],
        userId : "",
        username : ""
    }]
    ```
* RESPONSE STATUS : 500 
    ```
    OUTPUT : {
        message : "Internal server error"
    }
    ```

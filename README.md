# HacktivOverflow

Mini StackOverflow

## Dependencies

* Node.js
* MongoDB

## Environtment Variables

```
JWT_SECRET
```

## Project Setup

```
$ npm install
$ npm start
```

## REST API Routes

### Home Route

- URL:
  - `GET` `/`
  - Response: `200` OK
  ```json
    {
      "page": "Home",
      "project": "HacktivOverflow"
    }
  ```

### Authentication Routes

#### Registration
  - Description:
    - Creates a new user
  - URL:
    - `POST` `/register`
  - Body:
    - `name`: `String` (**required**)
    - `email`: `String` (**required**)
    - `password`: `String` (**required**)
  - Success response: `201` Created
  ```json
    {
      "_id": "...",
      "name": "...",
      "email": "...",
      "password": "<hashed password>"
    }
  ```
  - Fail response(s):
    - `400` Bad request
    - `500` Internal Server Error

#### Login
  - Description:
    - Logs a user in
  - URL:
    - `POST` `/login`
  - Body:
    - `email`: `String` (**required**)
    - `password`: `String` (**required**)
  - Success response: `200` OK
  ```json
    {
      "token": "...",
      "id": "...",
      "email": "...",
    }
  ```
  - Fail response(s):
    - `400` Bad request
    - `500` Internal Server Error

### Question & Answer Routes

#### Create Question/Answer
  - Description:
    - Create a question
  - URL:
    - `POST` `/questions`
  - Headers:
    - `token`: `String` (**required**)
  - Body:
    - `name`: `String` (**required**)
    - `description`: `String` (**required**)
    - `price`: `Number` (**required**)
    - `featuredImg`: `String`
    - `stock`: `Number`
    - `tags`: `Array`
  - Success response: `200` OK
  ```json
    {
      "_id": "...",
      "name": "...",
      "description": "...",
      "featuredImg": "...",
      "stock": "...",
      "tags": "...",
      "price": "...",
    }
  ```
  - Fail response(s):
    - `401` Unauthorized
    - `500` Internal Server Error

#### Question/Answer List
  - Description:
    - Get list of all questions
  - URL:
    - `GET` `/questions`
  - Headers:
    - `token`: `String` (**required**)
  - Success response: `200` OK
  ```json
    [
      {
        "_id": "...",
        "name": "...",
        "description": "...",
        "featuredImg": "...",
        "stock": "...",
        "tags": "...",
        "price": "...",
      }
    ]
  ```
  - Fail response(s):
    - `401` Unauthorized
    - `500` Internal Server Error

#### Find one question
  - Description:
    - Find one question
  - URL:
    - `get` `/questions/:questionId`
  - Headers:
    - `token`: `String` (**required**)
  - Success response: `200` OK
  ```json
    {
      "_id": "...",
      "name": "...",
      "description": "...",
      "featuredImg": "...",
      "stock": "...",
      "tags": "...",
      "price": "...",
    }
  ```
  - Fail response(s):
    - `401` Unauthorized
    - `500` Internal Server Error

#### Update one question
  - Description:
    - Update one question
  - URL:
    - `PUT` `/questions/:questionId`
  - Headers:
    - `token`: `String` (**required**)
  - Body:
    - `name`: `String` (**required**)
    - `description`: `String` (**required**)
    - `price`: `Number` (**required**)
    - `featuredImg`: `String`
    - `stock`: `Number`
    - `tags`: `Array`
  - Success response: `200` OK
  ```json
    {
      "_id": "...",
      "name": "...",
      "description": "...",
      "featuredImg": "...",
      "stock": "...",
      "tags": "...",
      "price": "...",
    }
  ```
  - Fail response(s):
    - `401` Unauthorized
    - `500` Internal Server Error

#### Upvote one question
  - Description:
    - Upvote one question
  - URL:
    - `PUT` `/questions/:questionId/upvote`
  - Headers:
    - `token`: `String` (**required**)
  - Success response: `200` OK
  ```json
    {
      "message": "Successfully deleted question.",
      "id": "<questionId>",
    }
  ```
  - Fail response(s):
    - `401` Unauthorized
    - `500` Internal Server Error

#### Downvote one question
  - Description:
    - Downvote one question
  - URL:
    - `PUT` `/questions/:questionId/upvote`
  - Headers:
    - `token`: `String` (**required**)
  - Success response: `200` OK
  ```json
    {
      "message": "Successfully deleted question.",
      "id": "<questionId>",
    }
  ```
  - Fail response(s):
    - `401` Unauthorized
    - `500` Internal Server Error

#### Delete one question
  - Description:
    - Delete one question
  - URL:
    - `DELETE` `/questions/:questionId`
  - Headers:
    - `token`: `String` (**required**)
  - Success response: `200` OK
  ```json
    {
      "message": "Successfully deleted question.",
      "id": "<questionId>",
    }
  ```
  - Fail response(s):
    - `401` Unauthorized
    - `500` Internal Server Error

### Error statuses

```json
  {
    "message": "<error message>"
  }
```
  - `400` Bad Request
  <div style="text-align: justify"> The request cannot be fulfilled due to bad syntax. General error when fulfilling the request would cause an invalid state. Domain validation errors, missing data, etc. are some examples. </div>
  - `401` Unauthorized
  <div style="text-align: justify"> The request requires user authentication. If the request already included Authorization credentials, then this response indicates that authorization has been refused for those credentials. This happens when authentication is possible but has failed or not yet been provided. </div>
  - `404` Not Found 😥
  <div style="text-align: justify"> The server has not found anything matching the Request-URI or the requested resource is not found. </div>
  - `500` Internal Server Error
  <div style="text-align: justify"> The server encountered an unexpected condition which prevented it from fulfilling the request. </div>

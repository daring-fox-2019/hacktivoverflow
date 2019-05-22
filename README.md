# hacktivoverflow

## Project setup
```
npm install
```
## Compiles

```javascript
-server
npm run dev

-client
npm run serve
```

## Routes Users
|        Routes       	| HTTP Method 	| Headers 	|                      Body                      	|                     Response                    	|        Description       	|
|:-------------------:	|:-----------:	|:-------:	|:----------------------------------------------:	|:-----------------------------------------------:	|:------------------------:	|
| `/users/signup`       	|     POST    	|   none  	| name: String, <br /> email: String,  <br /> password: String 	| Success: {object}, <br /> Error: Internal server error 	| Sign up a new user       	|
| `/users/signin`       	|     POST    	|   none  	|        email: String,  <br /> password: String        	| Success: {object}, <br /> Error: Internal server error 	| Sign in user             	|
| `/users/`       	|     GET    	|   none  	|        none        	| Success: [{object}], <br /> Error: Internal server error 	| Get all user             	|
| `/users/:id`       	|     GET    	|   none  	|        none        	| Success: {object}, <br /> Error: Internal server error 	| Get a user             	|
| `/users/:id`       	|     DELETE    	|   none  	|        none        	| Success: {object}, <br /> Error: Internal server error 	| Delete a user             	|
| `/users/:id`       	|     PATCH    	|   none  	|        none        	| Success: {object}, <br /> Error: Internal server error 	| Update user watch tag             	|


## Routes Questions
|          Routes         | HTTP Method |    Headers    |                        Body                        |                          Response                         |             Description             |
|:-----------------------:|:-----------:|:-------------:|:--------------------------------------------------:|:---------------------------------------------------------:|:-----------------------------------:|
| `/questions`              |     GET     |      none     |                        none                        | Success: [{ object }],<br /> Error: Internal server error | Get all question                    |
| `/questions/search`       |     POST    |      none     |                   datas: {object}                  | Success: { object },<br /> Error: Internal server error   | Search question with dinamic key    |
| `/questions/user`         |     GET     | token: String |                        none                        | Success: [{ object }],<br /> Error: Internal server error | Get all question a user             |
| `/questions/:id`          |     GET     | token: String |                        none                        | Success: { object },<br /> Error: Internal server error   | Get a question                      |
| `/questions`             |     POST    | token: String | title: String, Description: String, tags: [String] | Success: { object },<br /> Error: Internal server error   | Create a question                   |
| `/questions/:id/upvote`   |    PATCH    | token: String |                        none                        | Success: { object },<br /> Error: Internal server error   | Update upvote value in a question   |
| `/questions/:id/downvote` |    PATCH    | token: String |                        none                        | Success: { object },<br /> Error: Internal server error   | Update downvote value in a question |
| `/questions/:id`          |    DELETE   | token: String |                        none                        | Success: { object },<br /> Error: Internal server error   | Delete a question                   |
| `/questions/:id`          |     PUT     | token: String | title: String, Description: String, tags: [String] | Success: { object },<br /> Error: Internal server error   | Update a question                   |


## Routes Answers
|Routes|HTTP Method|Request|Response|Description| 
|----|----|----|----|----|----|
|        Routes       | HTTP Method |    Headers    |         Body        |                          Response                         |            Description            |
|:-------------------:|:-----------:|:-------------:|:-------------------:|:---------------------------------------------------------:|:---------------------------------:|
| `/answers`            |     GET     |      none     |         none        | Success: [{ object }],<br /> Error: Internal server error | Get all answer                    |
| `/answers/:id`        |     GET     |      none     |         none        | Success: { object },<br /> Error: Internal server error   | Get a answer                      |
| `/answers/:id/upvote` |    PATCH    | token: String |         none        | Success: [{ object }],<br /> Error: Internal server error | Update upvote value in a answer   |
| `/answers/:id/upvote` |    PATCH    | token: String |         none        | Success: { object },<br /> Error: Internal server error   | Update downvote value in a answer |
| `/answers`           |     POST    | token: String | Description: String | Success: { object },<br /> Error: Internal server error   | Create a answer                   |
| `/answers/:id`        |     PUT     | token: String | Description: String | Success: { object },<br /> Error: Internal server error   | Update a answer                   |


## Routes Tag
|   Routes  | HTTP Method |    Headers    |                Body                |                          Response                         |          Description          |
|:---------:|:-----------:|:-------------:|:----------------------------------:|:---------------------------------------------------------:|:-----------------------------:|
| `/tag`     |     GET    | none | none | Success: [{ object }],<br /> Error: Internal server error   | List all tag      |


## Link deploy

```
http://hacktiv-overflow.mprasetiodc.com/
```
# Welcome to Snap Overflow
some mini scale of Stack Overflow!

## List of Routes
There are three main routes for thi api.

### User Routes
Route | HTTP | Header(s) | Body | Description | Success Response | Failed Response
--- | --- | --- | --- | --- | --- | --- 
 /users/register | POST | none | name, password, pp, email, watchTags | register your account | status code 201 and JSON data of items info | status code 500 (internal server error)  or 400 (bad request) and error message
 /users/login | POST | none | email, password  | log in into system | status code 200 and JSON Web Token | status code 500 (internal server error) or 400 (bad request)
 /users | GET | JSON Web Token generated while logging in | none | get logged in user's information | status code 200 and JSON data of logged in user's information | status code 401, or 500 and error message
 /users/addtag/:tag | patch | JSON Web Token generated while logging in | none | add a tag into logged in user's watchTags attribute | status code 201 and update message | status code 401, or 500 and error message
 /users/removetag/:tag | patch | JSON Web Token generated while logging in | none | remove a tag from logged in user's watchTags attribute | status code 201 and update message | status code 401, or 500 and error message
 
 ### Question Routes
 Route | HTTP | Header(s) | Body | Description | Success Response | Failed Response
--- | --- | --- | --- | --- | --- | --- 
 /questions/add | POST | JSON web token generated while logging in (jwtoken) | question, description, watchTags | add new question | status code 201 and JSON data of created question | status code 500 (internal server error) or 401 (not authorized) or 400 (bad request) and error message
 /questions/list?keyword=?&tag=? | GET | JSON web token generated while logging in (jwtoken) | none | show all questions queried by title or by tag | status code 200 and JSON data of questions list | status code 500 (internal server error) or 401 (not authorized) and error message
 /questions/update/:id | PUT | JSON web token generated while logging in (jwtoken) | question, description, watchTags | update a question | status code 201 and JSON data of  update report | status code 500 (internal server error) or 401 (not authorized) or 400 (bad request) and error message
 /questions/delete/:id | DELETE | JSON web token generated while logging in (jwtoken) | none | delete a question | status code 200 and JSON data of delete report | status code 500 (internal server error) or 400 (bad request) or 401 (not authorized) and error message
 /questions/upvote/:id | PATCH | JSON web token generated while logging in (jwtoken) | none | upvote a question | status code 201 and JSON data of update report | status code 400 (bad request) or 500 (internal server error) or 401 (not authorized) and error message
 /questions/downvote/:id | PATCH | JSON web token generated while logging in (jwtoken) | none | downvote a question | status code 201 and JSON data of update report | status code 400 (bad request) or 500 (internal server error) or 401 (not authorized) and error message
 /questions/tags | GET | JSON web token generated while loggingin (jwtoken) | none | get all tags existed in snap overflow | status code 200 and JSON data of all tags | status code 401, or 500 and error message
 
 ### Answer Routes
 Route | HTTP | Header(s) | Body | Description | Success Response | Failed Response
--- | --- | --- | --- | --- | --- | --- 
 /answers/add | POST | JSON web token generated while logging in (jwtoken) | id, questionId, answer, description | answer a question | status code 201 and JSON data of newly created answer | status code 400 (bad request) or 500 (internal server error) or 401 (not authorized) and error message 
 /answers/list | GET | JSON web token generated while logging in (jwtoken) | none | get data of answers | status code 200 and JSON data of answers |  status code 500 (internal server error) or 401 (not authorized) or 400 (bad request) and error message 
 /answers/update/:id | PUT | JSON web token generated while logging in (jwtoken) | answer, description | update answer data | status code 201 and JSON of updated report | status code 500 (internal server error) or 401 (not authorized) or 400 (bad request) and error message
 /answers/delete/:id | DELETE | JSON web token generated while logging in (jwtoken) | none | delete an answer | status code 200 and JSON data of delete report | status code 500 (internal server error) or 401 (not authorized) or 400 (bad request) and error message
 /answers/upvote/:id | PATCH | JSON web token generated while logging in (jwtoken) | none | upvote an answer | status code 201 and JSON data of update report | status code 400 (bad request) or 500 (internal server error) or 401 (not authorized) and error message
 /answers/downvote/:id | PATCH | JSON web token generated while logging in (jwtoken) | none | downvote an answer | status code 201 and JSON data of update report | status code 400 (bad request) or 500 (internal server error) or 401 (not authorized) and error message
 
# Usage
Make sure you have node.js installed on your computer and then run these commands :
 $ npm install 
 
 and then
 $ npm run start

 
Access the API via http://localhost:3500/ 
or try deployed version in 

http://snapoverflow.qfs-hacktiv8.com.s3-website-ap-southeast-1.amazonaws.com 
or
http://snapoverflow.qfs-hacktiv8.com
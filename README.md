# hacktivoverflow

# URL : http://hacktivoverflow.sutansyah.co/

| Path | Method | Request | Success Response | Error Response |
|------------------|:------:|------------------------------------------------------------------------------|-------------------------------------------|----------------|
| /users | POST | body:{name,email,password} | 201, {data: {name, password, email}} | 500 |
| /questions | POST | headers:{token},body:{title:String, content: String} | 201, {data: {title,content,createdAt,updatedAt}} | 500 |
| /questions | GET | query:{title,userId} | 200, {data:[{title,content,createdAt,updatedAt}]} | 500 |
| /questions | PATCH | headers: {token}, body:{_id:id, title:String,content:String} | 200, {data: {title: updated,content:updated}} | 500 |
| /questions | DELETE | headers: {token}, params: {id: questionId} | 200, {data: deleted product} | 500 |
| /questions/search | GET | query: {title} | 200, {data:[{title,content,createdAt,updatedAt}]}  | 500 |
| /answers | GET | query: { content: String, answerId, userId }| 200, { data: { content, answerId, userId, createdAt, updatedAt } }| 500 |
| /answers | POST | headers:{token}, body: { content: String, questionId: String } | 202, {data: { _id,content,questionId,userId,upvotes,downvotes }} | 500 |
| /answers | PATCH | headers: {token}, body:{ content:String } | 200, {data: { _id,content,questionId,userId,upvotes,downvotes }} | 500 |
| /answers/vote | PATCH | headers: {token}, params: { id: answerId } | 200, {data: { _id,content,questionId,userId,upvotes,downvotes }} | 500 |

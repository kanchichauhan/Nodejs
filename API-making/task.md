REST API - JSON


# making a hybrid server which can render HTML as well as JSON
GET /users - HTML Document render
GET /users - List all users

GET /api/users - List all users

# dynamic path paramers - /api/users/:id
GET /api/users/1 - get the user with ID 1
GET /api/users/2 - get the user with ID 2


POST /api/users - create new user

PATCH /api/user/id - edit the user with ID 1

DELETE /api/users/1 - delete the user with ID 1
# RSS2022Q3-RS-Clone
## Backend

## Users
### Get
- Get Users
URL:
/api/users

URL Params:
None

Query Params:
mail: String (optional)
fullname: String (optional)
value: String (optional)
limit: Number (optional)

Data Params:
None


- Get Current User
URL:
/api/users/current

URL Params:
None

Query Params:
None

Data Params:
None


- Get User
URL:
/api/users/:id/info

URL Params:
id - String

Query Params:
None

Data Params:
None


- Get Noted Items
URL:
/api/users/:id/noted

URL Params:
id - String

Query Params:
None

Data Params:
None


### Post
- Create User
URL:
/api/users

URL Params:
None

Query Params:
None

Data Params:
{
  firstName: String,
  lastName: String,
  mail: String,
  password: String,
}


- Create Noted Item
URL:
/api/users/:id/noted

URL Params:
id - String

Query Params:
None

Data Params:
{
  id: String,
  type: String,
}


### Put
- Update User
URL:
/api/users/:id/info

URL Params:
id - String

Query Params:
None

Data Params:
{
  firstName: String,
  lastName: String,
  mail: String,
  password: String,
}


### Delete
- Delete User
URL:
/api/users/:id/info

URL Params:
id - String

Query Params:
None

Data Params:
None


- Delete Noted Item
URL:
/api/users/:id/noted/:notedId

URL Params:
id - String
notedId - String

Query Params:
None

Data Params:
None


## Projects
### Get
- Get Projects
URL:
/api/projects

URL Params:
None

Query Params:
user: String (optional)
author: String (optional)

Data Params:
None


- Get Project
URL:
/api/projects/:id/info

URL Params:
id - string

Query Params:
None

Data Params:
None


- Get Columns
URL:
/api/projects/:id/columns

URL Params:
id - string

Query Params:
None

Data Params:
None


### Post
- Create Project
URL:
/api/projects

URL Params:
None

Query Params:
None

Data Params:
{
  title: String,
  description: String,
  key: String,
  author: String,
  pathImage: String,
  color: String,
}


- Create Teammate
URL:
/api/projects/:id/team

URL Params:
id - String

Query Params:
None

Data Params:
{
  userId: String,
}


- Create Columns
URL:
/api/projects/:id/columns

URL Params:
id - String

Query Params:
None

Data Params:
{
  title: String,
  type: String,
}


### Put
- Update Project
URL:
/api/projects/:id/info

URL Params:
id - String

Query Params:
None

Data Params:
{
  title: String,
  description: String,
  key: String,
  author: String,
  pathImage: String,
  color: String,
}


- Update Project Admin
URL:
/api/projects/:id/change-admin

URL Params:
id - String

Query Params:
None

Data Params:
{
  userId: String
}


- Update Column
URL:
/api/projects/:id/columns/:columnId

URL Params:
id - String
columnId - String

Query Params:
None

Data Params:
{
  title: String,
  type: String,
}


### Delete
- Delete Project
URL:
/api/projects/:id/info

URL Params:
id - String

Query Params:
None

Data Params:
None


- Delete User
URL:
/api/projects/:id/team/:userId

URL Params:
id - String
userId - String

Query Params:
None

Data Params:
None


- Delete Column
URL:
/api/projects/:id/columns/:columnId

URL Params:
id - String
columnId - String

Query Params:
None

Data Params:
None


## Tasks
### Get
- Get Tasks
URL:
/api/tasks

URL Params:
None

Query Params:
author: String (optional)
executor: String (optional)
project: String (optional)
column: String (optional)

Data Params:
None


- Get Task
URL:
/api/tasks/:id/info

URL Params:
id - string

Query Params:
None

Data Params:
None


- Get Comments
URL:
/api/tasks/:id/comments

URL Params:
id - string

Query Params:
None

Data Params:
None


### Post
- Create Task
URL:
/api/tasks

URL Params:
None

Query Params:
None

Data Params:
{
  title: String
  description: String,
  author: String,
  executor: String,
  projectId: String,
  columnId: String,
}


- Create Comment
URL:
/api/tasks/:id/comments

URL Params:
id - String

Query Params:
None

Data Params:
{
  text: String,
  author: String,
  date: Date,
}


### Put
- Update Task
URL:
/api/tasks/:id/info

URL Params:
id - String

Query Params:
None

Data Params:
{
  title: String
  description: String,
  author: String,
  executor: String,
  projectId: String,
  columnId: String,
}


- Update Comment
URL:
/api/tasks/:id/comments/:commentId

URL Params:
id - String
commentId - String

Query Params:
None

Data Params:
{
  text: String,
  dateUpdate: Date,
}


- Update Comment
URL:
/api/tasks/by-column

URL Params:
None

Query Params:
None

Data Params:
{
  currId: String,
  newId: String,
}


### Delete
- Delete Task
URL:
/api/tasks/:id/info

URL Params:
id - String

Query Params:
None

Data Params:
None


- Delete Comment
URL:
/api/tasks/:id/comments/:commentId

URL Params:
id - String
commentId - String

Query Params:
None

Data Params:
None


- Delete Tasks By Column
URL:
/api/tasks/by-column/:columnId

URL Params:
columnId - String

Query Params:
None

Data Params:
None


- Delete Tasks By Project
URL:
/api/tasks/by-project/:projectId

URL Params:
projectId - String

Query Params:
None

Data Params:
None
# Diploma Project
## Backend

## Users
### Get
- Get Users
URL:
/api/users

URL Params:
None

Query Params:
email: String (optional)
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
  email: String,
  password: String,
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
  email: String,
  password: String,
}

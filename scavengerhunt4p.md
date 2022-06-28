## Scavenger Hunt - Preparation for Stage 4

Create another controller in `controllers/users.js` using `expres.Router`.

### Add support for creating a new user

- Add a `users` table with name, email and password_hash fields to your database
- Build an `/api/users` controller (`controlers/users.js`)
- Handle POST requests to `/api/users` by adding a new user to the database with the given name and email

### Handle invalid input

Return a 400 (Bad Request) status and message for these situations:
- The name, email or password is missing
- The email address is already used by an existing user
- The password is not long enough (extension to add more checks)

### Hash passwords with `bcrypt`

When creating a new user, store a hash of the users's new password in the database too.

You'll need to install `bcrypt` with `npm install bcrypt`.

Here's how to use `bcrypt` to hash a password:

```
const bcrypt = require('bcrypt')

function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}
```

### Extensions

- Add more checks to the password - does it contain letters, numbers and symbols?
- Support sending two passwords and check if they match
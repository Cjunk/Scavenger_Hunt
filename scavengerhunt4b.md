## Scavenger Hunt - Stage 4b

## Make log-in work

Add a login form to your `login.html` page (it's ok to have two different forms showing at once) which asks for an email address and a password.

Add an API endpoint for POST to `/api/session` in a new controller (router).
This is the API the log-in form should use, since you're creating a new session, not creating a new user.

This API should expect a JSON body with an email address and a password (from your login form).

It should look up the email address in the database to find the password hash for that user's password, and check if that hash matches the given password.

To check if the password matches, here's the necessary `bcrypt` code for generating a password hash and checking it.

```js
const bcrypt = require('bcrypt')

const generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

function isValidPassword(plainTextPassword, passwordHash) {
    // Returns true or false
    return bcrypt.compareSync(plainTextPassword, passwordHash)
}
```

## Showing the current user

Show in the header bar of your app the name of the currenly logged in user, or if they are not logged in, a link to the login page.

You'll need to make a GET request to `/api/session` which returns information about the current logged in user - their ID, name and email.

If you added this information to the session when the user logged in, you should be able to get these from the session without needing to look it up in the database.

## Add a logout link or button

Add a delete API for `/api/session` to delete the session (which is logging out). 

This one is easier - `req.session.destroy()` will delete the current session.

## Restrict edit-access to logged in users only

Make it so that only logged in users can add/edit or delete challenges. Non-logged-in users should only be able to see the challenges but not change them.

When a user is not logged in, the API calls that add/delete or modify challenges should return a 401 (Unauthorized) status.

## Extension:

You might also want to change app so that the buttons for deleting, editing or adding challenges are hidden or disabled when the user is not logged in.

Add a 'creator' column to the challenges table, when a challenge is created it should remember which user created it (by ID). Show the name of the creator in the challenge list.
## Scavenger Hunt - Stage 4a

## Add a login/signup page

Create another HTML file in your client folder `login.html`.
This should work automatically when you go to `localhost:3000/login.html` (your port might be different).

You should already have the server-side logic for creating new users with a POST request to `/api/users`.

Use that API with your new HTML page and some JavaScript to make a working sign-up form to create new users.
We'll use this same HTML file for both the signup form and the login form.

## Validation

Your API should return a 400 (Bad Request) status code if the information in the sign-up form is invalid.

Show these messages in the UI, to let the user know if:
 - The email is already in use by another user
 - The password is too short (or invalid in some other way)

## Extension

- Create a separate form for a user to log-in (we'll use it soon!)
- Make the user interface nice for having both forms - either show them side by side or let the user swap between the two forms
- Have the signup form require the password to be entered twice and show in the browser whether they match or not while the user is still typing
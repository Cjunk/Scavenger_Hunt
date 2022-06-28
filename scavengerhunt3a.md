## Scavenger Hunt - Stage 3A

### Part 1 - Return 400 status code for 'Bad request'

In your handler for POST requests to `/api/challenges` make it return the correct 400 status code on invalid input.

The following invalid inputs should return a 400 status code with a message.
 - Missing name, description or address (either an empty string or missing entirely)
 - name, description or address that is too long

### Part 2 - Handling failed requests

In your client code - use `.catch` to handle these 400 responses.
In the catch function, check the status code of the response.

If it's a 400 response, find the message that explains why and display it to the user.

```js
axios.post('/api/challenges', data).then((response) => {
  // Handle successful response.
}).catch((err) => {
  // Handle non-successful response.
  console.log(err)
  console.log(err.response)
})
```

### Part 3 - Unexpected errors

Deliberately cause an error in your DB code - maybe edit the SQL so that it's invalid.

Use the `.catch` handler on your DB query to handle unexpected database errors and return a 500 status code with a message.

In your client code, if the response status code is not successful and also not a 400, show the user a message that says "Unknown server error".
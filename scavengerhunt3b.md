## Scavenger Hunt - Stage 3B

### Restructuring

Move your database code into a separate file `/databse/db.js` (just this part that connects to the DB!)

```js
const pg = require('pg')

const db = new pg.Pool({
  database: 'scavenger_hunt',
})

module.exports = db
```

Make it so that you can use `const db = require('./database/db.js')` to access it from your `server.js` file.

### Setting up a challenges controller

Create a folder called `controllers`, that's going to be where we put all our different request handlers.

Create a file in the `controllers` called `challenges.js`. Put all your challenge API handlers in here.

```js
const express = require('express');

const router = express.Router()

router.get('/', (req, res) => {
  // You already have this code
})

// Put your other challenges handlers here too

module.exports = router
```

In your `server.js` you should be able to include this file using:

```js
const challengesController = require('./controllers/challenges')
```
and 
```
app.use('/api/challenges', challengesController);
```

### Add more error handling

Correctly handle the following situations with status codes and nice messages.
  - Finish adding 400 (Bad Request) responses for invalid input when creating new challenges
  - Send a 404 (Not Found) response for GET, PUT or DELETE requests for a challenge ID that doesn't exist (test this in postman)
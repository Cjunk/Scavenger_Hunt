## Scavenger Hunt: OVERVIEW
A Website for listing Scavenger hunt ideas along with the option for users to upload their own ideas.
Register a new user
## Scavenger Hunt: OVERVIEW

<!-- From the in-class codealong you should start with:
 - A `client` folder `that` has `index.html` and `script.js` file
 - A database with a `challenges` table in it and some sample data.
 - An Express app `server.js` which has an endpoint `/api/challenges` to get a list of all challenges. -->

-  1 - Show all the challenges
-  2 - Show all the rules
-  3 - Add new challenges
-  4 - Register users
-  5 - Login old users

<!-- Write some client JavaScript code to show the list of challenges from the API.
 - Use `axios.get` (or `fetch`) to fetch the challenges from `/api/challenges`
 - Create a box for each challenge, with the name, challenge and address details included.
 - Add some styling! -->


### Extensions

<!-- - Make the challenge list only show the name of each challenge. When you click on a challenge it should expand to show you more details and the address of the challenge.
- Create another API endpoint `/api/challenges/:challengeId` to show the information about a single challenge (use this for the expanded details of each challenge). -->


## Scavenger Hunt: TECHNICAL IMPLEMENTATIONS   

-  1 - API server. express
-  2 - postgresql database. 
    - postgres
    - pg
-  3 - API restrictor: no pinging the API server for data updates within 2 mins of the last API update unless there has been database updates
-  4 - HASHED passwords: bcrypt.  password + email hased together for extra security
-  5 - SESSIONS:    
    - connect-pg-simple   
    - express-session
-  6 - Login credentials validation (emails, password lengths etc)
-  7 - Environmental variables: dotenv
-  8 - Developer: nodemon
-  9 - Structured files   
Structure your files like this:
```
  /client
  - /js
      initialize.js
      /components
        - header.js
        - challengeList.js
        - rules.js
```

<!-- ### Part 2 - Component structure

Put all the code to call the API and create the challenge list into a function called `renderChallengeList()`.

Create another function for `renderHeader()` for a header bar which has two links, one for the challenge list, and one for the rules.

Also create a `renderRules()` function to which shows the rules.

Make it so that the challenge list and the rules work like separate pages. You should be able to click "challenge list" to show the challenge list, and if you click "rules" it shows the rules, and it doesn't show both at the same time. -->

<!-- ### Part 3 - Separate files for components

Create a folder in your `js` folder called `components`. Each independant piece of the user interface is a separate component and we can keep them in separate files to help our JS be a bit cleaner.

Structure your files like this:
```
/client
 - /js
    initialize.js
    /components
      - header.js
      - challengeList.js
      - rules.js
```
(you will need `<script>` tags for all of them)

Put `renderHeader` in the `header.js` etc. You'll need to add `<script>` tags to your `index.html` to import each file.

We can use `initalize.js` to do all the things that we do when the page first loads. It's the only `<script>` tag we need to add `defer` on (the other JS files load a bit faster that way).

`initalize.js`
```js
renderHeader()
renderChallengeList()
``` -->

<!-- ### Part 4 - Make it nice to use

Add some CSS to make the layout a bit nicer:
 - The header should have the nav links all on one line (use flex)
 - The nav links should look like they are clickable, including a hover effect which changes the mouse cursor to indicate it's clickable.
 - Any other CSS you want! -->

<!-- ## Extensions

Expandable challenges:
- Make the challenge list only show the name of each challenge. When you click on a challenge it expands to show you more details.
- Make the `/api/challenges/` endpoint only return the `id` and `name` of each challenge
- Add a second `/api/challenges/<id>` to fetch more detail about any particular challenge

Avoid redundant API calls
 - If the challenge list was loaded less than 2 min ago, don't load it again, just use the one from before. -->

 ## Scavenger Hunt: FEATURES 
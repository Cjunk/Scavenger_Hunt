## Scavenger Hunt - Stage 1 - A

From the in-class codealong you should start with:
 - A `client` folder that has `index.html` and `script.js` file
 - A database with a `challenges` table in it and some sample data.
 - An Express app `server.js` which has an endpoint `/api/challenges` to get a list of all challenges.

### Part 1 - list all the challenges

Write some client JavaScript code to show the list of challenges from the API.
 - Use `axios.get` (or `fetch`) to fetch the challenges from `/api/challenges`
 - Create a box for each challenge, with the name, challenge and address details included.
 - Add some styling!


### Extensions

- Make the challenge list only show the name of each challenge. When you click on a challenge it should expand to show you more details and the address of the challenge.
- Create another API endpoint `/api/challenges/:challengeId` to show the information about a single challenge (use this for the expanded details of each challenge).
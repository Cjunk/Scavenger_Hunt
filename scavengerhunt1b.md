## Scavenger Hunt - Stage 1 - B

Follows on from [Stage 1 - A](https://gist.git.generalassemb.ly/katie/16c5e00406b6b96fced456fbeec6f8e6)

### Part 2 - Component structure

Put all the code to call the API and create the challenge list into a function called `renderChallengeList()`.

Create another function for `renderHeader()` for a header bar which has two links, one for the challenge list, and one for the rules.

Also create a `renderRules()` function to which shows the rules.

Make it so that the challenge list and the rules work like separate pages. You should be able to click "challenge list" to show the challenge list, and if you click "rules" it shows the rules, and it doesn't show both at the same time.

### Part 3 - Separate files for components

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
```

### Part 4 - Make it nice to use

Add some CSS to make the layout a bit nicer:
 - The header should have the nav links all on one line (use flex)
 - The nav links should look like they are clickable, including a hover effect which changes the mouse cursor to indicate it's clickable.
 - Any other CSS you want!

## Extensions

Expandable challenges:
- Make the challenge list only show the name of each challenge. When you click on a challenge it expands to show you more details.
- Make the `/api/challenges/` endpoint only return the `id` and `name` of each challenge
- Add a second `/api/challenges/<id>` to fetch more detail about any particular challenge

Avoid redundant API calls
 - If the challenge list was loaded less than 2 min ago, don't load it again, just use the one from before.
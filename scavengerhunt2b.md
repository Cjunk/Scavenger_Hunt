## Scavenger Hunt - Stage 2B

Follows on from [Stage 2A](https://gist.git.generalassemb.ly/katie/bd221112ff67a95d6692e18e5849d380)

### Add new challenges

Using a new component in a separate JS file, add a page to let users create new challenges and add them to the database.
The page should contain a form which lets users fill out the necessary information for a new challenge.

Don't forget to add a link to your header bar so that you can reach this new page. 

Use your new POST API endpoint to add a new challenge when the user submits the form. After adding a new challenge, the app 
should go back to showing the whole challenge list where the new challenge should be visible.

### Delete challenges

Add a new API endpoint to delete specific challenges: `/api/challenges/<id of challenge>`.

Using that enpoint, add a button next to each challenge to allow the user to delete them.

### Edit challenges

Also add the ability to edit existing challenges!

Make a new PUT API endpoint for `/api/challenges/<id of challenge>` which will update an existing challenge with a new name, description and address.

Using that API, make it so the user can click an 'edit' button on any challenge.
It should show a form with the current name, description, etc. already filled out, and when the form is submitted it should send a PUT request to update the challenge.

It's up to you whether you want to use a separate page for the edit form or have the form appear right there in the challenge list page.

### Extensions

- Add a PATCH API endpoint so the name, description and address can be individually updated for a challenge without needing to provide the other fields.
- Make it possible for the user to edit individual parts of each challenge - you could add a separate edit button next to each part.
- Bonus: When editing the name, replace the name with a text box and when the user clicks outside of the text box, it should use the API to 'save' the change (use the `blur` event to detect when the user has finished editing).
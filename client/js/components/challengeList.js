/* CLIENT
        challengeList.js
        WRITTEN BY: JERICHO SHARMAN
        FOR: SCAVENGER HUNT
        Used to access and alter the Challenges list
*/

// Scavenger Hunt module for functions
const API_CHALLENGES = "challenges/";
const API_RULES = `challenges/rules/`;
const TIME_DELAY_FOR_CALLING_API = 2; // in minutes
let API_PATH = "";
export const displayElem = document.getElementById("scavengerWrapper");
export const CHALLENGES = 1;
export const RULES = 2;
let mostRecentChallengeList = {};
let mostRecentDetailsList = {};
let lastTimeTaken = 0; //  Keeps record of the last TIME this API was called.
let freshLook = 0;

//  PUBLIC
export function addNewChallenge() {
  // Menu item
  document.getElementById("addChallengeModal").style.display = "block";
}
export function submitNewChallenge(event) {
  //  This function used by the FORM button to submit to the server
  event.preventDefault();
  const theForm = document.getElementById("formData");
  let formData = new FormData(theForm);
  axios
    .post("/api/challenges", {
      thetitle: formData.get("thetitle"),
      thelocation: formData.get("thelocation"),
      thedescription: formData.get("thedescription"),
    })
    .then((response) => {
      document.getElementById("addChallengeModal").style.display = "none";
      __resetDataAndDisplay();
    })
    .catch((err) => {
      __errorHandler(err, 0);
    });
}
export function deleteEntry(id) {
  // Clicking the del button on the item will cause it to be deleted from the database.
  __deleteEntryFromAPi(id);
}
export function registerNewUserSubmit() {
  // Menu itemThis is the submit handeler on the register new user form
  let formData = new FormData(document.getElementById("registerForm"));
  //  Validate text fields
  if (!formData.get("name")) {
    __errorHandlerDisplay("missing the name", formData.name);
    return;
  }
  if (!formData.get("email")) {
    __errorHandlerDisplay("missing the email", formData.name);
    return;
  }
  const email = formData
    .get("email")
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  if (!email) {
    __errorHandlerDisplay("Thats not a valid email address", formData.name);
    return;
  }
  if (!formData.get("Password")) {
    __errorHandlerDisplay("missing the Password", formData.name);
    return;
  }
  if (!formData.get("CPassword")) {
    __errorHandlerDisplay("missing the Password confirmation", formData.name);
    return;
  }
  if (formData.get("CPassword") != formData.get("Password")) {
    __errorHandlerDisplay("Passwords do not match", formData.name);
    return;
  }
  if (formData.get("Password").length < 10) {
    __errorHandlerDisplay(
      "Password doesnt contain enough characters",
      formData.name
    );
    return;
  }

  axios
    .post("/api/users/createNewUser", {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("Password"),
      confirmPassword: formData.get("CPassword"),
    })
    .then(() => {
      __renderAllChallenges(CHALLENGES);
      
    })
    .catch((err) => {
      __errorHandler(err, 0);
    });
}
export function __clearTheDisplayedList(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
export function __renderAllChallenges(type) {
  /* Combined API call. Calls either the CHALENGES or the RULES. 
    type = 1 CHALLENGES    type = 2 RULES */
  const date = new Date();

  if (
    // Minimise the number of API calls
    date.getHours() * 60 + date.getMinutes() <
    lastTimeTaken + TIME_DELAY_FOR_CALLING_API
  ) {
    if (type == CHALLENGES) {
      __displayAPIData(mostRecentChallengeList, type);
    } else {
      __displayAPIData(mostRecentDetailsList, type);
    }
  } else {
    API_PATH = API_CHALLENGES;
    if (type == RULES) {
      API_PATH = API_RULES;
      // console.log("XXXX. THE type = ", type, API_PATH);
    }
    // console.log("2. THE type = ", type);
    axios({
      method: "get",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      url: `/api/${API_PATH}`,
    })
      .then((response) => {
        lastTimeTaken = date.getHours() * 60 + date.getMinutes(); // Capture the time of the API call
        if (type == CHALLENGES) {
          mostRecentChallengeList = response.data;
          __displayAPIData(response.data, type);
        } // Save t his list to help reduce API calls }
        else {
          mostRecentDetailsList = response.data;
          if (freshLook == 1) {
            __displayAPIData(response.data, type);
          }
          freshLook = 1;
        }
      })
      .catch((err) => {
        __errorHandler(err, type);
      });
  }
}
//  PRIVATE

function __deleteEntryFromAPi(id) {
  axios({
    method: "delete",
    headers: { "Content-Type": "application/x-www-form-urlencoded" }, // due to CORS restrictions
    url: `/api/${API_CHALLENGES}${id}`,
  })
    .then((response) => {
      __resetDataAndDisplay();
    })
    .catch((err) => {
      __errorHandler(err, 0);
    });
}
function __displayAPIData(theList, type) {
  // Displays the API data to the screen. Renders the DOM components and onclick events
  __clearTheDisplayedList(displayElem);

  let loggedin = 0;
  const sendingrequest = async () => {
    const resp = await axios.get("/api/session").then((response) => {
      if (response.data.name) {
        loggedin = 1;
      }
      for (let each of theList) {
        const fullDetailElem = document.createElement("div");
        const NewElem = document.createElement("a");
        NewElem.className = "scavengerclass";
        NewElem.id = each.id;
        NewElem.onclick = function (e) {
          __getDetailsFromApi(e.target.id);
        };
        if (type == CHALLENGES) {
          NewElem.textContent = each.thetitle;
          if (loggedin == 1) {
            const editElem = document.createElement("button");
            const delElem = document.createElement("button");
            editElem.textContent = "edit";
            delElem.textContent = "del";
            delElem.id = NewElem.id;
            delElem.addEventListener("click", function (e) {
              deleteEntry(e.target.id);
            });
            editElem.className = "scavengerListButton";
            delElem.className = "scavengerListButton";
            fullDetailElem.appendChild(editElem);
            fullDetailElem.appendChild(NewElem);
            fullDetailElem.appendChild(delElem);
            fullDetailElem.className = "eachDisplayedDetailBox";
          } else {
            fullDetailElem.appendChild(NewElem);
            fullDetailElem.className = "eachDisplayedDetailBoxRules";
          }
        } else {
          NewElem.textContent = each.thedescription;
          fullDetailElem.appendChild(NewElem);
          fullDetailElem.className = "eachDisplayedDetailBoxRules";
        }
        displayElem.appendChild(fullDetailElem);
      }
    });
  };
  sendingrequest();
}
function __errorHandler(err, variable) {
  __errorHandlerDisplay(err.message, err.response.data.message);
}
function __errorHandlerDisplay(message, dataMessage) {
  document.getElementById("errorTextBox1").textContent = message;
  document.getElementById("errorTextBox2").textContent = dataMessage;
  document.getElementById("errorModal").style.display = "block";
}
function __getDetailsFromApi(id) {
  //  OPERATION: When a user CLICKS the displayed scavenger hunt
  //  DESCRIPTION: Function to make the API call to grab the details of the Scavenger hunt
  //  Pass the id of the challenge to this function. Returns the full details in JSON
  __returnCorrectId(mostRecentDetailsList, id);
  const theDate = new Date();
  if (
    theDate.getHours() * 60 + theDate.getMinutes() <
    lastTimeTaken + TIME_DELAY_FOR_CALLING_API
  ) {
    __renderDetails(
      mostRecentDetailsList[__returnCorrectId(mostRecentDetailsList, id)]
    );
  } else {
    axios({
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }, // due to CORS restrictions
      url: `/api/${API_CHALLENGES}${id}`,
    })
      .then((response) => {
        __renderDetails(response.data[0]);
      })
      .catch((err) => {
        __errorHandler(err, 0);
      });
  }
}
function __renderDetails(details) {
  //    Adds the description and the location to the dialog box and shows the dialog
  document.getElementById("modalTextBox1").textContent = details.thedescription;
  document.getElementById("modalTextBox2").textContent = details.thelocation;
  document.getElementById("myModal").style.display = "block";
}

function __resetDataAndDisplay() {
  //  Forces reset of the client scavenger list by ignoring time restraints
  freshLook = 0;
  lastTimeTaken = 0;
  __renderAllChallenges(RULES);
  lastTimeTaken = 0;
  __renderAllChallenges(CHALLENGES);
}
function __returnCorrectId(array, id) {
  //  CLIENT SIDE ONLY FUNCTION: Will search the array and return the correct array index
  return array.map((arr) => arr.id).indexOf(parseInt(id));
}

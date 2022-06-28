/* CLIENT 
        header.js
        WRITTEN BY: JERICHO SHARMAN
        FOR: SCAVENGER HUNT
    Renders the header. This function will take into account wether the user is currently logged in or not to determine
    the menu items in the header.
    1. Call the server and check if the user is logged in.
    2. Determine the menu items to display based on wether the user is logged in
    3. Add the users name to the display if the user is logged in
    4. Create the NAVIGATION bar.
    ---
    If the variable menuOptionsDisplay is true then display relevant menu items. if false then do not display any menu items (login screen)
  */
import {
  __renderAllChallenges,
  registerNewUserSubmit,
  RULES,
  CHALLENGES,
  __clearTheDisplayedList,
  displayElem,
  submitNewChallenge,
} from "./challengeList.js";
let menuid = 0; // Used to identify each menu item when created.
let audio = new Audio("../audio/mixkit-fast-double-click-on-mouse-275.wav"); // Played when the user clicks a menu item
let theMenuStructure = {
  // This Dict is utilised to produce the menu items. To add another button just add it to this list. The rest is taken care off. TODO: add another key pair to show if its for authenticated users or not. Then correct the logic in the menu creator.
  Register: {
    action: registerNewUser,
    display: true,
    pageTitle: "REGISTER NEW USER",
  },
  Login: { action: loginUser, display: true },
  Logout: { action: logOutUser, display: false },
  "Add Challenge": { action: addNewChallenge, display: true },
  Rules: { action: renderAllRules, display: true, pageTitle: "THE RULES" },
  Challenges: {
    action: renderAllChallenges,
    display: true,
    pageTitle: "THE CHALLENGES",
  },
};
//  PUBLIC FUNCTIONS
export function registerNewUser() {
  __changePageTitleText("REGISTER NEW USER");
  __clearTheDisplayedList(document.getElementById("scavengerWrapper"));
  displayElem.innerHTML =
    '<style>\
        .registerInput {margin:10px;}\
        .registerBut {height:100%;}\
        .registerButDiv{width:100%;}\
        .registerLabel{align-self: center;text-align: right;}\
        </style>\
        <div id="registerUser" style="width:60%;grid-column-start:2;grid-column-end:4;margin:10px auto;border-radius: 15px;background: white;">\
        <form action="" id="registerForm" class="registerForm" style="display:grid;grid-template-columns:1fr 2fr;margin:10px 10%;background:white;">\
        <label class="registerLabel" style="">Name</label>\
        <input class="registerInput" type="name" name="name" placeholder="Name" id="name">\
        <label class="registerLabel" >Email</label>\
        <input class="registerInput" type="email" name="email" placeholder="email" id="email">\
        <label class="registerLabel" >Password</label>\
        <input class="registerInput" type="Password" name="Password" placeholder="Password 10 characters or more" id="Password">\
        <label class="registerLabel" >Confirm Password</label>\
        <input class="registerInput" type="Password" name="CPassword" placeholder="Renter Password 10 characters or more" id="CPassword">\
        <br>\
        <div class="registerButDiv">\
        <button type="submit" id="registerSubmit" class="registerBut">Register</button>\
        <button type="submit" id="registerCancel" class="registerBut">Cancel</button></div>\
        </form>\
        </div>\
        ';
  document.getElementById("registerSubmit").addEventListener("click", (e) => {
    e.preventDefault();
    registerNewUserSubmit();
  });
  document.getElementById("registerCancel").addEventListener("click", (e) => {
    e.preventDefault();
    renderAllChallenges();
  });
}
export function loginUser() {
  let childWindow = window.open("login.html").focus();
}
export function logOutUser() {
  axios.delete("/api/session").then((response) => {
    sessionStorage.clear();
    window.location = "/";
  });
}
export function addNewChallenge() {
  // Menu item
  document.getElementById("addChallengeModal").style.display = "block";
}
export function renderAllRules() {
  // Menu item
  __renderAllChallenges(RULES);
}
export function renderAllChallenges() {
  // Menu item
  __renderAllChallenges(CHALLENGES);
  document
    .getElementById("scavengerWrapper")
    .dispatchEvent(new MouseEvent("click", { shiftKey: true }));
}
export function renderHeader(menuOptionsDisplay) {
  /*
    Renders the header. This function will take into account wether the user is currently logged in or not to determine
    the menu items in the header.
    1. Call the server and check if the user is logged in.
    2. Determine the menu items to display based on wether the user is logged in
    3. Add the users name to the display if the user is logged in
    4. Create the NAVIGATION bar.
    ---
    If the variable menuOptionsDisplay is true then display relevant menu items. if false then do not display any menu items (login screen)
  */
  const sendingrequest = async () => {
    let navBar = __createNavBar(); // Create the nav bar
    navBar.appendChild(__createTitle("Scavenger Hunt"));

    if (menuOptionsDisplay) {
      __changePageTitleText(theMenuStructure.Challenges.pageTitle);
      const resp = await axios.get("/api/session").then((response) => {
        if (response.data.name) {
          username.innerHTML = "Logged in as " + response.data.name;
          __loggedInMenu();
        } else {
          __notLoggedInMenu(); // set the default menu options as not logged in options
        }
      });
      const postNewChallengeBut = document.getElementById("addChallengeButton");
      for (let key in theMenuStructure) {
        //  Create the menu
        if (theMenuStructure[key].display) {
          const menuItem = __createmenuItem(key);
          navBar.appendChild(menuItem);
        }
      }
      postNewChallengeBut.addEventListener("click", (event) => {
        submitNewChallenge(event);
      });
    } else {
      __changePageTitleText("LOGIN");
    }
    document.getElementById("header").appendChild(navBar); // Add it all to the header
    //  The controls for the dialog box.
    let span = document.getElementsByClassName("close")[0]; // The modal dialogue CLOSE symbol
    document.getElementsByClassName("close")[1].onclick = function () {
      document.getElementById("addChallengeModal").style.display = "none";
    };
    document.getElementsByClassName("close")[2].onclick = function () {
      document.getElementById("errorModal").style.display = "none";
    };
    span.onclick = function () {
      document.getElementById("myModal").style.display = "none";
    };
    window.onclick = function (event) {
      if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
      }
      if (event.target == document.getElementById("addChallengeModal")) {
        document.getElementById("addChallengeModal").style.display = "none";
      }
    };
  };
  sendingrequest(); //  Activate the above code to render the header correctly
  //__changePageTitleText(theMenu.Challenges.pageTitle);
}
//  PRIVATE FUNCTIONS

function __changePageTitleText(theText) {
  document.getElementById("listHeading").textContent = theText;
}
function __createNavBar() {
  //  Simple function to create the DOM element for the navbar
  let navBar = document.createElement("nav");
  navBar.id = "navigationBar";
  navBar.className = "navigationBar";
  return navBar;
}
function __createmenuItem(menuText) {
  //  Simple function to create,initialise and return 1 menu element from the string array passed
  menuid++;
  const menuItem = document.createElement("div");
  const menuItemTextElem = document.createElement("a");
  menuItem.id = "menuItem" + menuid.toString();
  menuItem.className = "menuItem";
  menuItemTextElem.textContent = menuText;
  menuItemTextElem.className = "menuItemTextElem";
  menuItem.appendChild(menuItemTextElem);
  menuItem.addEventListener("click", (event) => {
    __playsound();
    if (theMenuStructure[menuText].pageTitle) {
      __changePageTitleText(theMenuStructure[menuText].pageTitle);
    }
    theMenuStructure[menuText].action();
  });
  return menuItem;
}
function __createTitle(text) {
  //  Creates the page title to be displayed on the main page. Text to display is passed in
  let titleItem = document.createElement("p");
  titleItem.className = "titleText";
  titleItem.textContent = text;
  return titleItem;
}
function __loggedInMenu() {
  theMenuStructure["Register"].display = false;
  theMenuStructure["Login"].display = false;
  theMenuStructure["Logout"].display = true;
}
function __notLoggedInMenu() {
  theMenuStructure["Register"].display = true;
  theMenuStructure["Login"].display = true;
  theMenuStructure["Logout"].display = false;
}
function __playsound() {
  try {
    audio.volume = 0.1;
    audio.play();
  } catch {
    console.log("Error occured while playing");
  }
}

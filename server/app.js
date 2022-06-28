/* SERVER  
    APPLICATION TITLE: SCAVENGER _HUNT
    AUTHOR: Jericho Sharman   
    DATE: 05/2022   
    DESCRIPTION:*/
// ********************************************************************************************************************
/* TODO: create a batch file to create the template. Or just have a template folder to copy and paste
    TODO: create VS code extension for template control. or 
    OK to copy and paste this for future applications. 
    echo "Creating client structure and files"
    mkdir client
    mkdir client/css
    mkdir client/js
    mkdir client/js/components
    touch client/js/initialise.js
    mkdir client/media
    mkdir client/media/images
    mkdir client/media/audio
    mkdir client/media/video
    touch client/index.html
    echo "Creating server structure and files"
    mkdir server
    mkdir server/controllers
    mkdir server/db
    touch server/db/schema.sql
    touch server/db/db.js
    touch server/server.js
    echo "Creating files"
    touch .env
    touch notes.txt
    touch README.md
    echo "Installing ...."
    npm init
    npm install dotenv --save
    npm install express --save
    npm install pg --save
    npm install postgres --save
    npm install express-session --save
    npm install connect-pg-simple --save
    npm install bcrypt --save
    npm install nodemon --save-dev 

*/
// SET UP THE INCLUDES
require("dotenv").config();
const { exit } = require("process");
const express = require("express");
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
const db = require("./db/db");
// ********************************************************************************************************************
// CONSTANTS
const appSecretKey = process.env.EXPRESS_SESSION_SECRET_KEY;
const PORT = process.env.PORT;
const app = express(); // Initialise the app

// ********************************************************************************************************************
//  FIXME: Change these for any other application moving forward
//  TODO: Create an object containing the controller name and the location. Then write the logic
//        to create the app.use code for each key:pair. 
// const controllersObject = {
//   challengesController: "./controllers/challenges",
//   usersController: "./controllers/users",
//   sessionController: "./controllers/sessions",
// };
const challengesController = require("./controllers/challenges"); //  \
const usersController = require("./controllers/users"); //    >  These are application specific
const sessionController = require("./controllers/sessions"); //  /
// ********************************************************************************************************************

// SET UP THE APP
app.use(express.urlencoded({ extended: false }));
app.use(express.static("client")); // to use the 'client' folder to serve the home html
app.use(express.json());
app.use("/", (req, res, next) => {
  // 3 paramaters = middlewear
  let cookie = req.headers.cookie;
  console.log("*************************************************************");
  console.log(`SERVER COMMUNICATION ${new Date()} ${req.method}`);
  console.log(`METHOD = ${req.method}`);
  console.log(`PATH = ${req.path}`);
  console.log(`PARAMETERS = `);
  console.log("cookie = ", cookie);
  console.log("req.sessionID = ", req.sessionID); 
  console.log("*************************************************************");
  next();
});
app.use((err, req, res, next) => {
  // 4 parameters = error handeler
  console.log(`I am ERROR middlewear ${new Date()} ${req.method} ${req.path}`);
  console.log(err);
  res.status(500).json({ message: "Unknown SERVER/INSERT error occurred" });
  next();
});
app.use(
  expressSession({
    secret: appSecretKey,
    cookie: { maxAge: 2000000 },
    resave: true,
    saveUninitialized: true,
    store: new pgSession({
      pool: db,
      createTableIfMissing: true,
    }),
  })
);
//  ********************************* TODO: Deleteand replace with a function which creates the app.use from the above 
//  created array.
app.use("/api/challenges", challengesController);
app.use("/api/users", usersController);
app.use("/api/session", sessionController);
// ********************************************************************************************************************
// DEVELOPER comms
if (process.env.DATABASE) {
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
  console.log(`DATABSE ONLINE: ${process.env.DATABASE}`);
} else {
  console.log(
    "No Database has been setup. Go to the .env file and place the database name"
  );
}

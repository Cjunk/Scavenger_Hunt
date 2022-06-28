/* SERVER
    FILE: SESSIONS API handeler 
    AUTHOR: Jericho Sharman   
    DATE: 05/2022   
    DESCRIPTION:*/
// ********************************************************************************************************************
// SET UP THE INCLUDES
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db/db.js");
const router = express.Router();
// ********************************************************************************************************************
// CREATE THE ROUTER
router.post(`/login`, (req, res) => {
  // VALIDATE THE PASSED VARIABLES
  const { name, email, password } = req.body;
  if (!email) {
    res.status(400).json({ status: "false", message: "Missing email details" });
    return;
  }
  if (!password) {
    res.status(400).json({ status: "false", message: "Missing Password" });
    return;
  }
  if (password.length < 10 || password.length > 255) {
    res
      .status(400)
      .json({ status: "false", message: "Incorrect Password length" });
    return;
  }
  console.log("req.sessionID = ", req.sessionID); //TODO: delete console.log
  db.query("SELECT * FROM users WHERE email = $1;", [email])
    .then((dbres) => {
      if (req.session.authenticated) {
        console.log("User already logged in "); //TODO: delete console.log
        res.json(req.session);
      } else {
        bcrypt.compare(
          password + email.toUpperCase(),
          dbres.rows[0].password_hash,
          function (err, result) {
            if (result) {
              console.log("The user has successfully logged in"); //TODO: delete console.log
              req.session.authenticated = true;
              req.session.name = dbres.rows[0].fname;
              req.session.email = dbres.rows[0].email;
              res.cookie("email", dbres.rows[0].email);
              res.cookie("name", dbres.rows[0].fname, { httpOnly: false });
              res.status(200).json(req.session);
            } else {
              //  Wrong password correct email.
              res
                .status(403)
                .json({ status: "false", message: "BAD CREDENTIALS" });
            }
          }
        );
      }
    })
    .catch((reason) => {
      // The user was not found in the database
      res.status(403).json({ status: "false", message: "BAD CREDENTIALS" });
    });
});
// middleware to test if authenticated
function isAuthenticated(req, res, next) {
  if (req.session.authenticated) next();
  else next("route");
}
router.get("/", isAuthenticated, (req, res) => {
  //  Called on ever page refresh to check if the user is already logged in.
  // console.log(req.session) //TODO: delete console.log
  console.log("req.hostname", req.hostname);
  console.log("req.sessionID", req.sessionID);
  console.log("req.session.name", req.session.cookie);
  console.log("req.session.authenticated", req.session.authenticated);
  console.log("User already logged in "); //TODO: delete console.log
  res.json({
    name: req.session.name,
    email: req.session.email,
  });
});
router.get("/", function (req, res) {
  res.redirect('/index.html');
});
router.delete("/", (req, res) => {
  //  LOG the user OUT. Deletes the session cookie.
  req.session.destroy();
  res.json({ success: true });
});
module.exports = router;

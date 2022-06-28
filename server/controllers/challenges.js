/* SERVER 
    FILE: CHALLENGES API handeler 
    AUTHOR: Jericho Sharman   
    DATE: 05/2022   
    DESCRIPTION:*/

// ********************************************************************************************************************
// SET UP THE INCLUDES
require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../db/db.js");
// ********************************************************************************************************************
// CREATE THE ROUTER  
router.get(`/`, (req, res) => {
  dbSelectQuery("SELECT id,theTitle FROM challenges", res);
});
router.get(`/${process.env.RULES}`, (req, res) => {
  dbSelectQuery("SELECT * FROM challenges", res);
});
router.post(`/`, (req, res) => {
  if (!req.body.thetitle || !req.body.thedescription || !req.body.thelocation) {
    res.status(400).json({ status: "false", message: "Missing information" });
    return;
  }
  if (
    req.body.thetitle.length > 20 ||
    req.body.thedescription.length > 200 ||
    req.body.thelocation.length > 20
  ) {
    res.status(400).json({ status: "false", message: "String too long" });
    return;
  }
  db.query(
    "INSERT INTO challenges (theTitle,theDescription,theLocation) VALUES ($1,$2,$3);",
    [req.body.thetitle, req.body.thedescription, req.body.thelocation]
  )
    .then((dbres) => {
      res.json({ status: "ok" });
    })
    .catch((reason) => {
      //console.log(reason)
      res.status(500).json({ message: "Unknown SERVER/INSERT error occurred" });
    });
});
router.delete(`/:id`,isAuthenticated, (req, res) => {
  db.query("DELETE FROM challenges WHERE id=$1;", [req.params.id]).then(
    (results) => {
      if (results.rowCount != 0) {
        res.json({ status: results.rowCount });
      } else {
        res.status(404).json({ status: "record not found" });
      }
    }
  );
});
router.delete("/:id", function (req, res) {
  res.send("YOU'RE NOT AUTHENTICATED TO DELETE")
});
router.put(`/`, (req, res) => {
  res.send("PUT Request Called");
});

// ********************************************************************************************************************
// INTERNAL FUNCTIONS
function dbSelectQuery(theQuery, res) {
  //  Function to execute SQL code in the database
  return db
    .query(theQuery)
    .then((dbResults) => {
      res.json(dbResults.rows);
    })
    .catch((reason) => {
      console.log("INTERNAL DATABASE ERROR", reason);
      res.status(500).json({ message: "Cannot find data" });
    });
}
function isAuthenticated(req, res, next) {
  if (req.session.authenticated) next();
  else next("route");
}
module.exports = router;

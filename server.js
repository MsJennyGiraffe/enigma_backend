const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const cryptor = require('./lib/cryptor');

let ObjectID = mongodb.ObjectID;

let ENCRYPTED_COLLECTION = "encrypted";
let DECRYPTED_COLLECTION = "decrypted";

let app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Create a database letiable outside of the database connection callback to reuse the connection pool in your app.
let db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  let server = app.listen(process.env.PORT || 8080, function () {
    let port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/encrypts", function(req, res) {
  db.collection(ENCRYPTED_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/encrypts", function(req, res) {
  let newMessage = req.body;
  newMessage.createDate = new Date();
  newMessage.messageType = "encrypted";
  newMessage.encryptedMessage = cryptor(newMessage.messageString,[4,8,10,103],"encrypt");

  if (!(req.body.originalMessage)) {
    handleError(res, "Message can't be blank", 400);
  } else {
    db.collection(ENCRYPTED_COLLECTION).insertOne(newMessage, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new encrypted message");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/*  "/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

// app.get("/contacts/:id", function(req, res) {
//   db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
//     if (err) {
//       handleError(res, err.message, "Failed to get contact");
//     } else {
//       res.status(200).json(doc);
//     }
//   });
// });
//
// app.put("/contacts/:id", function(req, res) {
//   let updateDoc = req.body;
//   delete updateDoc._id;
//
//   db.collection(CONTACTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
//     if (err) {
//       handleError(res, err.message, "Failed to update contact");
//     } else {
//       res.status(204).end();
//     }
//   });
// });
//
// app.delete("/contacts/:id", function(req, res) {
//   db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
//     if (err) {
//       handleError(res, err.message, "Failed to delete contact");
//     } else {
//       res.status(204).end();
//     }
//   });
// });

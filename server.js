"use strict";
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const Cryptor = require('./lib/cryptor');

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

app.get("/encrypts", function(req, res) {
  db.collection(ENCRYPTED_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get encrypts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/encrypts", function(req, res) {
  let newMessage = req.body;
  let cryptor = new Cryptor({rotations: [4,8,10,103] , cryptType: "encrypt"})
  newMessage.createDate = new Date();
  newMessage.messageType = "encrypted";
  newMessage.encryptedMessage = cryptor.rotateMessage(newMessage.originalMessage);

  if (!(req.body.originalMessage)) {
    handleError(res, "Message can't be blank", 400);
  } else {
    db.collection(ENCRYPTED_COLLECTION).insertOne(newMessage, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create encrypted message");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

app.get("/encrypts/:id", function(req, res) {
  db.collection(ENCRYPTED_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get message");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.get("/decrypts", function(req, res) {
  db.collection(DECRYPTED_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/decrypts", function(req, res) {
  let newMessage = req.body;
  let cryptor = new Cryptor({rotations: [4,8,10,103] , cryptType: "decrypt"});
  newMessage.createDate = new Date();
  newMessage.messageType = "decrypted";
  newMessage.decryptedMessage = cryptor.rotateMessage(newMessage.originalMessage);

  if (!(req.body.originalMessage)) {
    handleError(res, "Message can't be blank", 400);
  } else {
    db.collection(DECRYPTED_COLLECTION).insertOne(newMessage, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create decrypted message");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

app.get("/decrypts/:id", function(req, res) {
  db.collection(DECRYPTED_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get message");
    } else {
      res.status(200).json(doc);
    }
  });
});

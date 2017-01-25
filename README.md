# enigma_backend

Project based off of a Turing School [project](https://github.com/turingschool/curriculum/blob/master/source/projects/enigma.markdown) for module 1. Uses node.js and mongodb instead of Ruby.

## Setup
Go to project and clone project
```
$ git clone git@github.com:MsJennyGiraffe/enigma_backend.git
```

Install Mongo with homebrew.
```
$ brew install mongodb
```

Start mongodb

From project root folder:
```
$ mkdir database
```

```
$ mongod --dbpath=./database
```

Start locally in another terminal window
```
$ MONGODB_URI="mongodb://localhost:27017/database" npm start
```

To test creating an encrypts entry in the db locally
From another terminal window

```
$ curl -H "Content-Type: application/json" -d '{"originalMessage": "trees"}' http://localhost:8080/encrypts
```

Then from a browser visit `http://localhost:8080/encrypts`

You should see

```
[
- {
  _id: "5882b06ad6049c625ea98c36",
  originalMessage: "trees",
  createDate: "2017-01-21T00:50:50.582Z",
  messageType: "encrypted",
  encryptedMessage: "xzodw"
  }
]
```

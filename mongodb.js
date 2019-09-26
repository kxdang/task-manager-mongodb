//CRUD crete read update delete

// const mongodb = require("mongodb");
// const mongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

mongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database!");
    }

    const db = client.db(databaseName);

    // db.collection("users").insertOne(
    //   {
    //     name: "Kien",
    //     age: 25
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert user");
    //     }

    //     console.log(result.ops);
    //   }
    // );
    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Dan",
    //       age: 28
    //     },
    //     {
    //       name: "Mikey",
    //       age: 26
    //     }
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert documents");
    //     }

    //     console.log(result.ops);
    //   }
    // );
    db.collection("tasks").insertMany(
      [
        {
          description: "Finish course",
          completed: false
        },
        {
          description: "Be a boss",
          completed: true
        },
        {
          description: "Do challenge",
          completed: true
        }
      ],
      (error, result) => {
        if (error) {
          console.log("Something went wrong");
        }

        console.log(result.ops);
      }
    );
  }
);

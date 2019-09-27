//CRUD crete read update delete

// const mongodb = require("mongodb");
// const mongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require("mongodb"); //destructoring from mongodb

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectID();

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database!");
    }

    const db = client.db(databaseName);

    db.collection("tasks")
      .updateMany(
        {
          completed: true
        },
        {
          $set: {
            completed: false
          }
        }
      )
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });

    // db.collection("users")
    //   .updateOne(
    //     {
    //       _id: new ObjectID("5d8cd94269884c1444533919")
    //     },
    //     {
    //       $inc: {
    //         age: 5
    //       }
    //     }
    //   )
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }
);

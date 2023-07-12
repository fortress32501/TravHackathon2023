const mongodb = require("mongodb"); // mongo client library
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "hackathon";
const collectionName = "employees"
let collection;

async function startup() {
  let client = new MongoClient(url);
  await client.connect();
  db = client.db(dbName);
  collection = db.collection(collectionName);
}
startup();
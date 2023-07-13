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

module.exports.findAllEmployees = function (callback) {
    let dataPromise = collection.find({}).toArray();
    dataPromise.then((employees) => callback(employees));
};

module.exports.findEmployees = function (id, callback) {
  let dataPromise = collection.find({'manager': +id}).toArray();
  dataPromise.then((employees) => callback(employees));
};

module.exports.findEmployee = function (id, callback) {
  let dataPromise = collection.findOne({'employee_id': +id});
  dataPromise.then((employee) => callback(employee));
};

module.exports.findEmployeeForLogin = function (first_name, last_name, password, callback) {
    let dataPromise = collection.findOne({'first_name': first_name, 'last_name': last_name, 'password': password});
    dataPromise.then((employee) => callback(employee));
};
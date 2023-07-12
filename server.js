const cors = require('cors');
const express = require("express");
var dao = require("./mongo-dao");

const app = express();
const port = 4000;

app.use(express.json()); //Parse JSON body
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello There")
  });

app.get("/employees", (req, res) => {
    dao.findAllEmployees(
        (employees) => {
            if(!employees) {
                res.status(404).end();
            } else {
                res.send(employees);
            }
        })
}) 

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});

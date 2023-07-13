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

app.post("/api/login", (req, res) => {
    const {first_name, last_name, password} = req.body;
    console.log({first_name, last_name, password})

    dao.findEmployeeForLogin( first_name, last_name, password,
        (employee) => {
            if(!employee) {
                res.send({});
            } else {
                console.log(employee);
                res.send(employee);
            }
        })
})

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});

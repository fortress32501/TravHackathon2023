const cors = require('cors');
const express = require("express");
const { spawn } = require('child_process');
var dao = require("./mongo-dao");

const app = express();
const port = 4000;

app.use(express.json()); //Parse JSON body
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello There")
  });

app.get("/api/employees", (req, res) => {
    dao.findAllEmployees(
        (employees) => {
            if(!employees) {
                res.status(404).end();
            } else {
                res.send(employees);
            }
        })
}) 

app.get("/api/employees/:id", (req, res) => {
    dao.findEmployee(req.params.id,
        (employee) => {
            if(!employee) {
                res.status(404).end();
            } else {
                res.send(employee);
            }
        })
}) 

app.get("/api/managers/:id", (req, res) => {
    console.log(req.params.id)
    dao.findEmployees(req.params.id,
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

    dao.findEmployeeForLogin( first_name, last_name, password,
        (employee) => {
            if(!employee) {
                res.send({});
            } else {
                res.send(employee);
            }
        })
})

app.post("/predict", (req, res) => {
    const {location, job_role, years_of_experience} = req.body;
    let data_vals = [location, job_role, years_of_experience]
    console.log(data_vals)
    // Spawn a child process to execute the predict.py script
    const pythonScript = spawn('python', ['predict.py']);

    // Send the data to the predict.py script via stdin
    pythonScript.stdin.write(JSON.stringify(data_vals));
    pythonScript.stdin.end();

    let predictionData = '';

    // Collect the predicted data from stdout of the predict.py script
    pythonScript.stdout.on('data', (data) => {
        predictionData += data.toString();
        console.log(predictionData)
    });
    
    // Handle the completion of the predict.py script
    pythonScript.on('close', (code) => {
        if (code === 0) {
            // Parse the predicted data
            const predictions = JSON.parse(predictionData);
            res.send(JSON.stringify(predictions[0][0]))
            // Return the predictions as the response
            //res.send(predictionData);
        } else {
            // Return an error response
            res.status(500).json({ error: 'Prediction failed' });
        }
    });
})

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});

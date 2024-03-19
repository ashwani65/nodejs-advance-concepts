const express = require("express");

const app = express();
const { Worker } = require("worker_threads")
const port = process.env.port || 3030;

app.get("/non-blocking/", (req, res)=>{
    res.status(200).send("This page is non-blocking");
})

// app.get("/blocking", async (req, res)=>{
//     let counter = 0;
//     // iterating 20M times - CPU Bound Task
//     for (let i = 0;i<20_000_000_000; i++){
//         counter++;
//     } 
//     res.status(200).send(`result is ${counter}`);
// })

app.get("/blocking", async (req, res)=>{
    const worker = new Worker("./worker.js")
    worker.on("message", (data) => {
        res.status(200).send(`result is ${data}`)
    });
    worker.on("error", (error) => {
        res.status(404).send(`An error occured ${error}`)
    });
})

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})
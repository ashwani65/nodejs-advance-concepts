/* by default - nodejs runs on single core... and if there are more cores avaiable... why not utilize them ?
Clusters - collection of node, somehow interconnected to handle user request(uses round robin algorithm)

API gateway - request are not tightly coupled
*/

import express from 'express';

const app = express();
const port = process.env.port || 3031;


app.get("/heavy", async (req, res)=>{
    let total = 0;
    for(let i=0;i<1000_000_000;i++){
        total++;
        console.log('test');
    }
    res.send(`The result of the CPU intensive task is ${total}\n`)
})

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
    console.log(`worker pid=${process.pid}`);
})
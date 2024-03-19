const { workerData,  parentPort } = require("worker_threads");

let counter = 0;
// iterating 20M times - CPU Bound Task
for (let i = 0;i<20_000_000_000 / workerData.thread_count; i++){
    counter++;
}

parentPort.postMessage(counter);

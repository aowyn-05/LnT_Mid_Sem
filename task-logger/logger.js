//Task-1
console.log("Task Logger Started");

//Task-2
/*
V8 runs our JavaScript code.
libuv handles tasks like reading files in the background.
This allows Node.js to continue running without waiting for the file to finish reading.
*/

const fs = require('fs');

fs.readFile('task.txt', 'utf8', (err, data) => {
    console.log(data);
});

console.log("Task Logger Started - Updated");

//Task-3
/*
Method used from the fs module:
- fs.readFile()

Documentation referenced:
Node.js File System (fs) Documentation
*/

//Task-4

fs.readFile('task.txt', 'utf8', (err, data) => {
    if (err) throw err;

    const timestamp = new Date().toLocaleString();

    console.log(`[${timestamp}] ${data}`);
});

// Task 5: Get task from command line
const task = process.argv[2];

if (task) {
    console.log(`Task: ${task}`);
    console.log("Do you want to save this task? (y/n)");

    process.stdin.setEncoding('utf8');

    process.stdin.once('data', (input) => {
        const answer = input.trim().toLowerCase();

        if (answer === 'y') {
            fs.appendFileSync('task.txt', task + '\n');
            console.log("Task saved successfully!");
        } else {
            console.log("Task not saved.");
        }

        process.exit();
    });
}
// Task 7: Debugging demonstration
const userTask = process.argv[2];

console.log("Debugging task: " + userTask); // BUG: userTaks is misspelled
// Debugging: The error showed that 'userTaks' was not defined.
// I found that the variable name was misspelled and corrected it to 'userTask'.

// Task 8: Asynchronous callback function

function saveTaskCallback(task, callback) {
    fs.appendFile('tasks.txt', task + '\n', (err) => {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

// Call the function
saveTaskCallback('Complete Task 8', (err) => {
    if (err) {
        console.log('Failed to save task.');
    } else {
        console.log('Task saved successfully.');
    }
});

// Task 9: Node Timers

// Reminder after 5 seconds
setTimeout(() => {
    console.log("Reminder: review your tasks");
}, 5000);

// Print number of tasks every 3 seconds
const taskInterval = setInterval(() => {
    fs.readFile('tasks.txt', 'utf8', (err, data) => {
        if (err) {
            console.log("Error reading tasks.");
            return;
        }

        const tasks = data.trim() ? data.trim().split('\n') : [];
        console.log("Number of tasks logged:", tasks.length);
    });
}, 3000);

// Stop the interval after 15 seconds
setTimeout(() => {
    clearInterval(taskInterval);
    console.log("Task count monitoring stopped.");
}, 15000);

// Task 10: JavaScript Promises

function saveTaskPromise(task) {
    return fs.promises.appendFile('tasks.txt', task + '\n');
}

// Call the Promise-based function
saveTaskPromise('Complete Task 10')
    .then(() => {
        console.log('Task saved successfully.');
    })
    .catch((err) => {
        console.log('Failed to save task.');
    });

    
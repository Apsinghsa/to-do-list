const express = require('express');
const path = require('path');
const fs = require('fs').promises; // Use promises for async file operations

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Middleware to parse JSON bodies

const tasksFilePath = path.join(__dirname, 'public', 'tasks.json');

// Route to serve the index.html file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// API endpoint to get all tasks
app.get('/tasks', async (req, res) => {
    try {
        const data = await fs.readFile(tasksFilePath, 'utf8');
        const tasks = JSON.parse(data);
        res.json(tasks);
    } catch (err) {
        console.error('Error reading tasks:', err);
        res.status(500).send('Server error');
    }
});

// API endpoint to add a new task
app.post('/tasks', async (req, res) => {
    try {
        const { taskname } = req.body;
        if (!taskname) {
            return res.status(400).send('Task name is required');
        }

        const data = await fs.readFile(tasksFilePath, 'utf8');
        const tasks = JSON.parse(data);

        const taskid = "id" + Date.now();
        const newTask = { taskid: taskid, taskname: taskname };
        tasks.push(newTask);

        await fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2));
        res.status(201).json(newTask); // Respond with the new task
    } catch (err) {
        console.error('Error adding task:', err);
        res.status(500).send('Server error');
    }
});

// API endpoint to delete a task
app.delete('/tasks/:taskid', async (req, res) => {
    try {
        const taskid = req.params.taskid;

        const data = await fs.readFile(tasksFilePath, 'utf8');
        let tasks = JSON.parse(data);

        tasks = tasks.filter(task => task.taskid !== taskid);

        await fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2));
        res.status(200).send('Task deleted');
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
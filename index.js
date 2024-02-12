const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

require('dotenv').config();
require('./db');


PORT = 8000;

app.use(express.json());
app.use(cookieParser());

app.use(cors())



app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tasks', taskRoutes);


app.get('/', (req, res) => {
    res.json({
        message: 'Task Manager API is working!'
    })
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
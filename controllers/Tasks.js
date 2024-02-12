const Task = require('../models/Task')


//create a task
exports.createTask= async (req, res) => {
   try{
    const {name, description,dueDate}=req.body;

    if(!name || !description){
        throw new Error("All fields are mandatory")
    }

    const task = new Task({
        name,
        description,
        dueDate,
        owner: req.user._id
    });

    await task.save();
    res.status(201).json({task, message: "Task Created Successfully"});
   }
   catch(err){
         res.status(400).json({error: err});
   }
};


// get user tasks
exports.getAllTask= async (req, res) => {
    try{
        const tasks = await Task.find({
            owner: req.user._id
        })
        res.status(200).json({tasks, count: tasks.length, message: "Tasks Fetched Successfully"});
    }
    catch(err){
        res.status(500).json({error: err});
    }
};

// get single task of user

exports.getSingleTask=async (req,res)=>{
    const taskid = req.params.id;
  
    try{
        const task = await Task.findOne({
            _id: taskid,
            owner: req.user._id
        });
        if(!task){
            return res.status(404).json({message: "Task not found"});
        }
        res.status(200).json({task, message: "Task Fetched Successfully"});
    }
    catch(err){
        res.status(500).send({error: err});
    }
}


// update user task by task id 
exports.updateTask= async (req,res)=>{
    const taskid = req.params.id;
    const updates = Object.keys(req.body);

    const allowedUpdates = ['name','description','completed','dueDate'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).json({error: "Invalid Updates"});
    }

    try{
      const task = await Task.findOne({
            _id: taskid,
            owner: req.user._id
      });

        if(!task){
            return res.status(404).json({message: "Task not found"});
        }

        updates.forEach(update => task[update] = req.body[update]);
        await task.save();

        res.json({
            message: "Task Updated Successfully",
        })
    }
    catch(err){
        res.status(500).json({error: err});
    }
};


// delete a task by id
exports.deleteTask= async (req,res)=>{
    const taskid = req.params.id;

    try{
        const task = await Task.findOneAndDelete({
            _id: taskid,
            owner: req.user._id
        });
        if(!task){
            return res.status(404).json({message: "Task not found"});
        }
        res.status(200).json({task, message: "Task Deleted Successfully"});
    }
    catch(err){
        res.status(500).json({error: err});
    }
};
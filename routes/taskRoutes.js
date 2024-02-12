const express = require("express");
const router = express.Router();

const auth  = require("../middlewares/auth");

const {
  createTask,
  getAllTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/Tasks");

router.get("/test", auth, (req, res) => {
  res.json({
    message: "Task routes are working!",
    user: req.user,
  });
});

// to create a task
router.post("/", auth, createTask);

// to get all tasks
router.get("/", auth, getAllTask);

// to get single task

router.get('/:id', auth , getSingleTask);

// to update the task
router.patch("/:id", auth, updateTask);

// to delete the task
router.delete("/:id", auth, deleteTask);
module.exports = router;

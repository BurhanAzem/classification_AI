const express = require("express");
const router = express.Router();
const github_repo_controller = require("../controllers/github_repo_controller");


//router.post("/api/admin/get_all_trainee/:filename",traineeController.get_all_trainee);//get trainee data

router.get('/repositories/:username', github_repo_controller.fetchUserRepositories)

module.exports = router;
 
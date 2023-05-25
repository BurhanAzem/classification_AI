const express = require("express");
const router = express.Router();
const searchHistory_controller = require("../controllers/searchHistory_controller");
const SearchHistory = require("../models/searchHistory");



//router.post("/api/admin/get_all_trainee/:filename",traineeController.get_all_trainee);//get trainee data


router.post('/', searchHistory_controller.register_savedJob)
router.get('/:id', searchHistory_controller.get_all_savedJobs)


router.delete('/:id', searchHistory_controller.delete_savedJob)
module.exports = router;
 
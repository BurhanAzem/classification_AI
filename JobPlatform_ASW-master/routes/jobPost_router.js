const express = require("express");
const router = express.Router();
const jobPost_controller = require("../controllers/jobPost_controller");



router.post('/', jobPost_controller.register_jobPost)
router.get('/:id', jobPost_controller.get_jobPost_byId)
router.put('/:id', jobPost_controller.update_jobPost)
router.delete('/:id', jobPost_controller.delete_jobPost_byId)
router.get('/', jobPost_controller.get_all_jobPost)


module.exports = router;
 
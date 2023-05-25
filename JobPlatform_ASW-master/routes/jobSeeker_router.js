const express = require("express");
const router = express.Router();
const jobSeeker_controller = require("../controllers/jobSeeker_controller");
const requireAuthentication = require("./auth");



router.post('/login', jobSeeker_controller.login)
router.post('/', requireAuthentication, jobSeeker_controller.register_jobSeeker)
router.get('/:id', requireAuthentication, jobSeeker_controller.get_jobSeeker_byId)
router.get('/:id/bestmatch', requireAuthentication, jobSeeker_controller.get_bestMatches)
router.put('/:id', requireAuthentication, jobSeeker_controller.update_jobSeeker)
router.delete('/:id', requireAuthentication, jobSeeker_controller.delete_jobSeeker_byId)
router.get('/', requireAuthentication, jobSeeker_controller.get_all_jobSeeker)

module.exports = router;
 
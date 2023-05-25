const express = require("express");
const router = express.Router();
const employer_controller = require("../controllers/employer_controller");
const requireAuthentication = require("./auth");


//router.post("/api/admin/get_all_trainee/:filename",traineeController.get_all_trainee);//get trainee data
router.post('/login', employer_controller.login)
router.post('/', requireAuthentication, employer_controller.register_employer)
router.put('/:id', requireAuthentication, employer_controller.update_employer)
router.get('/:id', requireAuthentication, employer_controller.get_employer_byId)
router.delete('/:id', requireAuthentication, employer_controller.delete_employer_byId)
router.get('/', requireAuthentication, employer_controller.get_all_employer)

module.exports = router;
 
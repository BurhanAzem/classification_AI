const express = require("express");
const router = express.Router();
const requirement_controller = require("../controllers/requirement_controller");


router.post('/', requirement_controller.register_requirement)
router.get('/:id', requirement_controller.get_requirement_byId)
router.put('/:id', requirement_controller.update_requirement)
router.delete('/:id', requirement_controller.delete_requirement_byId)
router.get('/', requirement_controller.get_all_requirement)

module.exports = router;
 
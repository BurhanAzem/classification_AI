const express = require("express");
const router = express.Router();

const jobApplication_controller = require("../controllers/jobApplication_controller");





router.get('/:id', jobApplication_controller.get_Applications)
router.put('/accept-reject', jobApplication_controller.update_jobApplication)

router.get('/public/assets/h', (req, res) => {
    res.render('file');
})
router.post('/', jobApplication_controller.create_jobApplication)
router.get('', jobApplication_controller.get_all_job_applications)


module.exports = router;
 
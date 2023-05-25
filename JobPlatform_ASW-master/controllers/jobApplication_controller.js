
const jobApplication_model = require("../models/jobApplication");
const path = require('path')
const jobSeeker_model = require("../models/jobSeeker");
const jobPost_model = require("../models/jobPost");
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets")
},
filename: (req, file, cb) => {
    cb(null, file.originalname)
    }
})

const upload = multer({ storage })

class jobApplication_controller{



    static async create_jobApplication(req, res,next) {
        upload.single("file")(req, res, async function (err) {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: "Error uploading file" });
              }
              if (!req.file) { 
                return res.status(400).json({ error: "No file found in request" });
              }
            const resumePath = req.file.path 
            console.log(resumePath);
            const {jobPostID,jobSeekerID,coverLetter} = req.body;
            console.log(jobPostID,jobSeekerID,coverLetter, req.body);
          var jobSeeker = await jobSeeker_model.get_jobSeeker(jobSeekerID)
          if(!jobSeeker){
              res.Stauts(404).json("jobSeeker not exist")
           }
        
          var jobPost = await jobPost_model.get_jobPost(jobPostID)
          if(!jobPost){
              res.Stauts(404).json("jobPost not exist")
          }
            var result = await jobApplication_model.create_application(
              jobPostID,
              jobSeekerID,
              resumePath,
              coverLetter,
              "pending"
            );
          if (result) {
              res.send(result);
            } else {
            res.send({message: "empty"});
          }
        });
        }


      static async get_all_job_applications(req, res) {
        //try {
          var result = await jobApplication_model.get_all();
    
          if (result) {
            res.send(result);

          } else {
          res.send({message: "empty"});
        }
      }



      static async update_jobApplication(req, res) {
      
      const { id, status } = req.body;

      var result = await jobApplicationModel.update(
        id,
        status
      );

    if (result) {
        res.send(result);
      } else {
      res.send({message: "empty"});
    }
  }
  
  static async get_Applications(req, res) {
        //try {
            const id  = parseInt(req.params.id);
          var result = await jobApplicationModel.get_jobApplications(id);
    
          var extractedData = result.map((Apps) => {
            return {
                ApplicationID: Apps.ApplicationJobID,
                JobPostID: Apps.JobPostID,
                JobSeekerID:Apps.JobSeekerID,
                ResumePath: Apps.ResumePath,
                CoverLetter:Apps.CoverLetter,
                Status:Apps.Status
            };
          });
    
    
    
          if (extractedData) {
            res.send(extractedData);
          }
          else {
      res.send({message: "empty"});
    }

  }
}
module.exports = jobApplication_controller;

const jobPostModel = require("../models/jobPost");
const employerModel = require("../models/employer");
const requirementModel = require("../models/requirement");

class jobPost_controller{

    static async register_jobPost(req, res) {
        
          const {         
            employerID,
            requirementID,
            title,
            description,
            startSalary,
            endSalary,
            Stauts } = req.body;
          var employer = await employerModel.get_employer(employerID)
          if(!employer){
            res.Stauts(404).json("employer not exist")
          }

          var requirement = await requirementModel.get_requirement(requirementID)
          if(!requirement){
            res.Stauts(404).json("requirement not exist")
          }
          var result = await jobPostModel.create_jobPost(
            employerID,
            requirementID,
            title,
            description,
            startSalary,
            endSalary,
            Stauts
          );
        if (result) {
            res.send(result);
          } else {
          res.send({message: "empty"});
        }
      }

      static async update_jobPost(req, res) {
        const JobPostID = parseInt(req.params.id)
        const { employerID,
            requirementID,
            title,
            description,
            startSalary,
            endSalary,
            Stauts } = req.body;
        
        var result = await employer_model.update(
            employerID,
            requirementID,
            title,
            description,
            startSalary,
            endSalary,
            Stauts
        );
  
      if (result) {
          res.send(result);
        } else {
        res.send({message: "empty"});
      }
    }
  
      

    
      static async get_jobPost_byId(req, res) {
        //try {
          const id  = parseInt(req.params.id);
          console.log(id);
          var result = await jobPostModel.get_jobPost(id);
    
          if (result) {
            res.send(result);
          } else {
          res.send({message: "empty"});
        }
      }
    
    
      static async get_all_jobPost(req, res) {
        //try {
          var result = await jobPostModel.get_all();
    
          if (result) {
            res.send(result);
          } else {
          res.send({message: "empty"});
        }
      }
    
    
     static async delete_jobPost_byId(req, res) {
        //try {
          const id  = parseInt(req.params.id);
          console.log(id);
          var result = await jobPostModel.delete_jobpost(id);
    
          if (result) {
            res.send(result);
          } else {
          res.send({message: "empty"});
        }
      }
}

module.exports = jobPost_controller
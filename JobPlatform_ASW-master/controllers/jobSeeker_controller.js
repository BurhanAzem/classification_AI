const jobSeekerModel = require("../models/jobSeeker");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class jobSeeker_controller{
    static async login(req, res) {
        try {
          const { email, password } = req.body;
          console.log(email + " " + password);
          var jobSeeker = await jobSeekerModel.get_jobSeeker_by_email(email);
          if (!jobSeeker[0]) return res.status(400).json({ msg: "User does not exist. " });
          console.log( jobSeeker[0]);
          const passwordHashed_in = await bcrypt.hash(password, jobSeeker[0].PasswordSlot);
          console.log( passwordHashed_in);          
          
          if (!passwordHashed_in === jobSeeker[0].PasswordHashed) return res.status(400).json({ msg: "Invalid credentials. " });
      
          const token = jwt.sign({ id: jobSeeker[0].JobSeekerID }, 'SecretKey');
          delete jobSeeker[0].password;
          const jobSeeker_name = jobSeeker[0].Name
          res.status(200).json({ token, jobSeeker_name });
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
    }


  static async register_jobSeeker(req, res) {
    //try {
      const {         
        jobSeekerName,
        address,
        major,
        age,
        numberExperienceYears, 
        email, 
        password } = req.body;
        console.log(jobSeekerName);
      const passwordSlot = await bcrypt.genSalt();
      const passwordHashed = await bcrypt.hash(password, passwordSlot);
      var result = await jobSeekerModel.create_jobSeeker(
        jobSeekerName,
        address,
        major,
        age,
        numberExperienceYears, 
        email, 
        passwordSlot, 
        passwordHashed
      );

      if (result) {
        res.send(result);
      } else {
      res.send({message: "empty"});
    }
      }
      static async update_jobSeeker(req, res) {
        const jobSeekerID = parseInt(req.params.id)
          const {         
            jobSeekerName,
            address,
            major,
            age,
            numberExperienceYears, 
            email, 
            password } = req.body;
            console.log(jobSeekerID);
          const passwordSlot = await bcrypt.genSalt();
          const passwordHashed = await bcrypt.hash(password, passwordSlot);
          var result = await jobSeekerModel.update(
            jobSeekerID,
            jobSeekerName,
            address,
            major,
            age,
            numberExperienceYears, 
            email, 
            passwordSlot, 
            passwordHashed
          );

    if (result) {
        res.send(result);
      } else {
      res.send({message: "empty"});
    }
  }

  static async get_jobSeeker_byId(req, res) {
    //try {
      const id  = parseInt(req.params.id);
      console.log(id);
      var result = await jobSeekerModel.get_jobSeeker(id);

      var extractedData = result.map((jobSeeker) => {
        return {

            JobSeekerID : jobSeeker.JobSeekerID,
            Name: jobSeeker.Name,
            Address: jobSeeker.Address,
            Major: jobSeeker.Major,
            Age: jobSeeker.Age,
            NumberExperienceYears: jobSeeker.NumberExperienceYears,
            Email: jobSeeker.Email,
        };
      });



      if (extractedData) {
        res.send(extractedData);
      } else {
      res.send({message: "empty"});
    }

  }

  static async get_bestMatches(req, res) {
    //try {
      const id  = parseInt(req.params.id);
      console.log(id);
      var result = await jobSeekerModel.get_Matches(id);
      var extractedData = result.map((BM) => {
        return {
            JobID : BM.JobPostID,
            JobTitle: BM.Title,
            Description: BM.Description,
            StartSalary: BM.StartSalary,
            EndSalary: BM.EndSalary,
            Status: BM.Status
        };
      });
      if (extractedData) {
        
        res.send(extractedData);
      } else {
      res.send({message: "empty"});
    }
  }



  static async get_all_jobSeeker(req, res) {
    //try {
      var result = await jobSeekerModel.get_all();

      var extractedData = result.map((jobSeeker) => {
        return {

            JobSeekerID : jobSeeker.JobSeekerID,
            Name: jobSeeker.Name,
            Address: jobSeeker.Address,
            Major: jobSeeker.Major,
            Age: jobSeeker.Age,
            NumberExperienceYears: jobSeeker.NumberExperienceYears,
            Email: jobSeeker.Email,
        };
      });



      if (extractedData) {
        res.send(extractedData);
      } else {
      res.send({message: "empty"});
    }
  }


 static async delete_jobSeeker_byId(req, res) {
    //try {
      const id  = parseInt(req.params.id);
      console.log(id);
      var result = await jobSeekerModel.delete_jobSeeker(id);

      if (result) {
        res.send(result);
      } else {
      res.send({message: "empty"});
    }
  }

}

module.exports = jobSeeker_controller
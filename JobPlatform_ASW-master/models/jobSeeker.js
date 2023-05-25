const db = require("../config/db");

class jobSeeker{
    JobSeekerID 
    Name
    Address
    Major
    Age 
    NumberExperienceYears 
    Email 
    PasswordSlot 
    PasswordHashed 



    static create_jobSeeker(
        Name,
        Address,
        Major,
        Age,
        NumberExperienceYears, 
        Email, 
        PasswordSlot, 
        PasswordHashed
      ) {
        return new Promise((resolve) => {
          const sql = "INSERT INTO job_seekers (Name, Address, Major, Age, NumberExperienceYears, Email, PasswordSlot, PasswordHashed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
          const values = 
          [ 
            Name,
            Address,
            Major,
            Age,
            NumberExperienceYears, 
            Email, 
            PasswordSlot, 
            PasswordHashed];
          
          db.query(sql, values, (err, result) => {
            if (err) {
              console.error("Error registering jobSeekers: ", err);
              resolve(err);
            } else {
              resolve(result);
            }
          });
        });
      }


      static update(
        JobSeekerID,
        Name,
        Address,
        Major,
        Age,
        NumberExperienceYears, 
        Email, 
        PasswordSlot, 
        PasswordHashed) {
        return new Promise((resolve) => {
          const sql = 'UPDATE job_seekers SET Name = ?, Address = ?, Major = ?, Age = ?, NumberExperienceYears = ?, Email = ?, PasswordSlot = ?, PasswordHashed = ? WHERE JobSeekerID = ?';
          const values = [
            Name,
            Address,
            Major,
            Age,
            NumberExperienceYears, 
            Email, 
            PasswordSlot, 
            PasswordHashed, 
            JobSeekerID];
        
          
          db.query(sql, values, (err, result) => {
            if (err) {
              console.error("Error get_employer employer: ", err);
              resolve(err);
            } else {
              resolve(result);
            }
          });
        });
      }
    
      static get_jobSeeker(JobSeekerID) {
        return new Promise((resolve) => {
          const sql = "SELECT * FROM `job_seekers` WHERE `JobSeekerID` = ?";
          //const values = [employerId];
          
          db.query(sql, [JobSeekerID], (err, result) => {
            if (err) {
              console.error("Error get_jobSeekers: ", err);
              resolve(err);
            } else {
              resolve(result);
            }
          });
        });
      }
    
    
        static get_jobSeeker_by_email(email) {
        return new Promise((resolve) => {
          const sql = "SELECT * FROM `job_seekers` WHERE `Email` = ?";
          //const values = [employerId];
          
          db.query(sql, [email], (err, result) => {
            if (err) {
              console.error("Error get_jobSeekers : ", err);
              resolve(err);
            } else {
              resolve(result);
            }
          });
        });
      }
    
    
      static get_all() {
        return new Promise((resolve) => {
          const sql = "SELECT * FROM `job_seekers` ";
          //const values = [employerId];
          
          db.query(sql, [], (err, result) => {
            if (err) {
              console.error("Error  jobSeekers: ", err);
              resolve(err);
            } else {
              resolve(result);
            }
          });
        });
      }


      static get_Matches(id) {
        return new Promise((resolve) => {
          const sql = "SELECT jp.* FROM job_posts jp INNER JOIN requirements r ON jp.requirementID = r.RequirementID INNER JOIN job_seekers js ON js.JobSeekerID = ? WHERE js.major = r.major  AND ((js.Address = r.Address) or r.Address='any') AND js.NumberExperienceYears >= r.NumberExperienceYears and CAST(SUBSTRING_INDEX(r.age, '-', 1) AS UNSIGNED) < CAST(js.age AS UNSIGNED) AND CAST(SUBSTRING_INDEX(r.age, '-', -1) AS UNSIGNED) >CAST(js.age AS UNSIGNED) ORDER BY jp.startSalary;";
        
          
          db.query(sql, [id], (err, result) => {
            if (err) {
              console.error("Error getting best matches : ", err);
              resolve(err);
            } else {
              resolve(result);
            }
          });
        });
      }
    
    
      static delete_jobSeeker(JobSeekerID) {
        return new Promise((resolve) => {
          const sql = "DELETE FROM `job_seekers` WHERE `JobSeekerID` = ?";
          //const values = [employerId];
          
          db.query(sql, [JobSeekerID], (err, result) => {
            if (err) {
              console.error("Error delete_jobSeekers: ", err);
              resolve(err);
            } else {
              resolve(result);
            }
          });
        });
      }
}

module.exports = jobSeeker
const db = require("../config/db");

class requirement{
    RequirementID
    Age
    Major
    NumberExperienceYears
    Address

    static create_requirement(
        Age,
        Major,
        NumberExperienceYears,
        Address
      ) {
        return new Promise((resolve) => {
          const sql = "INSERT INTO requirements (Age, Major, NumberExperienceYears, Address) VALUES (?, ?, ?, ?)";
          const values = 
          [ 
            Age,
            Major,
            NumberExperienceYears,
            Address
        ];
          
          db.query(sql, values, (err, result) => {
            if (err) {
              console.error("Error registering requirements: ", err);
              resolve(err);
            } else {
              resolve(result);
            }
          });
        });
      }
    
      static get_requirement(RequirementID) {
        return new Promise((resolve) => {
          const sql = "SELECT * FROM `requirements` WHERE `RequirementID` = ?";
          //const values = [employerId];
          
          db.query(sql, [RequirementID], (err, result) => {
            if (err) {
              console.error("Error get_requirements: ", err);
              resolve(err);
            } else {
              resolve(result);
            }
          });
        });
      }
    
    
        static get_requirement_by_email(email) {
        return new Promise((resolve) => {
          const sql = "SELECT * FROM `requirements` WHERE `Email` = ?";
          //const values = [employerId];
          
          db.query(sql, [email], (err, result) => {
            if (err) {
              console.error("Error get_requirements: ", err);
              resolve(err);
            } else {
              resolve(result);
            }
          });
        });
      }
    
    
      static get_all() {
        return new Promise((resolve) => {
          const sql = "SELECT * FROM `requirements` ";
          //const values = [employerId];
          
          db.query(sql, [], (err, result) => {
            if (err) {
              console.error("Error  requirements: ", err);
              resolve(err);
            } else {
              resolve(result);
            }
          });
        });
      }
    
    
      static delete_requirement(RequirementID) {
        return new Promise((resolve) => {
          const sql = "DELETE FROM `requirements` WHERE `RequirementID` = ?";
          //const values = [employerId];
          
          db.query(sql, [RequirementID], (err, result) => {
            if (err) {
              console.error("Error delete_requirements ", err);
              resolve(err);
            } else {
              resolve(result);
            }
          });
        });
      }


}

module.exports = requirement
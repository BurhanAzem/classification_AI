const db = require("../config/db");
const { login } = require("../controllers/employer_controller");

class employer_model {
  EmployerID
  Name
  Address
  Email
  PasswordSlot
  PasswordHashed

  static create_employer(
    employerName, 
    address, 
    email, 
    passwordSlot, 
    passwordHashed
  ) {
    return new Promise((resolve) => {
      const sql = "INSERT INTO employers (Name, Address, Email, PasswordSlot, PasswordHashed) VALUES (?, ?, ?, ?, ?)";
      const values = [employerName, address, email, passwordSlot, passwordHashed];
      
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error("Error registering employer: ", err);
          resolve(err);
        } else {
          resolve(result);
        }
      });
    });
  }


  static update(
    EmployerID,
    Name,
    Address,
    Email,
    PasswordSlot,
    PasswordHashed) {
      console.log("iuhefiuhiiiiiehf");
    return new Promise((resolve) => {
      const sql = 'UPDATE employers SET Name = ?, Address = ?, Email = ?, PasswordSlot = ?, PasswordHashed = ? WHERE EmployerID = ?';
      const values = [
        Name,
        Address,
        Email,
        PasswordSlot,
        PasswordHashed, 
        EmployerID];
    
      
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


  static get_employer(employerId) {
    return new Promise((resolve) => {
      const sql = "SELECT * FROM `employers` WHERE `EmployerID` = ?";
      //const values = [employerId];
      
      db.query(sql, [employerId], (err, result) => {
        if (err) {
          console.error("Error get_employer employer: ", err);
          resolve(err);
        } else {
          resolve(result);
        }
      });
    });
  }


    static get_employer_by_email(email) {
    return new Promise((resolve) => {
      const sql = "SELECT * FROM `employers` WHERE `Email` = ?";
      //const values = [employerId];
      
      db.query(sql, [email], (err, result) => {
        if (err) {
          console.error("Error get_employer employer: ", err);
          resolve(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static get_jobApplications(id) {
    return new Promise((resolve) => {
      const sql = "SELECT * FROM `employers` WHERE `Email` = ?";
      //const values = [employerId];
      
      db.query(sql, [id], (err, result) => {
        if (err) {
          console.error("Error get_employer employer: ", err);
          resolve(err);
        } else {
          resolve(result);
        }
      });
    });
  }




  static get_all() {
    return new Promise((resolve) => {
      const sql = "SELECT * FROM `employers` ";
      //const values = [employerId];
      
      db.query(sql, [], (err, result) => {
        if (err) {
          console.error("Error get_employer employer: ", err);
          resolve(err);
        } else {
          resolve(result);
        }
      });
    });
  }


  static delete_employer(employerId) {
    return new Promise((resolve) => {
      const sql = "DELETE FROM `employers` WHERE `EmployerID` = ?";
      //const values = [employerId];
      
      db.query(sql, [employerId], (err, result) => {
        if (err) {
          console.error("Error delete_employer employer: ", err);
          resolve(err);
        } else {
          resolve(result);
        }
      });
    });
  }

}

module.exports = employer_model;

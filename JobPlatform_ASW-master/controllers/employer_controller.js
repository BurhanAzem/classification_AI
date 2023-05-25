


const employer_model = require("../models/employer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class employer_controller {

    static async login(req, res) {
        try {
          const { email, password } = req.body;
          console.log(email + " " + password);
          var employer = await employer_model.get_employer_by_email(email);
          if (!employer) return res.status(400).json({ msg: "User does not exist. " });
          console.log( employer[0].PasswordHashed);
          const passwordHashed_in = await bcrypt.hash(password, employer[0].PasswordSlot);
          console.log( passwordHashed_in);          
          
          if (!passwordHashed_in === employer[0].PasswordHashed) return res.status(400).json({ msg: "Invalid credentials. " });
      
          const token = jwt.sign({ id: employer[0].EmployerID }, 'SecretKey');
          delete employer.password;
          const employer_name = employer[0].Name
          res.status(200).json({ token, employer_name });
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
    }


  static async register_employer(req, res) {
    //try {
      const { employerName, address, email, password } = req.body;
      const passwordSlot = await bcrypt.genSalt();
      const passwordHashed = await bcrypt.hash(password, passwordSlot);
      var result = await employer_model.create_employer(
        employerName,
        address,
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


  static async update_employer(req, res) {
      const employerID = parseInt(req.params.id)
      const { employerName, address, email, password } = req.body;
      const passwordSlot = await bcrypt.genSalt();
      const passwordHashed = await bcrypt.hash(password, passwordSlot);
      var result = await employer_model.update(
        employerID,
        employerName,
        address,
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

  static async get_employer_byId(req, res) {
    //try {
      const id  = parseInt(req.params.id);
      console.log(id);
      var result = await employer_model.get_employer(id);

      var extractedData = result.map((employer) => {
        return {
            EmployerID: employer.EmployerID,
            Name: employer.Name,
            Address: employer.Address,
            Email: employer.Email,
        };
      });



      if (extractedData) {
        res.send(extractedData);
      } else {
      res.send({message: "empty"});
      
    }
  }


  static async get_all_employer(req, res) {
    //try {
      var result = await employer_model.get_all();

      var extractedData = result.map((employer) => {
        return {
            EmployerID: employer.EmployerID,
            Name: employer.Name,
            Address: employer.Address,
            Email: employer.Email,
        };
      });



      if (extractedData) {
        res.send(extractedData);
      } else {
      res.send({message: "empty"});
    }
  }


 static async delete_employer_byId(req, res) {
    //try {
      const id  = parseInt(req.params.id);
      console.log(id);
      var result = await employer_model.delete_employer(id);

      if (result) {
        res.send(result);
      } else {
      res.send({message: "empty"});
    }
  }

}
module.exports = employer_controller;

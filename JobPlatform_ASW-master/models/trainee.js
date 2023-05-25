const db = require("../config/db");
class traineeModel {


  static get_all_trainee(tmp , filename){
    return new Promise((resolve) => {
      db.query(
        "SELECT * FROM `trainee` WHERE `trainee_id` = ? and `some` = ? ",[tmp,filename],
        (err, result) => {
          if (!err) {
            resolve(result);
          }
          
          resolve(err);
        }
      );
    });
  }

  
}
module.exports = traineeModel;

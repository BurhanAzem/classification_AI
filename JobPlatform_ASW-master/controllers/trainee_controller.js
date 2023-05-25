const traineeModel = require("../models/trainee");
class traineeController {

  static async get_all_trainee(req,res){
    //handing a body param
    const tmp = req.body.amount;//body
  //   {
  //     "nutrients_plan_id":0,
  //     "amount":44,
  //     "coach_id":0
  // }
    const folderName = req.params.filename;//param inside url
    // http://localhost:3001/api/admin/get_all_trainee/majdy
    console.log(tmp + " " + folderName);
    //lvl 1 done you all the needed data
    var result = await traineeModel.get_all_trainee(tmp , folderName);
    
    if (result) {
      res.send(result);
    } else {
    res.send({message: "empty"});
  }
  }

}

module.exports = traineeController;

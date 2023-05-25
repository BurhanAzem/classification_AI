const requirementModel = require("../models/requirement");

class requirement_controller{
    static async register_requirement(req, res) {
    //try {
        const {         
            age,
            major,
            numberExperienceYears,
            address
        } = req.body;
        
        var result = await requirementModel.create_requirement(
            age,
            major,
            numberExperienceYears,
            address
        );

    if (result) {
        res.send(result);
        } else {
        res.send({message: "empty"});
    }
    }


    static async update_requirement(req, res) {
        const RequirementID = parseInt(req.params.id)
            const {         
                age,
                major,
                numberExperienceYears,
                address
            } = req.body;
            
            var result = await requirementModel.update(
                RequirementID,
                age,
                major,
                numberExperienceYears,
                address
            );
    
        if (result) {
            res.send(result);
            } else {
            res.send({message: "empty"});
        }
        }

    static async get_requirement_byId(req, res) {
    //try {
        const id  = parseInt(req.params.id);
        console.log(id);
        var result = await requirementModel.get_requirement(id);

        if (result) {
        res.send(result);
        } else {
        res.send({message: "empty"});
    }
    }


    static async get_all_requirement(req, res) {
    //try {
        var result = await requirementModel.get_all();
        if (result) {
        res.send(result);
        } else {
        res.send({message: "empty"});
    }
    }


    static async delete_requirement_byId(req, res) {
    //try {
        const id  = parseInt(req.params.id);
        console.log(id);
        var result = await requirementModel.delete_requirement(id);

        if (result) {
        res.send(result);
        } else {
        res.send({message: "empty"});
    }
    }

}

module.exports = requirement_controller
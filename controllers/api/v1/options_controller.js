const mongoose = require('mongoose');
const Question = require('../../../models/question');
const Option = require('../../../models/option');

// controller to add option
module.exports.addOption = async function (req, res) {
    try {
        console.log("reached add option");
        votingLink = req.protocol+"://"+req.headers.host + "/api/v1/option/:optionid/add_vote"
        let questionid = req.params.questionid;
        console.log('questionid', questionid);
        optionAddableQuestion = await Question.findById(questionid);
        if(!optionAddableQuestion){
            return res.status(400).json({
                error: "pls send the valid questionId, received questionId not present id DB",
                status: "option not created"
            });
        }
        obj = req.body
        if (!obj.optionValue) {
            return res.status(400).json({
                error: "pls send optionValue data",
                status: "option not created"
            });
        }
        optionObj = {
            optionValue: obj.optionValue,
            questionId: questionid,
            votes: 0
        }
        console.log('optionObj', optionObj);
        addedOption = await Option.create(optionObj);
        votingLink = votingLink.replace(":optionid", addedOption._id);
        addedOption = await Option.findByIdAndUpdate(addedOption._id, { optionId: addedOption._id, votingLink: votingLink }, { new: true });
        if (addedOption) {
            updatedQuestion = await Question.findByIdAndUpdate(questionid, { $push: { options: addedOption._id } });
            if (!updatedQuestion) {
                res.status(400).json({
                    error: "pls provide valid questionId",
                    status: "option not created"
                });
            }
        }
        console.log("updatedQuestion", updatedQuestion);
        console.log('addedOption', addedOption)
        res.status(200).json({
            OptionId: addedOption._id,
            OptionValue: addedOption.optionValue,
            votingLink : addedOption.votingLink,
            status: "option created"
        });
    } catch (err) {
        console.log(err);
        console.log("error in addOption Controller");
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

// controller to add vote
module.exports.addVote = async function (req, res) {
    try {
        console.log("reached addVote");
        let optionId = req.params.optionid;
        console.log('optionId', optionId);
        UpdatedOption = await Option.findByIdAndUpdate(optionId, { $inc: { 'votes': 1 } })
        UpdatedOption = await Option.findById(optionId);
        if (!UpdatedOption) {
            return res.status(400).json({
                error: "error in adding vote",
                status: "vote not added"
            });
        }
        console.log('UpdatedOption', UpdatedOption.votes);
        UpdatedOption = await Option.findById(optionId);
        console.log('UpdatedOption', UpdatedOption.votes);
        if (UpdatedOption) {
            res.status(200).json({
                optionId: UpdatedOption._id,
                optionValue: UpdatedOption.optionValue,
                totalVotes: UpdatedOption.votes,
                status: "vote added"
            });
        }
    } catch (err) {
        console.log(err);
        console.log("error in addVote Controller");
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

// contoller to delete option 
module.exports.deleteOption = async function (req, res) {
    try {
        // to check if option has a vote
        deltableOption = await Option.findById(req.params.optionid);
        console.log("deltableOption.votes",deltableOption.votes);
        if(deltableOption.votes >= 1){
            return res.status(400).json({
                error: "Option has votes not able to delete",
                status: "option not deleted"
            });
        }
        console.log("reached deleteOption")
        let optionId = req.params.optionid;
        deltedOption = await Option.findByIdAndDelete(optionId)
        if (!deltedOption) {
            return res.status(400).json({
                error: "pls provide valid optionId",
                status: "option not deleted"
            });
        }
        UpdatedQuestion = await Question.findByIdAndUpdate(deltedOption.questionId, { $pull: { options: deltedOption._id } });
        if (!UpdatedQuestion) {
            return res.status(400).json({
                error: "error in updating Questions data",
                status: "option not deleted"
            });
        }
        if (UpdatedQuestion) {
            res.status(200).json({
                deletedOptionId: deltedOption._id,
                deletedOptionValue: deltedOption.optionValue,

                updatedQuestionId: UpdatedQuestion._id,
                updatedQuestionValue: UpdatedQuestion.question,
                status: "option deleted"
            });
        }
    } catch (err) {
        console.log(err);
        console.log("error in deleteOption Controller");
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}
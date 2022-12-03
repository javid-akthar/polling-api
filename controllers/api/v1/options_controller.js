const mongoose = require('mongoose');
const Question = require('../../../models/question');
const Option = require('../../../models/option');

module.exports.addOption = async function (req, res) {
    try {
        console.log("reached add option");
        // console.log('req',req);
        // console.log('req', 'http://'+'localhost:8006'+req.originalUrl);
        votingLink = req.protocol+"://"+req.headers.host + "/api/v1/option/:optionid/add_vote"
        let questionid = req.params.questionid;
        console.log('questionid', questionid);
        optionAddableQuestion = await Question.findById(questionid);
        if(!optionAddableQuestion){
            return res.status(400).json({
                error: "pls send the valid questionId, received questionId not present id DB"
            });
        }
        obj = req.body
        if (!obj.optionValue) {
            return res.status(400).json({
                error: "pls send optionValue data"
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
                    error: "pls provide valid questionId"
                });
            }
        }
        console.log("updatedQuestion", updatedQuestion);
        console.log('addedOption', addedOption)
        res.status(200).json({
            OptionId: addedOption._id,
            OptionValue: addedOption.optionValue,
            votingLink : addedOption.votingLink
        });
    } catch (err) {
        console.log(err);
        console.log("error in addOption Controller");
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}


module.exports.addVote = async function (req, res) {
    try {
        console.log("reached addVote");
        console.log('req', 'http://' + 'localhost:8006' + req.originalUrl);
        let optionId = req.params.optionid;
        console.log('optionId', optionId);
        UpdatedOption = await Option.findByIdAndUpdate(optionId, { $inc: { 'votes': 1 } })
        UpdatedOption = await Option.findById(optionId);
        if (!UpdatedOption) {
            return res.status(400).json({
                error: "error in adding vote"
            });
        }
        console.log('UpdatedOption', UpdatedOption.votes);
        UpdatedOption = await Option.findById(optionId);
        console.log('UpdatedOption', UpdatedOption.votes);
        if (UpdatedOption) {
            res.status(200).json({
                optionId: UpdatedOption._id,
                optionValue: UpdatedOption.optionValue,
                totalVotes: UpdatedOption.votes
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

module.exports.deleteOption = async function (req, res) {
    try {
        // to check if option has a vote
        deltableOption = await Option.findById(req.params.optionid);
        console.log("deltableOption.votes",deltableOption.votes);
        if(deltableOption.votes<=0){
            return res.status(400).json({
                error: "Option has votes not able to delete"
            });
        }
        console.log("reached deleteOption")
        let optionId = req.params.optionid;
        deltedOption = await Option.findByIdAndDelete(optionId)
        if (!deltedOption) {
            return res.status(400).json({
                error: "pls provide valid optionId"
            });
        }
        UpdatedQuestion = await Question.findByIdAndUpdate(deltedOption.questionId, { $pull: { options: deltedOption._id } });
        if (!UpdatedQuestion) {
            return res.status(400).json({
                error: "error in updating Questions data"
            });
        }
        if (UpdatedQuestion) {
            res.status(200).json({
                deletedOptionId: deltedOption._id,
                deletedOptionValue: deltedOption.optionValue,

                updatedQuestionId: UpdatedQuestion._id,
                updatedQuestionValue: UpdatedQuestion.question
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
const mongoose = require('mongoose');
const Question = require('../../../models/question');
const Option = require('../../../models/option');

module.exports.createQuestion = async function (req, res) {
    try {
        console.log(req.protocol+"://"+req.headers.host);
        console.log(req.body);
        payload = req.body;
        if (!payload) {
            return res.status(400).json({
                error: "pls send the valid payload"
            });
        }
        question = payload["question"];
        if (!question) {
            return res.status(400).json({
                error: "pls send the valid payload"
            });
        }
        let addedQuestion = await Question.create(payload);
        addedQuestion = await Question.findByIdAndUpdate(addedQuestion._id, {questionId : addedQuestion._id})
        return res.status(200).json({
            questionId: addedQuestion._id,
            createdQuestion : addedQuestion.question
        });
    } catch (err) {
        console.log(err);
        console.log("error in createQuestion Controller");
        return res.status(500).json({
            error: "Internal server error"
        });
    }

}

module.exports.deleteQuestion = async function (req, res) {
    try {
        console.log("reached deleteQuestion controller")
        // to check if option havign vote
        Question.findById
        let paramData = req.params;
        let questionId = req.params.questionid;
        if (!questionId) {
            return res.status(400).json({
                error: "pls send the valid id"
            });
        }

        deletableQuestion = await Question.findById(questionId)
        .populate({
            path: "options"
        });

        for(option of deletableQuestion.options){
            if(!option.votes<=0){
                return res.status(400).json({
                    error: "Option has votes not able to delete"
                });
            }
        }

        for(option of deletableQuestion.options){
            await Option.findByIdAndDelete(option._id);
        }

        deletedQuestionRecord = await Question.findByIdAndDelete(questionId)
        if (!deletedQuestionRecord) {
            return res.status(400).json({
                error: "pls send the valid id"
            });
        }
        console.log('deletedQuestionRecord', deletedQuestionRecord);
        console.log('questionId', questionId);
        return res.status(200).json({
            questionId: deletedQuestionRecord._id,
            deletedQuestion: deletedQuestionRecord.question
            
        });
    } catch (err) {
        console.log(err);
        console.log("error in deleteQuestion Controller");
        return res.status(500).json({
            error: "Internal server error"
        });
    }

}

module.exports.fetchQuestion = async function (req, res) {
    try {
        console.log("reached fetchQuestion controller");
        questionId = req.params.questionid;
        console.log('questionId',questionId)
        if (!questionId) {
            return res.status(400).json({
                error: "pls send the valid id"
            });
        }
        retrievedQuestionRecord = await Question.findById(questionId)
        // .select("-__v")

        .populate({
            path: 'options',
            select: "-__v -createdAt -updatedAt -_id -questionId"
        }).select("-__v -createdAt -updatedAt -_id").lean();
        console.log('retrievedQuestionRecord',retrievedQuestionRecord)
        if (!retrievedQuestionRecord) {
            return res.status(400).json({
                error: "pls send the valid id"
            });
        }
        return res.status(200).json(
            retrievedQuestionRecord
        );
    } catch (err) {
        console.log(err);
        console.log("error in fetchQuestion Controller");
        return res.status(500).json({
            error: "Internal server error"
        });
    }

}
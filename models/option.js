const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    optionId :{
        type : String,
    },
    optionValue : {
        type : String,
        required : true,
    },
    questionId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Question',
    },
    votes : {
        type : Number,
    },
    votingLink : {
        type : String,
    }

},{
    timestamps : true,
});

const Option = mongoose.model('Option', optionSchema);

module.exports = Option
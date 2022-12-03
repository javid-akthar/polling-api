const express = require('express');
const router = express.Router();

const optionsController = require('../../../controllers/api/v1/options_controller');

router.post('/:questionid/add', optionsController.addOption);
router.get('/:optionid/add_vote', optionsController.addVote);
router.delete('/:optionid/delete',optionsController.deleteOption);
module.exports = router;
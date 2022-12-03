const express = require('express');
const router = express.Router();

const questionsController = require('../../../controllers/api/v1/questions_controller');

router.post('/create',questionsController.createQuestion);
router.get('/:questionid', questionsController.fetchQuestion);
router.delete('/:questionid/delete',questionsController.deleteQuestion);

module.exports = router;
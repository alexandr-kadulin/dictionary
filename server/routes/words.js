const express = require('express');
const router = express.Router();

const {
  getAllWords,
  createWord,
  getWord,
  updateWord,
  deleteWord,
} = require('../controllers/words');

router.route('/').get(getAllWords);
router.route('/').post(createWord);
router.route('/:key').get(getWord);
router.route('/:id').patch(updateWord);
router.route('/:id').delete(deleteWord);

module.exports = router;

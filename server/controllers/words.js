const Word = require('../models/Word');

const getAllWords = async (req, res) => {
  try {
    const words = await Word.find({});
    res.status(200).json({ words });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createWord = async (req, res) => {
  try {
    const word = await Word.create(req.body);
    res.status(201).json({ word });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getWord = async (req, res) => {
  try {
    const { key: wordKey } = req.params;
    const word = await Word.findOne({ key: wordKey.toLowerCase() });

    if (!word) {
      return res.status(404).json({ msg: `No word with key : ${wordKey}` });
    }

    res.status(200).json({ word });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteWord = async (req, res) => {
  try {
    const { id: wordId } = req.params;
    const word = await Word.findOneAndDelete({ _id: wordId });

    if (!word) {
      return res.status(404).json({ msg: `No word with id : ${wordId}` });
    }

    res.status(200).json({ word: null, status: 'success' });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateWord = async (req, res) => {
  try {
    const { id: wordId } = req.params;
    const word = await Word.findOneAndUpdate({ _id: wordId }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!word) {
      return res.status(404).json({ msg: `No word with id : ${wordId}` });
    }

    res.status(200).json({ word });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllWords,
  createWord,
  getWord,
  updateWord,
  deleteWord,
};

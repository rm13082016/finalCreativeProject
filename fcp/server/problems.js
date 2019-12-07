const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const multer = require('multer');

//
// Problems
//

const problemSchema = new mongoose.Schema({
  title: String,
  problem: String,
  path: String,
  answer: Number,
});

const Problem = mongoose.model('Problem', problemSchema);

const upload = multer({
    dest: '../public/images/',
    limits: {
        fileSize: 10000000
    }
})

router.post('/photo', upload.single('photo'), async (req, res) => {
    if (!req.file) {
        return res.sendStatus(400);
    }
    res.send({
        path: "/images/" + req.file.filename
    });
});

router.get('/', async (req, res) => {
  try {
    let problems = await Problem.find();
    return res.send(problems);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  const problem = new Problem({
    title: req.body.title,
    problem: req.body.problem,
    path: req.body.path,
    answer: req.body.answer
  });
  try {
    await problem.save();
    return res.send(problem);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Problem.deleteOne({
      _id: req.params.id
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
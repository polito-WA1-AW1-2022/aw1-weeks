'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const {check, validationResult} = require('express-validator'); // validation middleware
const dao = require('./dao'); // module for accessing the DB

// init express
const app = express();
const port = 3001;

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());


/*** APIs ***/

// GET /api/courses
app.get('/api/courses', (req, res) => {
  dao.listCourses()
    .then(courses => res.json(courses))
    .catch(() => res.status(500).end());
});

// GET /api/courses/<code>
app.get('/api/courses/:code', async (req, res) => {
  try {
    const result = await dao.getCourse(req.params.code);
    if(result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch(err) {
    res.status(500).end();
  }
});

// GET /api/exams
app.get('/api/exams', async (req, res) => {
  try {
    const exams = await dao.listExams();
    res.json(exams);
  } catch(err) {
    res.status(500).end();
  }
});

// POST /api/exams
app.post('/api/exams', [
  check('score').isInt({min: 18, max: 31}),
  check('code').isLength({min: 7, max: 7}),
  check('date').isDate({format: 'YYYY-MM-DD', strictMode: true})
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  const exam = {
    code: req.body.code,
    score: req.body.score,
    date: req.body.date,
  };

  try {
    await dao.createExam(exam);
    res.status(201).end();
  } catch(err) {
    res.status(503).json({error: `Database error during the creation of exam ${exam.code}.`});
  }
});

// PUT /api/exams/<code>
app.put('/api/exams/:code', [
  check('score').isInt({min: 18, max: 31}),
  check('code').isLength({min: 7, max: 7}),
  check('date').isDate({format: 'YYYY-MM-DD', strictMode: true})
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  const exam = req.body;

  // you can also check here if the code passed in the URL matches with the code in req.body
  try {
    await dao.updateExam(exam);
    res.status(200).end();
  } catch(err) {
    res.status(503).json({error: `Database error during the update of exam ${req.params.code}.`});
  }

});

// DELETE /api/exams/<code>
app.delete('/api/exams/:code', async (req, res) => {
  try {
    await dao.deleteExam(req.params.code);
    res.status(204).end();
  } catch(err) {
    res.status(503).json({ error: `Database error during the deletion of exam ${req.params.code}.`});
  }
});


/*** Other express-related instructions ***/

// Activate the server
app.listen(port, () => {
  console.log(`react-score-server listening at http://localhost:${port}`);
});
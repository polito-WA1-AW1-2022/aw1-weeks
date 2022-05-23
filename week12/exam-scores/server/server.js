'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const {check, validationResult} = require('express-validator'); // validation middleware
const dao = require('./dao'); // module for accessing the DB
const cors = require('cors');

// init express
const app = express();
const port = 3001;

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());   // NB: Usare solo per sviluppo e per l'esame! Altrimenti indicare dominio


/*** APIs ***/

// GET /api/courses
app.get('/api/courses', (req, res) => {
  dao.listCourses()
    .then(courses => res.json(courses))
    .catch((err) => {
      console.log(err);
      res.status(500).json({error: `Database error while retrieving courses`}).end()
    });
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
    console.log(err);
    res.status(500).json({ error: `Database error while retrieving course ${req.params.code}.`}).end();
  }
});

// GET /api/exams
app.get('/api/exams', async (req, res) => {
  try {
    //const exams = await dao.listExams();
    const exams = await dao.listExamsWithName();
    //res.json(exams);
    setTimeout( ()=> res.json(exams), 1000);
  } catch(err) {
    console.log(err);
    res.status(500).json({error: `Database error while retrieving exams`}).end();
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
    // You may want to check that the course code exists before doing the creation
    await dao.createExam(exam);
    // In case that a new ID is created and you want to use it, take it from await, and return it to client.
    res.status(201).end();
  } catch(err) {
    console.log(err);
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
    console.log(err);
    res.status(503).json({error: `Database error during the update of exam ${req.params.code}.`});
  }

});

// DELETE /api/exams/<code>
app.delete('/api/exams/:code', async (req, res) => {
  try {
    await dao.deleteExam(req.params.code);
    res.status(204).end();
  } catch(err) {
    console.log(err);
    res.status(503).json({ error: `Database error during the deletion of exam ${req.params.code}.`});
  }
});


/*** Other express-related instructions ***/

// Activate the server
app.listen(port, () => {
  console.log(`react-score-server listening at http://localhost:${port}`);
});

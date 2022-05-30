'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const {check, validationResult} = require('express-validator'); // validation middleware
const dao = require('./dao'); // module for accessing the DB
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
const userDao = require('./user-dao'); // module for accessing the users in the DB
const cors = require('cors');



// init express
const app = express();
const port = 3001;

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions)); // NB: Usare solo per sviluppo e per l'esame! Altrimenti indicare dominio e porta corretti


// TEMPORARY
const isLoggedIn = (req, res, next) => {
  return next();
}


/*** APIs ***/

// GET /api/courses
app.get('/api/courses', isLoggedIn, (req, res) => {
  dao.listCourses()
    .then(courses => res.json(courses))
    .catch((err) => {
      console.log(err);
      res.status(500).json({error: `Database error while retrieving courses`}).end()
    });
});

// GET /api/courses/<code>
app.get('/api/courses/:code', isLoggedIn, async (req, res) => {
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
app.get('/api/exams', isLoggedIn, async (req, res) => {
  try {
    const exams = await dao.listExamsWithName(1);
    //res.json(exams);
    setTimeout( ()=> res.json(exams), 1000);
  } catch(err) {
    console.log(err);
    res.status(500).json({error: `Database error while retrieving exams`}).end();
  }
});

// POST /api/exams
app.post('/api/exams', isLoggedIn, [
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
    await dao.createExam(exam, 1);   // It is WRONG to use something different from req.user.id
    // In case that a new ID is created and you want to use it, take it from await, and return it to client.
    res.status(201).end();
  } catch(err) {
    console.log(err);
    res.status(503).json({error: `Database error during the creation of exam ${exam.code}.`});
  }
});

// PUT /api/exams/<code>
app.put('/api/exams/:code', isLoggedIn, [
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
    await dao.updateExam(exam, 1);
    res.status(200).end();
  } catch(err) {
    console.log(err);
    res.status(503).json({error: `Database error during the update of exam ${req.params.code}.`});
  }

});

// DELETE /api/exams/<code>
app.delete('/api/exams/:code', isLoggedIn, async (req, res) => {
  try {
    await dao.deleteExam(req.params.code, 1);
    res.status(204).end();
  } catch(err) {
    console.log(err);
    res.status(503).json({ error: `Database error during the deletion of exam ${req.params.code}.`});
  }
});


/*** Users APIs ***/

// POST /sessions 
// login
app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).json(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        
        // req.user contains the authenticated user, we send all the user info back
        // this is coming from userDao.getUser()
        return res.json(req.user);
      });
  })(req, res, next);
});

// ALTERNATIVE: if we are not interested in sending error messages...
/*
app.post('/api/sessions', passport.authenticate('local'), (req,res) => {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.json(req.user);
});
*/

// DELETE /sessions/current 
// logout
app.delete('/api/sessions/current', (req, res) => {
  req.logout( ()=> { res.end(); } );
});

// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {  if(req.isAuthenticated()) {
    res.status(200).json(req.user);}
  else
    res.status(401).json({error: 'Unauthenticated user!'});;
});

/*** Other express-related instructions ***/

// Activate the server
app.listen(port, () => {
  console.log(`react-score-server listening at http://localhost:${port}`);
});

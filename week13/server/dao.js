'use strict';
/* Data Access Object (DAO) module for accessing courses and exams */

const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('exams.sqlite', (err) => {
  if(err) throw err;
});

// get all courses
exports.listCourses = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM course';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const courses = rows.map((e) => ({ code: e.code, name: e.name, CFU: e.CFU }));
      resolve(courses);
    });
  });
};

// get the course identified by {code}
exports.getCourse = (code) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM course WHERE code=?';
    db.get(sql, [code], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        resolve({error: 'Course not found.'});
      } else {
        const course = { code: row.code, name: row.name, CFU: row.CFU };
        resolve(course);
      }
    });
  });
};

// get all exams
exports.listExams = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT coursecode, score, date FROM exam WHERE userid = ?';

    db.all(sql, [userId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const exams = rows.map((e) => (
        {
          code: e.coursecode,
          score: e.score,
          date: e.date,
        }));

      resolve(exams);
    });
  });
};

// get all exams with name
exports.listExamsWithName = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT coursecode, name, CFU, score, date FROM exam JOIN course ON exam.coursecode = course.code WHERE userid = ?';

    db.all(sql, [userId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const exams = rows.map((e) => (
        {
          code: e.coursecode,
          name: e.name,
          score: e.score,
          date: e.date,
        }));

      resolve(exams);
    });
  });
};

// add a new exam
exports.createExam = (exam, userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO exam(coursecode, date, score, userid) VALUES(?, DATE(?), ?, ?)';
    db.run(sql, [exam.code, exam.date, exam.score, userId], function (err) {  // <-- NB: function, NOT arrow function so this.lastID works
      if (err) {
        reject(err);
        return;
      }
      console.log('createExam lastID: '+this.lastID);
      resolve(this.lastID);
    });
  });
};

// update an existing exam
exports.updateExam = (exam, userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE exam SET date=DATE(?), score=? WHERE coursecode = ? AND userid = ?';
    db.run(sql, [exam.date, exam.score, exam.code, userId], function (err) {  // <-- NB: function, NOT arrow function so this.lastID works
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

// delete an existing exam
exports.deleteExam = (course_code, userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM exam WHERE coursecode = ? AND userid = ?';
    db.run(sql, [course_code, userId], (err) => {
      if (err) {
        reject(err);
        return;
      } else
        resolve(null);
    });
  });
}

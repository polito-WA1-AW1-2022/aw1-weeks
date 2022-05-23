/**
 * All the API calls
 */
import dayjs from 'dayjs';

const APIURL = new URL('http://localhost:3001/api/');  // Do not forget '/' at the end

async function getAllCourses() {
  // call: GET /api/courses
  const response = await fetch(new URL('courses', APIURL));
  const coursesJson = await response.json();
  if (response.ok) {
    return coursesJson.map((co) => ({ code: co.code, name: co.name, CFU: co.CFU }));
  } else {
    throw coursesJson;  // an object with the error coming from the server
  }
}

async function getAllExams() {
  // call: GET /api/exams
  const response = await fetch(new URL('exams', APIURL));
  const examsJson = await response.json();
  if (response.ok) {
    return examsJson.map((ex) => ({ code: ex.code, name: ex.name, score: ex.score, date: dayjs(ex.date) }));
  } else {
    throw examsJson;  // an object with the error coming from the server
  }
}

function deleteExam(coursecode) {
  // call: DELETE /api/exams/:coursecode
  return new Promise((resolve, reject) => {
    fetch(new URL('exams/' + coursecode, APIURL), {
      method: 'DELETE',
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response.json()
          .then((message) => { reject(message); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

function addExam(exam) {
  // call: POST /api/exams
  return new Promise((resolve, reject) => {
    fetch(new URL('exams', APIURL), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: exam.code, score: exam.score, date: exam.date.format('YYYY-MM-DD') }),
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response.json()
          .then((message) => { reject(message); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

function updateExam(exam) {
  // call: PUT /api/exams/:coursecode
  return new Promise((resolve, reject) => {
    fetch(new URL('exams/' + exam.code, APIURL), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: exam.code, score: exam.score, date: exam.date.format('YYYY-MM-DD') }),
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response.json()
          .then((obj) => { reject(obj); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

const API = { getAllCourses, getAllExams, deleteExam, addExam, updateExam };
export default API;
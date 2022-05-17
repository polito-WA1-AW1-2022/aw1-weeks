/**
 * All the API calls
 */

const dayjs = require("dayjs");
const URL = 'http://localhost:3001/api'

async function getAllExams() {
  // call  /api/exams
  const response = await fetch(URL+'/exams');
  const examsJson = await response.json();
  if (response.ok) {
    return examsJson.map((ex) => ({code: ex.code, name: ex.name, score: ex.score, date: dayjs(ex.date)}) )
  } else {
    throw examsJson;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
  }
}

const API = {getAllExams};
export default API;
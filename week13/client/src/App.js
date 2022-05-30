import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row, Col, Alert } from 'react-bootstrap';
//import dayjs from 'dayjs';
import { ExamScores } from './ExamScores';
import ExamForm from './ExamForm';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from './API';

/*
const fakeExams = [
  { code: '01TYMOV', name: 'Information systems security', score: 30, date: dayjs('2022-02-01') },
  { code: '01SQJOV', name: 'Data Science and Database Technology', score: 21, date: dayjs('2021-06-15') },
  { code: '04GSPOV', name: 'Software Engineering', score: 26, date: dayjs('2022-06-04') }
];
*/

function App() {
  return (
    <Router>
      <App2 />
    </Router>
  )
}

function App2() {
  const [exams, setExams] = useState([]);
  const [courses, setCourses] = useState([]);
  const [dirty, setDirty] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
      API.getAllCourses()
        .then( (courses) => { setCourses(courses); setDirty(true); } )
        .catch( err => handleError(err))
  }, [])

  useEffect(() => {
    // fetch  /api/exams
    // setExams del risultato
    if (courses.length && dirty) {
      API.getAllExams()
        .then((exams) => {
          setExams(exams);
          setDirty(false);
          setInitialLoading(false);
        })
        .catch(err => console.log(err))
    }
  }, [courses.length, dirty])

  function handleError(err) {
    console.log(err);
  }

  function deleteExam(code) {
    // setExams(...)   // remove exam
    //setExams( exams.filter( (e)=> e.code !== code ) );
    setExams( exams => exams.map( e => (e.code === code) ? {...e, status: 'deleted'} : e ))
    API.deleteExam(code)
      .then( ()=> setDirty(true))
      .catch( err => handleError(err));
  }

  function addExam(exam) {
    exam.status = 'added';
    setExams( oldExams => [...oldExams, exam] );
    API.addExam(exam)
      .then( () => setDirty(true) )
      .catch( err => handleError(err));
  }

  function updateExam(exam) {
    setExams(exams => exams.map(
      e => (e.code === exam.code) ? Object.assign({}, exam, {status: 'updated'}) : e
    ));
    API.updateExam(exam)
      .then( () => setDirty(true) )
      .catch( err => handleError(err) );
  }

  return (
    <>
      <Container>
        <Row><Col>
        </Col></Row>
        <Row><Col>
        </Col></Row>
      </Container>
      <Routes>
        <Route path='/' element={
            initialLoading ? <Loading /> :
              <ExamScores exams={exams} deleteExam={deleteExam} />
          } />
        <Route path='/add' element={<ExamForm exams={exams} courses={courses} addExam={addExam} />} />
        <Route path='/edit/:examId' element={<ExamForm addExam={updateExam} courses={courses}  exams={exams} />} />
      </Routes>
    </>
  );
}

function Loading(props) {
  return (
    <h2>Loading data ...</h2>
  )
}

export default App;

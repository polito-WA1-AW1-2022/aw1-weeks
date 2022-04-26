import { Table, Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import dayjs from 'dayjs';
import { useState } from 'react';

function ExamScores(props) {
  return (
    <ExamTable exams={props.exams}></ExamTable>
  );
}

function ExamTable(props) {
  const [exams, setExams] = useState(props.exams);
  const [showForm, setShowForm] = useState(false);

  function deleteExam(code) {
    // setExams(...)   // remove exam
    setExams( exams.filter( (e)=> e.code !== code ) );
  }

  function addExam(exam) {
    setExams( oldExams => [...oldExams, exam] );
    setShowForm(false);
  }

  return (
    <>
    <Table>
      <thead>
        <tr>
          <th>Exam</th>
          <th>Score</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          exams.map((ex) => <ExamRow exam={ex} key={ex.code} deleteExam={deleteExam} />)
        }
      </tbody>
    </Table>
    { (!showForm) ? <Button onClick={()=>setShowForm(true)}>Add</Button> :
    <ExamForm cancel={()=>setShowForm(false)} addExam={addExam} />}
    </>
  );
}

function ExamRow(props) {
  return (
    <tr><ExamData exam={props.exam} /><ExamActions code={props.exam.code} deleteExam={props.deleteExam} /></tr>
  );
}

function ExamData(props) {
  return (
    <>
      <td>{props.exam.name}</td>
      <td>{props.exam.score}</td>
      <td>{props.exam.date.format('YYYY-MM-DD')}</td>
    </>
  );
}

function ExamActions(props) {
  return <td><Button variant='danger'
    onClick={() => { props.deleteExam(props.code) }}
  ><i className='bi bi-trash3'></i></Button></td>
}

function ExamForm(props) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [score, setScore] = useState(0);
  const [date, setDate] = useState(dayjs());

  const [errorMsg, setErrorMsg] = useState('');  // stringa vuota '' = non c'e' errore

  const handleSubmit = (event) => {
    event.preventDefault();
    // validation
    if (score >= 18) {
      // add
      const newExam = {code: code, name: name, score: score, date: date}
      props.addExam(newExam);
    } else {
      //console.log('Errore voto: ' + score);
      setErrorMsg('Errore voto: '+score);
    }
  }

  const handleScore = (event) => {
    const val = event.target.value;
    setScore(val);
    /* Careful with validation: either validate at the end in handleSubmit, or when focus is lost,
       or consider that partial input may be invalid (difficult)

        if (val<18)
          setScore(18);
        else if (val>31)
          setScore(31);
        else
          setScore(val);
    */
  }

  return (
    <>
      {errorMsg ? <Alert variant='danger' onClose={()=> setErrorMsg('')} dismissible>{errorMsg}</Alert> : false}
      <Form>
        <Form.Group>
          <Form.Label>Code</Form.Label>
          <Form.Control value={code} onChange={ev => setCode(ev.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Course name</Form.Label>
          <Form.Control value={name} onChange={ev => setName(ev.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Score</Form.Label>
          <Form.Control type='number' min={18} max={31} value={score} onChange={ev => handleScore(ev)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date</Form.Label>
          <Form.Control type='date' value={date.format('YYYY-MM-DD')} onChange={ev => setDate(dayjs(ev.target.value))} />
        </Form.Group>
      </Form>
    <Button onClick={handleSubmit}>Save</Button>
    <Button onClick={props.cancel}>Cancel</Button>
    </>
  );
}

export { ExamScores };
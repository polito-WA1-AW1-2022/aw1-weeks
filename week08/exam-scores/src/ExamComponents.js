import { Table, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
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
    <ExamForm cancel={()=>setShowForm(false)} />}
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
  const [name, setName] = useState('');

  return (
    <>
    <form>
    <input type="text" name="nome" className="form-control" value={name}
     onChange={(event)=>{ setName(event.target.value.toUpperCase()) }}></input>
    </form>
    <Button onClick={props.cancel}>Cancel</Button>
    </>
  );
}

export { ExamScores };
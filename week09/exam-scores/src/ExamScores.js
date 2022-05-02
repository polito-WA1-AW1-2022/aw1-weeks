import { Table, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ExamForm from './ExamForm';
import { useState } from 'react';

function ExamScores(props) {
  return (
    <ExamTable exams={props.exams}></ExamTable>
  );
}

function ExamTable(props) {
  const [exams, setExams] = useState(props.exams);
  const [showForm, setShowForm] = useState(false);
  const [examToEdit, setExamToEdit] = useState(undefined);

  function deleteExam(code) {
    // setExams(...)   // remove exam
    setExams( exams.filter( (e)=> e.code !== code ) );
  }

  function addExam(exam) {
    setExams( oldExams => [...oldExams, exam] );
    setShowForm(false);
    setExamToEdit(undefined);
  }

  function updateExam(exam) {
    setExams(exams => exams.map(
      e => (e.code === exam.code) ? Object.assign({}, exam) : e
    ));
    setShowForm(false);
    setExamToEdit(undefined);
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
          exams.map((ex) => <ExamRow exam={ex} key={ex.code} deleteExam={deleteExam} 
          editExam={()=>{setExamToEdit(ex); setShowForm(true);}} />)
        }
      </tbody>
    </Table>
      {(!showForm) ? <Button onClick={() => setShowForm(true)}>Add</Button> :
        <ExamForm key={examToEdit? examToEdit.code : 'nocode'} 
          cancel={() => { setShowForm(false); setExamToEdit(undefined); }}
          addExam={examToEdit ? updateExam : addExam} examToEdit={examToEdit} />}
    </>
  );
}

function ExamRow(props) {
  return (
    <tr><ExamData exam={props.exam} />
    <ExamActions code={props.exam.code} deleteExam={props.deleteExam} editExam={props.editExam} /></tr>
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
  return (<td>
    <Button className='mx-3' variant='warning' onClick={props.editExam} >
      <i className='bi bi-pencil'></i></Button>
    <Button variant='danger' onClick={() => { props.deleteExam(props.code) }}
    ><i className='bi bi-trash3'></i></Button>
  </td>);
}


export { ExamScores };
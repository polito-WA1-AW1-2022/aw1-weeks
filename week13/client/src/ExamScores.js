import { Table, Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';


function ExamScores(props) {
  return (
    <Container>
      <Row>
        <Col>
          <h1>My Exams</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <ExamTable exams={props.exams} deleteExam={props.deleteExam}></ExamTable>
        </Col>
      </Row>
    </Container>
  );
}

function ExamTable(props) {

  const navigate = useNavigate();

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
          props.exams.map((ex) => <ExamRow exam={ex} key={ex.code} deleteExam={props.deleteExam} />)
        }
      </tbody>
    </Table>
    {/* <Link to='/add'>Add</Link> */}
    <Button onClick={ ()=> navigate('/add') } >Add</Button>
    </>
  );
}

function ExamRow(props) {
  let statusClass = null;
  
  switch(props.exam.status) {
    case 'added':
      statusClass = 'table-success';
      break;
    case 'deleted':
      statusClass = 'table-danger';
      break;
    case 'updated':
      statusClass = 'table-warning';
      break;
    default:
      break;
  }

  return (
    <tr className={statusClass}><ExamData exam={props.exam} />
    <ExamActions code={props.exam.code} deleteExam={props.deleteExam} /></tr>
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
  const navigate = useNavigate();

  return (<td>
    <Button className='mx-3' variant='warning' onClick={()=>{navigate(`/edit/${props.code}`)} } >
      <i className='bi bi-pencil'></i></Button>
    <Button variant='danger' onClick={() => { props.deleteExam(props.code) }}
    ><i className='bi bi-trash3'></i></Button>
  </td>);
}


export { ExamScores };
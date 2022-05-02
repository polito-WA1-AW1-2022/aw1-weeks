import {Button, Alert, Form} from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs';


function ExamForm(props) {
  const [code, setCode] = useState(props.examToEdit ? props.examToEdit.code : '');
  const [name, setName] = useState(props.examToEdit ? props.examToEdit.name : '');
  const [score, setScore] = useState(props.examToEdit ? props.examToEdit.score : 18);
  const [date, setDate] = useState(props.examToEdit ? props.examToEdit.date : dayjs());

  const [errorMsg, setErrorMsg] = useState('');  // stringa vuota '' = non c'e' errore

  const handleSubmit = (event) => {
    event.preventDefault();
    // validation
    // esempio: che non ci siano spazi nel nome del corso
    if (code.includes(' ')) {
      setErrorMsg('Il codice del corso non deve contenere spazi');
    } else if (name.trim().length === 0) {
      setErrorMsg('Il nome del corso deve contenere dei caratteri che non siano solo spazi');
    } else if (date.isAfter(dayjs())) {
      setErrorMsg('La data non può essere futura');
    } else {
      // add
      const newExam = { code: code.trim(), name: name.trim(), score: score, date: date }
      props.addExam(newExam);
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
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Code</Form.Label>
          <Form.Control required={true} minLength={5} maxLength={7} value={code} onChange={ev => setCode(ev.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Course name</Form.Label>
          <Form.Control required={true} value={name} onChange={ev => setName(ev.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Score</Form.Label>
          <Form.Control type='number' min={18} max={31} value={score} onChange={ev => handleScore(ev)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date</Form.Label>
          <Form.Control type='date' value={date.format('YYYY-MM-DD')} onChange={ev => setDate(dayjs(ev.target.value))} />
        </Form.Group>
        <Button type='submit' >Save</Button>
        <Button onClick={props.cancel} variant='secondary' >Cancel</Button>
      </Form>
    </>
  );
}

export default ExamForm;
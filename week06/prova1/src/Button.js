import { useState } from "react";
import { Button } from "react-bootstrap";

function MyButton(props) {
    let [buttonLang, setButtonLang] = useState(props.lang);
    if (buttonLang === 'it')
        return <Button variant='primary' onClick={() => setButtonLang('en')}>Ciao!</Button>
    else
        return <Button variant='primary' onClick={() => setButtonLang('it')}>Hello!</Button>
}
export default MyButton;
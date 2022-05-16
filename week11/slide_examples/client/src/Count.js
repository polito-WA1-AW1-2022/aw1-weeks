import {useEffect} from "react";

function Count(props) {

    useEffect( ()=>{ console.log(`My static number is ${props.num}`)},  [] ) ;
    // run only once

    useEffect( ()=>{ console.log(`My dynamic number is ${props.num}`)},  [props.num] ) ;
    // run at every change

    return <div>{props.num}</div>;


}

export default Count ;
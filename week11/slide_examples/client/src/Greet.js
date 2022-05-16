import {useEffect} from "react";

function GreetBAD(props) {
    const message = `Hello, ${props.name}!`; // Calculates output

    // Bad!
    console.log(`Greetings: ${message}`); // Side-effect!
    return <div>{message}</div>;       // Calculates output
}

function Greet(props) {
    const message = `Hello, ${props.name}!`; // Calculates output

    useEffect(() => {
        // Good!
        console.log(`Greetings: ${message}`); // Side-effect!
    }, []);
    return <div>{message}</div>;       // Calculates output
}

export {Greet, GreetBAD};
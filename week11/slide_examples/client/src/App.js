import './App.css';
import {GreetBAD, Greet} from './Greet';
import Count from "./Count";
import {useState} from "react";
import QuickGate from "./QuickGate";
import TextFlipper from "./TextFlipper";


function App() {
    const [num, setNum] = useState(3) ;

    return (
        <div className="App">
            <Greet name='Enrico' />
            <hr />
            <Count num={num}/> <button onClick={()=>setNum(i=>i+1)}>+</button>
            <hr/>
            <QuickGate/>
            <hr/>
            <TextFlipper />
        </div>
    );
}

export default App;

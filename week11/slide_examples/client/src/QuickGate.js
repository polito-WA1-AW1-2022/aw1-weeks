import {useEffect, useState} from "react";

function QuickGate(props) {
    const [open, setOpen] = useState(false) ;

    useEffect(()=>{
        setTimeout(()=>setOpen(false), 500)
    }, [open]) ;

    const openMe = () => {
        setOpen(true) ;
    } ;

    return <div onClick={openMe}>
        {open ? <span>GO</span> : <span>STOP</span>}
    </div> ;
}

export default QuickGate ;
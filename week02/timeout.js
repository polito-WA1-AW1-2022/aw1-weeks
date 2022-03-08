"use strict";

const ciao = () => {
    console.log("ciao");
}

setTimeout(ciao,2000); //2 secondi

const id = setInterval (() => {console.log("Ciao in loop")}, 2000) //Interval: ogni 2 secondi riesegui il comando

//clearInterval(id); interrompe l'interval

setTimeout(()=>{clearInterval(id)},5000); //dopo 5 secondi smette di farlo
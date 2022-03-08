"use strict";

const ciao = (tizio) => {
    console.log(`Ciao ${tizio}`);
}

setTimeout(ciao, 1000, 'Enrico');

const id = setInterval(() => {console.log("Ciao");}, 2000) ;
console.log(id);
// «id» is a handle that refers to the timer
//clearInterval(id) ;

setTimeout(()=>{clearInterval(id)}, 5000);


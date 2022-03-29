'use strict';

let p = document.createElement('p');
let d = dayjs().format('YYYY-MM-DD HH:mm:ss');
p.innerText = d;

document.getElementById('ora').prepend(p);

setInterval( ()=> {p.innerText = dayjs().format('YYYY-MM-DD HH:mm:ss');} , 1000);

//.innerText = "qui ci va l'ora";


'use strict';

let p = document.createElement('p');
let d = dayjs().format('YYYY-MM-DD HH:mm:ss');
p.innerText = d;

document.getElementById('ora').prepend(p);

setInterval(() => { p.innerText = dayjs().format('YYYY-MM-DD HH:mm:ss'); }, 1000);

//.innerText = "qui ci va l'ora";

window.addEventListener('load', event => {

    const rows = document.querySelectorAll('table tr');

    for (const row of rows) {
        row.addEventListener('click', event => {
            console.log(event.target, row);
            const voto = row.children[1].innerText;

            const p = document.createElement('p');
            p.innerText = voto;
            document.getElementById('comment').appendChild(p);
        })
    }


})


"use strict";

let a = [1, 4, 9, 16];

console.log(a);
let a_string = a.join(',');

console.log(a_string);

let b = [ 'a', 'b', 'c'];
let c = a.concat(b);
console.log(c);

let d = ['*', ...b, '*'];
console.log(d);
d.push('+');
console.log(d);

const e = [...d];
console.log(e);

e[0]=2;
console.log(e);

let f = e;
console.log(f);
f=3;
for (const val of e) {
    console.log(val);
}
console.log("");
for (let i=0; i<e.length; i++)
    console.log(e[i]);















"use strict";

const myScores = [18, 30, 26, 28, 24, 30, 27];

const modifiedScores = [...myScores];

modifiedScores.sort(  (a,b) => (a-b)  );

modifiedScores.shift();
modifiedScores.shift();

let avg = 0;
for (const val of modifiedScores)
    avg += val;
avg = avg / modifiedScores.length;
console.log(avg);
avg = Math.round(avg);
console.log(avg);

modifiedScores.push(avg);
modifiedScores.push(avg);

console.log(myScores);
console.log(modifiedScores);


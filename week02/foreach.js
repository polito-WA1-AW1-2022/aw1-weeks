"use strict";

const letters = [..."Hello world"];
console.log(letters);
let uppercase = "";
letters.forEach(letter => {
    uppercase += letter.toUpperCase();
});
console.log(uppercase); // HELLO WORLD
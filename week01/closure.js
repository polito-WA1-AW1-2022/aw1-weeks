"use strict";

function greeter(name) {
    const myname = name;
    const hello = function () {
        return "Hello " + myname;
    }
    return hello;
}


const helloTom = greeter("Tom");
const helloJerry = greeter("Jerry");
console.log(helloTom());
console.log(helloJerry());
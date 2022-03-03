"use strict";

let book = {
    //author: "Enrico",
    title: "Learning JS",
    for: "students",
    pages: 340,
    "chapter pages": [30,50,60,100]
};

console.log(book);
const persona = book.author;
book.title = "Advanced JS";
book.editor = "Polito";
console.log(book);

let surname = book && book.author && book.author.surname;
console.log(surname);

const book2 = Object.assign({}, book);
console.log(book2);
const book3 = {...book};
console.log(book3);
const {title, ...rest} = book;
console.log(title);






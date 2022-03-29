'use strict';

function Exam(nome, voto, lode, data) {
    this.nome = nome;
    this.voto = voto;
    this.lode = lode;
    this.data = data;
}

const examList = [
    new Exam("Web Applications I", 30, false, "03/21/2022"),
    new Exam("System Programming", 28, false, "03/21/2022"),
    new Exam("Networking", 30, true, "03/21/2022"),
];


function createExamElement(exam) {
    /*
    const newTd1 = document.createElement("td");
    const newContentNome = document.createTextNode(exam.nome);
    newTd1.appendChild(newContentNome);
    const newTd2 = document.createElement("td");
    const newContentVoto = document.createTextNode(exam.lode? exam.voto+"L": exam.voto);
    newTd2.appendChild(newContentVoto);
    const newTd3 = document.createElement("td");
    const newContentData = document.createTextNode(exam.data);
    newTd3.appendChild(newContentData);

    const newTd4 = document.createElement("td");
    newTd4.innerHTML = '<button type="button" class="btn btn-danger">X</button>';


    const newTr = document.createElement("tr");
    newTr.appendChild(newTd1);
    newTr.appendChild(newTd2);
    newTr.appendChild(newTd3);
    newTr.appendChild(newTd4);

    return newTr;
    */

    const newTr = document.createElement("tr");
    newTr.innerHTML = `<td>${exam.nome}</td>
        <td>${exam.lode ? exam.voto + "L" : exam.voto}</td>
        <td>${exam.data}</td>
        <td><button type="button" class="btn btn-danger">X</button></td>`;
    return newTr;

}

const tableBody = document.querySelector('tbody');

for (let exam of examList) {
    const newRow = createExamElement(exam);
    tableBody.appendChild(newRow);
}

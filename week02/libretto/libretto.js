"use strict";

const dayjs = require('dayjs');

let now = dayjs();

//console.log(now.format());

let libretto = [];

let esame = {nome: "AW1", voto: 30, data: dayjs('2022-03-03')};

function Exam(code, nome, CFU, voto, lode, data) {
    this.nome = nome;
    this.voto = voto;
    this.code = code;
    this.CFU = CFU;
    this.data = data;
    this.lode = lode;
    this.str = function() { return `${this.nome} ${this.voto} ${this.data.format()}`}
}

function ExamList () {
    this.list = [];

    this.add =  (e) => {
        this.list.push(e);
    }

    this.average = () => {
        let avg = 0;
        for (const val of this.list)
            avg += val.voto;
        avg = avg / this.list.length;
        return avg;
    }

    this.find = (code) => {
        for (const e of this.list)
            if (e.code === code)
                return e;
        return undefined;
    }
}

const wa1 = new Exam('01abc', 'WA1', 6, 30, true, dayjs('2022-03-04'));
const ps = new Exam('02bcd', 'PS', 6, 29, false, dayjs('2022-03-08'))
console.log(wa1.str());

const exams = new ExamList();
exams.add(wa1);
exams.add(ps);

console.log( exams.average() );

const e = exams.find("01abc");
console.log(e.str());

//console.log(esame);

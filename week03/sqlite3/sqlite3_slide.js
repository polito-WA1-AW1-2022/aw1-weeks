'use strict';

const sqlite = require('sqlite3');
const db = new sqlite.Database('exams.sqlite', (err) => { if (err) throw err; });
let result = [];
let sql = "SELECT * FROM course LEFT JOIN score ON course.code=score.coursecode";
db.all(sql, (err, rows) => {
    if (err) throw err;
    for (let row of rows) {
        console.log(row);
        //console.log(row.code, row.name);
        result.push(row);
    }
});
console.log('********************');
for (let row of result) {
    console.log(row.code, row.name);
}
console.log('*** END of list ***');

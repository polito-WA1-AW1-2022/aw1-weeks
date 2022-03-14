'use strict';

const sqlite = require('sqlite3');
const db = new sqlite.Database('data.sqlite',
    (err) => { if (err) throw err; });

async function insertOne() {
    return new Promise( (resolve, reject) => {
        db.run('insert into numbers(number) values(1)', (err) => {
            if (err) reject(err); 
            else resolve('Done');
        });
    }) ;
}

async function printCount() {
    return new Promise( (resolve, reject) => {
        db.all('select count(*) as tot from numbers',
            (err, rows) => {
                if(err)
                     reject(err);
                else {
                    console.log(rows[0].tot);
                    resolve(rows[0].tot);
                }
            }) ;            
        }) ;
}

async function main() {
    for(let i=0; i<100; i++) {
        await insertOne();
        await printCount();
    }
    db.close();
}

main();

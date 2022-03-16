'use strict';

const sqlite = require('sqlite3');


function queries(max_count) {
    let count = 0 ;
    let nextPrintFlag = false ;

    const db = new sqlite.Database('data.sqlite',
        (err) => { if (err) throw err; });


    const methods = {
        insert: () => {
            count++; 
            db.run('insert into numbers(number) values(1)', (err) => {
                if (err) throw err; 
                else methods.next();
            });
        },
        print:() => {
            db.all('select count(*) as tot from numbers',
            (err, rows) => {
                if(err) throw err;
                console.log(rows[0].tot);
                methods.next();
            }) ;            
        },
        next: () => {
            if(count > max_count) {
                db.close();
                return;
            }   
            if (!nextPrintFlag) {
                nextPrintFlag = true ;
                methods.insert();
            } else {
                nextPrintFlag = false ;
                methods.print();
            }
        }
    }
    return methods;
}

const runner = queries(100) ;
runner.next();



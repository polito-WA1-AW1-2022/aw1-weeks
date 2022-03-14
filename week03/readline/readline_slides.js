'use strict';
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });
rl.question('Task description: ', (answer) => {
    let description = answer;
    rl.question('Is the task important? (y/n)', (answer) => {
        let important = answer;
        rl.question('Is the task private? (y/n)', (answer) => {
            let privateFlag = answer;
            rl.question('Task deadline: ', (answer) => {
                let date = answer;
                console.log(description, important, privateFlag, date);
                rl.close();
            })
        })
    })
});

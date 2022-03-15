'use strict';

function resolveAfterMs(ms) {
    return new Promise((resolve, reject) => {
        if (ms < 0)
            reject('Negative delay');
        else
            setTimeout(() => {
                resolve('resolved');
            }, 2000);
    });
}

async function asyncCall() {
    try {
        console.log('calling');
        const result = await resolveAfterMs(-1);
        //console.log(result);
        return 'end';
    } catch (e) {
        console.log('Exception: ', e);
        throw new Error('eccezione');
    }
}
//asyncCall();
asyncCall().then(console.log).catch((x)=>console.log(x.toString()));

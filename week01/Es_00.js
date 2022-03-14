"use strict"

let array = ['Hello', 'World','it', 'cat', '4', 'ever'];
console.log(array);

array.forEach( x => {
                        if(x.length > 3){
                            console.log(x[0]+x[1]+x[x.length-2]+x[x.length-1]);
                        }
                        else if(x.length == 2)
                        {
                            console.log(x.concat(x));
                        }
                        else if(x.length == 3){
                            console.log(x[0]+x[1]+x[1]+x[2]);
                        }
                        else
                        {
                            console.log("");
                        }

                    });


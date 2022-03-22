"use strict"

//Inizializzo libreria Dayjs con formattazione personalizzata
const dayjs = require('dayjs');
var localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);


function Film(id, title, favorite, data, rating){
    
    this.id = id;
    this.title = title;
    this.favorite = favorite || false;
    if(data!=undefined){
        this.data = data;
    }
    if(rating!=undefined){
        this.rating = rating;
    }

    this.PrintFilm = () => {
                                let a;
                                let b;
                                if(this.data==undefined){
                                    a = "<not defined>";
                                }
                                else
                                {
                                    a = this.data.format('LL');
                                }
                                if(this.rating==undefined){
                                    b = "<not defined>";
                                }
                                else
                                {
                                    b = this.rating;
                                }
                                
                                console.log("Id: "+ this.id +", Title: "+ this.title +", Favorite: "+ this.favorite+", Watch date: "+ a +", Score: "+ b);
                                
                            };

    this.resetData = () =>  {
                                this.data = undefined;
                            };
}

function FilmLibrary(){
    this.list = [];
    this.addFilm2List = (Film) => {this.list.push(Film)};
    
    this.PrintList = () => {
                                this.list.forEach(x => {x.PrintFilm();})
                                console.log();
                           };

    this.sortId = () => {
                            this.list.sort( (x,y) => x.id-y.id);
                        };
    
    this.sortByDate = () => {
                                this.list.sort( (x,y) => {    
                                                            if(dayjs.isDayjs(x.data) && dayjs.isDayjs(y.data)){
                                                                if(x.data.isBefore(y.data))
                                                                return -1;
                                                                else
                                                                return 1;
                                                            }
                                                            else if(dayjs.isDayjs(x.data))
                                                                return -1;
                                                            else
                                                                return 1;

                                                         } );
                            };
    
    this.sortRating = () => {
                                this.list.sort( (x,y) => {    
                                                            if(x.rating!=undefined && y.rating!=undefined){
                                                                return y.rating-x.rating;
                                                            }
                                                            else if(x.rating!=undefined)
                                                                return 1;
                                                            else
                                                                return -1;

                                                          } );
                            };
    
    this.deleteFilm = (id_film) =>  {
                                        this.list.splice(this.list.findIndex(element => element.id==id_film), 1);
                                    };

    this.resetWatchedFilms = () => {
                                        this.list.forEach(x => x.resetData()); 
                                    };

    this.getratingd = () => {
                                const onlyratingd = new FilmLibrary();
                                onlyratingd.addFilmList(this.list.filter( x => x.rating!=undefined)); 
                                onlyratingd.sortRating();
                                onlyratingd.PrintList();
                          };

    this.addFilmList = (x) => {this.list = x};

    this.getAll = () =>{return this.list}                      

}

// Creo Lista aggiungendo i vari film
const fl = new FilmLibrary();

let f1 = new Film(4, "Matrix", false, undefined, undefined);
fl.addFilm2List(f1);

f1 = new Film(5, "Shrek", false, dayjs('2022-03-21'), 3);
fl.addFilm2List(f1);

f1 = new Film(1, "Pulp Fiction", true, dayjs('2022-03-10'), 5);
fl.addFilm2List(f1);

f1 = new Film(2, "21 Grams", true, dayjs('2022-03-17'), 4);
fl.addFilm2List(f1);

f1 = new Film(3, "Star Wars", false, undefined, undefined);
fl.addFilm2List(f1);

//Confronto tra lista prima e dopo sort
/*

fl.PrintList();
fl.sortByDate();
//fl.sortId();
fl.PrintList();

//Delete a film con index
fl.deleteFilm('4');
fl.PrintList();

//Reset Watched Films
fl.resetWatchedFilms();
fl.PrintList();

//Funzione getratingd
fl.getratingd();

*/

///WEEK02_01

//Apertura DB
const sqlite = require('sqlite3');
const db = new sqlite.Database('films.db', (err) => { if (err) throw err; });
//Stampa Film con Await e Promise
async function waitAllFilms() {
    return new Promise((resolve, reject) => {
        let sqlquery = "SELECT * FROM films";
        db.all(sqlquery, (err,rows)=>{ 
            
            if(err) 
                reject("Errore Lettura AllFilms");
            else{
                const listtemp = [];
                for (let row of rows) {
                    
                    listtemp.push(row);
                }
                console.log("***Lista Film***");
                listtemp.forEach(x => console.log(x));
                console.log("****************\n");

                resolve();
            }
        });

    });

};
//Stampa Film prefertiti con await e promise
async function waitFavoriteFilms() {
    return new Promise((resolve, reject) => {
        const sqlquery = "SELECT * FROM films WHERE favorite=?";
        const favorite = 1;
        db.all(sqlquery,[favorite], (err,rows)=>{
            
            if(err) reject("Errore Lettura Favorite");

            const listtemp = [];
            for (let row of rows) {
                
                listtemp.push(row);
            }

            console.log("***Lista Film Preferiti***");
            listtemp.forEach(x => console.log(x));
            console.log("****************\n");

            resolve();
        });

    });
};
//Stampa Film visti oggi con await e promise
async function waitWatchToday(){
    return new Promise((resolve, reject) =>{
        const sqlquery = "SELECT * FROM films WHERE watchdate=?";
        const watchdate = dayjs().format('YYYY-MM-DD');
        
        db.all(sqlquery,[watchdate], (err,rows) => {
            if(err) reject("Errore Lettura WatchToday");

            const listtemp = [];
            for (let row of rows) {
                
                listtemp.push(row);
            }

            console.log("***Lista Film visti oggi***");
            listtemp.forEach(x => console.log(x));
            console.log("****************\n");

            resolve();
            });
    });
};
//Stampa Film prima di data x
async function waitFilmBeforeData() {
    return new Promise((resolve, reject) => {
        const sqlquery = "SELECT * FROM films WHERE watchdate<?";
        const watchdate = dayjs().format('2022-03-16','YYYY-MM-DD');

        db.all(sqlquery, [watchdate], (err,rows) => {
            if(err) reject("Errore Lettura WatchdateBefore");

            const listtemp = [];
            for(let row of rows){
                listtemp.push(row);
            }

            console.log("***Lista Film Prima del "+ watchdate +"***");
            listtemp.forEach(x => console.log(x));
            console.log("****************\n");

            resolve();
        });
    });
};
//Stampa Film rating maggiore di x
async function waitFilmRatingBetterThen() {
    return new Promise((resolve, reject) => {
        const sqlquery = "SELECT * FROM films WHERE rating>?";
        const rating = 2;

        db.all(sqlquery, [rating], (err,rows) => {
            if(err) reject("Errore Lettura FilmRatingBetterThan");

            const listtemp = [];
            for(let row of rows){
                listtemp.push(row);
            }

            console.log("***Lista Film con Rate maggiore di "+ rating +"***");
            listtemp.forEach(x => console.log(x));
            console.log("****************\n");

            resolve();
        });
    });
};
//Stampa Film con titolo x
async function waitFilmWithTitle() {
    return new Promise((resolve, reject) => {
        const sqlquery = "SELECT * FROM films WHERE title=?";
        const title = "Star Wars";

        db.all(sqlquery, [title], (err,rows) => {
            if(err) reject("Errore Lettura FilmWithTitle");

            const listtemp = [];
            for(let row of rows){
                listtemp.push(row);
            }

            console.log("***Dati Film con titolo = \""+ title +"\" ***");
            listtemp.forEach(x => console.log(x));
            console.log("****************\n");

            resolve();
        });
    });
};

/*
async function main() {
    await Promise.all([waitAllFilms(), waitFavoriteFilms(), waitWatchToday(), waitFilmBeforeData(), waitFilmRatingBetterThen(), waitFilmWithTitle()]);
}
*/
async function main(){
    await waitAllFilms();
    await waitFavoriteFilms();
    await waitWatchToday();
    await waitFilmBeforeData();
    await waitFilmRatingBetterThen();
    await waitFilmWithTitle();

    return "Success";
}
main().then( (x) => { db.close(); console.log(x)} );
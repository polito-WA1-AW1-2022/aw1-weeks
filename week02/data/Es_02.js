"use strict"

//Inizializzo libreria Dayjs con formattazione personalizzata
const dayjs = require('dayjs');
var localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

//Apertura DB
const sqlite = require('sqlite3');
const db = new sqlite.Database('films.db', (err) => { if (err) throw err; });

const data_per_film_precedenti = dayjs().format('2022-03-16','YYYY-MM-DD');
const rating_film_migliori = 2;
const titolo_da_stampare = "Star Wars";

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

    this.addFilm2List = (film) => {
        if(!this.list.some(f => f.id == film.id))
            this.list.push(film);
        else
            throw new Error('Duplicate id');
    };
    
    this.PrintList = () => {
                                this.list.forEach(x => {x.PrintFilm();})
                                console.log();
                           };
    
    //Funzione di stampa formattata degli oggetti nel db
    this.PrintDBList = (list, titolostampa) =>{

        console.log("***"+ titolostampa +"***");
        list.forEach(x => console.log(x));
        console.log("****************\n");
    
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

    this.getAll = () =>{return this.list};
    
    //Lista FilmDB con Await e Promise
    this.waitAllFilmsDB = async function() {
        return new Promise((resolve, reject) => {
            let sqlquery = "SELECT * FROM films";
            db.all(sqlquery, (err,rows)=>{ 
                
                if(err) 
                    reject("Errore Lettura AllFilms");
                else{

                    resolve(rows);
                }
            });

        });

    };

    
    //Lista FilmDB prefertiti con await e promise
    this.waitFavoriteFilms = async function() {
        return new Promise((resolve, reject) => {
            const sqlquery = "SELECT * FROM films WHERE favorite=?";
            const favorite = 1;
            db.all(sqlquery,[favorite], (err,rows)=>{
                
                if(err) reject("Errore Lettura Favorite");

                resolve(rows);
            });

        });
    };

    
    //Lista FilmDB visti oggi con await e promise
    this.waitWatchToday = async function(){
        return new Promise((resolve, reject) =>{
            const sqlquery = "SELECT * FROM films WHERE watchdate=?";
            const watchdate = dayjs().format('YYYY-MM-DD');
            
            db.all(sqlquery,[watchdate], (err,rows) => {
                if(err) reject("Errore Lettura WatchToday");

                resolve(rows);
                });
        });
    };

    //Lista FilmDB prima di data x
    this.waitFilmBeforeData = async function() {
        return new Promise((resolve, reject) => {
            const sqlquery = "SELECT * FROM films WHERE watchdate<?";


            db.all(sqlquery, [data_per_film_precedenti], (err,rows) => {
                if(err) reject("Errore Lettura WatchdateBefore");

                resolve(rows);
            });
        });
    };

    //Lista FilmDB rating maggiore di x
    this.waitFilmRatingBetterThen = async function() {
        return new Promise((resolve, reject) => {
            const sqlquery = "SELECT * FROM films WHERE rating>?";

            db.all(sqlquery, [rating_film_migliori], (err,rows) => {
                if(err) reject("Errore Lettura FilmRatingBetterThan");

                resolve(rows);
            });
        });
    };
    
    //Lista Film con titolo x
    this.waitFilmWithTitle = async function() {
        return new Promise((resolve, reject) => {
            const sqlquery = "SELECT * FROM films WHERE title=?";


            db.all(sqlquery, [titolo_da_stampare], (err,rows) => {
                if(err) reject("Errore Lettura FilmWithTitle");

                resolve(rows);
            });
        });
    };


    //Week02_02
    //Store on DB
    this.storeFilm = async function(film){
        return new Promise((resolve, reject) => {
            const sqlquery = "INSERT INTO films(id, title, favorite, watchdate, rating) values(?,?,?,?,?)";

            db.run(sqlquery, [film.id, film.title, film.favorite, film.data.format('YYYY-MM-DD'), film.rating], (err) => {
                if(err) reject("Errore Inserimento Film");

                resolve("Inserimento riuscito");
            });
        });
    };
    //Delete Film with ID from DB
    this.deleteFilmDBFromID = async function(film){
        return new Promise((resolve, reject) => {
            const sqlquery = "DELETE FROM films WHERE id=?";

            db.run(sqlquery, [film.id], (err) =>{
                if(err) reject("Errore Delete From ID");

                resolve("Film con ID = "+ film.id +" rimosso dal DB");
            });
        });
    };
    //Delete watchdate dei film nel DB
    this.deleteWatchdateFromDB = async function(){
        return new Promise((resolve, reject) => {
            const sqlquery = "UPDATE films SET watchdate=? WHERE watchdate<> ?";
            
            db.run(sqlquery, ["NULL", "NULL"], (err) =>{
                if(err) reject("Errore Delete delle watchdate nel DB");

                resolve("Watchdate nel DB cancellate");
            });
        });
    };

};


async function main() {
    
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
    
    const filmlibraryDB = new FilmLibrary();

    //Operazioni con il DB
    filmlibraryDB.PrintDBList(await filmlibraryDB.waitAllFilmsDB(), " Lista Film");
    filmlibraryDB.PrintDBList(await filmlibraryDB.waitFavoriteFilms(), " Lista Film Preferiti");
    filmlibraryDB.PrintDBList(await filmlibraryDB.waitWatchToday(), " Lista Film visti oggi");
    filmlibraryDB.PrintDBList(await filmlibraryDB.waitFilmBeforeData(), " Lista Film Prima del "+ data_per_film_precedenti);
    filmlibraryDB.PrintDBList(await filmlibraryDB.waitFilmRatingBetterThen(), " Lista Film con Rate maggiore di "+ rating_film_migliori);
    filmlibraryDB.PrintDBList(await filmlibraryDB.waitFilmWithTitle(), " Dati Film con titolo = \""+ titolo_da_stampare +"\" ");

    //Operazioni di insert e delete
    //console.log(await filmlibraryDB.storeFilm(new Film(12, "Pulp Ficti", true, dayjs('2022-03-10'), 5)));
    //console.log(await filmlibraryDB.deleteFilmDBFromID(new Film(9, "Pulp Ficti", true, dayjs('2022-03-10'), 5)));
    //console.log(await filmlibraryDB.deleteWatchdateFromDB());

    return "Success";
}

main().then( (x) => { db.close(); console.log(x)} );

//Week02_02


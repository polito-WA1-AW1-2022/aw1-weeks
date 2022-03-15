"use strict"

//Inizializzo libreria Dayjs con formattazione personalizzata
const dayjs = require('dayjs');
var localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);


function Film(id, title, favorites, data, rate){
    
    this.id = id;
    this.title = title;
    this.favorites = favorites || false;
    if(data!=undefined){
        this.data = data;
    }
    if(rate!=undefined){
        this.rate = rate;
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
                                if(this.rate==undefined){
                                    b = "<not defined>";
                                }
                                else
                                {
                                    b = this.rate;
                                }
                                
                                console.log("Id: "+ this.id +", Title: "+ this.title +", Favorite: "+ this.favorites+", Watch date: "+ a +", Score: "+ b);
                                
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
                                                            if(x.rate!=undefined && y.rate!=undefined){
                                                                return y.rate-x.rate;
                                                            }
                                                            else if(x.rate!=undefined)
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

    this.getRated = () => {
                                const onlyrated = new FilmLibrary();
                                onlyrated.addFilmList(this.list.filter( x => x.rate!=undefined)); 
                                onlyrated.sortRating();
                                onlyrated.PrintList();
                          };

    this.addFilmList = (x) => {this.list = x};
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

//Funzione getRated
fl.getRated();
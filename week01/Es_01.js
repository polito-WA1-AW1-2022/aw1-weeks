"use strict"


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
}

function FilmLibrary(){
    this.list = [];
    this.addFilm2List = (Film) => {this.list.push(Film)};

    this.PrintList = () => { this.list.forEach(x =>{
                                                    console.log("***** List of films *****");
                                                    let 
                                                    console.log( + x.favorites)
                                                    })
                            }
}

const f1 = new Film(1, "Pulp Fiction", true, "March 10, 2022", 5);
const f2 = new Film(2, "21 Grams", true, "March 17, 2022", 4)
const f3 = new Film(3, "Star Wars", false, undefined, undefined);
const f4 = new Film(4, "Matrix", false, undefined, undefined);
const f5 = new Film(5, "Shrek", false, "March 21, 2022", 3);

const fl = new FilmLibrary();
fl.addFilm2List(f1);
fl.addFilm2List(f2);
fl.addFilm2List(f3);

fl.PrintList();


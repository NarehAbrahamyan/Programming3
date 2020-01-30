var express = require('Grass.js');
var express = require('GrassEater.js');
var express = require('Gishatich.js');
var express = require('GishataKer.js');
var express = require('GameEnd.js');
var grassArr = []; //խոտերի զանգված 1
var eatersArr = []; //խոտակերների զանգված 2
var gishatichArr = [];// Գիշատչի զանգված 3
var gishatakerArr = [];//Գիշատակերների զանգված 4
var gameenderArr = []; //The End
var side = 20;
var matrix = [
    [0,1,2,3,0,4,0,2,0,4,1,4,3,1,2,1,0,5,2,3,5,1,0,0,2,0,0],
    [1,2,3,5,2,0,1,0,2,3,0,0,0,2,1,0,2,1,0,1,0,1,1,2,3,1,1],
    [0,0,2,1,0,5,0,4,2,0,3,3,0,1,0,1,1,2,0,3,1,1,2,5,0,4,1],
    [0,1,2,3,0,4,0,2,0,4,1,4,3,1,1,2,1,0,2,3,5,1,0,0,2,0,0],
    [1,2,3,5,2,0,1,0,2,3,0,0,0,2,1,0,2,1,0,1,0,1,1,2,3,1,1],
    [0,0,2,1,0,5,0,4,2,0,3,3,0,1,0,1,1,2,0,3,1,1,2,5,0,4,1],
    [0,1,2,3,0,4,0,2,0,4,1,4,3,0,2,1,0,5,2,3,5,1,0,0,2,0,0],
    [1,2,3,5,2,0,1,0,2,3,0,0,0,2,1,0,2,1,0,1,0,1,1,2,3,1,1],
    [0,0,2,1,0,5,0,4,2,0,3,3,0,1,0,1,1,2,0,3,1,1,2,5,0,4,1],
    [0,1,2,3,0,4,0,2,0,4,1,4,3,0,2,1,0,5,2,3,5,1,0,0,2,0,0],
    [1,2,3,5,2,0,1,0,2,3,0,0,0,2,1,0,2,1,0,1,0,1,1,2,3,1,1],
    [0,0,2,1,0,5,0,4,2,0,3,3,0,1,0,1,1,2,0,3,1,1,2,5,0,4,1],
    [0,1,2,3,0,4,0,2,0,4,1,4,3,0,2,1,0,5,2,3,5,1,0,0,2,0,0]    
]




function setup() {
    noStroke();
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side); //կանվասի չափերը դնել մատրիցի չափերին համապատասխան
    background('#acacac');

    //մատրիցի վրա կրկնակի ցիկլը լցնում է խոտերի, խոտակերների զանգվածները օբյեկտներով 
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            }

            else if (matrix[y][x] == 2) {
                var eater = new GrassEater(x, y);
                eatersArr.push(eater);
            }

             else if (matrix[y][x] == 3) {
                var gishatich = new Gishatich(x, y);
                gishatichArr.push(gishatich);
            }

              else if (matrix[y][x] == 4) {
                var gishataker = new Gishataker(x, y);
                gishatakerArr.push(gishataker);
            }

              else if (matrix[y][x] == 5) {
                var gameender = new GameEnder(x, y);
                gameenderArr.push(gameender);
            }
        }
    }
}

function draw() {
    //գծում է աշխարհը
    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
                rect(j * side, i * side, side, side);
            } 

            else if (matrix[i][j] == 2) {
                fill("yellow");
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 0) {
                fill('#acacac');
                rect(j * side, i * side, side, side);
            }
               else if (matrix[i][j] == 3) {
                fill('red');
                rect(j * side, i * side, side, side);
            }
             else if (matrix[i][j] == 4) {
                fill('purple');
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 5) {
                fill('black');
                rect(j * side, i * side, side, side);
            }
        }
    }
    //խոտը բազմանում է
    for (var i in grassArr) {
        grassArr[i].mul();
    }
      // Գիշատիչը բազմանում է 
      for (var i in gishatichArr) {
        gishatichArr[i].mul();
    }
     //Գիշատակերը բազմանում է
      for (var i in gishatakerArr) {
        gishatakerArr[i].mul();
    }
    // բազմանում է
    // 

    //խոտակերը ուտում է խոտ
    for (var i in eatersArr) {
        eatersArr[i].eat();
    }
    //Գիշատիչն ուտում է խոտակեր
    for (var i in gishatichArr) {
        gishatichArr[i].eat();
    }
    // Գիշատակերը ուտում է Գիշատչին
     for (var i in gishatakerArr) {
        gishatakerArr[i].eat();
    }
     // ուտում է Գիշատչին խոտակեր խոտ
        for (var i in  gameenderArr) {
         gameenderArr[i].eat();
    }
 
}



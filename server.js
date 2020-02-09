
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var gishataKer = require('./modules/GishataKer.js');
var Weather = require('./modules/Weather.js');
let random = require('./modules/random');
var Gishatich = require('./modules/Gishatich.js');
var GameEnd = require('./modules/GameEnd.js');

//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
matrix = [];
gishatichArr = [];
gishatakerArr = [];
gameEndArr = [];
weatherArr = [];
grassHashiv = 0;
grassEaterHashiv = 0;
gishatakerHashiv = 0;
gishatichHashiv = 0;
gameendHashiv = 0;
weatherHashiv = 0;
weather = " ";

//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, gishatich, GishatiaKer, weather, gameEnd) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < gishatich; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < GishatiaKer; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < gameEnd; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < weather; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }
}
matrixGenerator(50, 1000, 200, 100, 10, 1, 2, 1);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3001);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++;
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var gishatich = new Gishatich(x, y);
                gishatichArr.push(gishatich);
                gishatichHashiv++;
            }
            else if (matrix[y][x] == 4) {
                var devileater = new gishataKer(x, y);
                gishatakerArr.push(devileater);
                gishatakerHashiv++;
            }
            else if (matrix[y][x] == 5) {
                var gameend = new GameEnd(x, y);
                gameEndArr.push(gameend);
                gameendHashiv++;
            }
            else if (matrix[y][x] == 6) {
                var exanak = new Weather(x, y);
                weatherArr.push(exanak);
                weatherHashiv++;
            }

        }
    }
}
creatingObjects();
let counter = 0;

function game() {
    counter++;

    if (counter >= 0 && counter <= 10) {
        weather = "spring"
    }
    else if (counter > 10 && counter <= 20) {
        weather = "summer"
    }
    else if (counter > 20 && counter <= 30) {
        weather = "autumn"
    }
    else if (counter > 30 && counter <= 40) {
        weather = "winter"
    }
    else {
        counter = 0
    }
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (gishatichArr[0] !== undefined) {
        for (var i in gishatichArr) {
            gishatichArr[i].eat();
        }
    }
    if (gishatakerArr[0] !== undefined) {
        for (var i in gishatakerArr) {
            gishatakerArr[i].eat();
        }
    }
    if (gameEndArr[0] !== undefined) {
        for (var i in gameEndArr) {
            gameEndArr[i].eat();
        }
    }
    if (weatherArr[0] !== undefined) {
        for (var i in weatherArr) {
            weatherArr[i].mul();
        }
    }




    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEatercounter: grassEaterHashiv,
        gishatichCounter: gishatichHashiv,
        gishatakerCounter: gishatakerHashiv,
        weatherCounter: weatherHashiv,
        gameendCounter: gameendHashiv,
        weather: weather

    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}
setInterval(game, 600);
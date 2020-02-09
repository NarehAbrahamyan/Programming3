
//! Setup function fires automatically
function setup() {

    var socket = io();

    var side = 30;

    var matrix = [];


    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let gishatichCountElement = document.getElementById('gishatichCount');
    let gishatakerCountElement = document.getElementById('gishatakerCount');
    let weatherCountElement = document.getElementById('weatherCount');
    let gameendCountElement = document.getElementById('gameendCount');
    let weatherElement = document.getElementById('weather');

    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEatercounter;
        gishatichCountElement.innerText = data.gishatichCounter;
        gishatakerCountElement.innerText = data.gishatakerCounter;
        weatherCountElement.innerText = data.weatherCounter;
        gameendCountElement.innerText = data.gameendCounter;
        weatherElement.innerText = data.weather;

        var weather = data.weather;


        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');


        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)
        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if (weather == "spring") {
                        fill("green");
                    }
                    else if (weather == "summer") {
                        fill("#66ff66");
                    }
                    else if (weather == "autumn") {
                        fill("#006600");
                    }
                    else if (weather == "winter") {
                        fill("#b3ffb3");
                    }

                }
                else if (matrix[i][j] == 2) {
                    if (weather == "spring") {
                        
                        fill("yellow");
                    }
                    else if (weather == "summer") {
                        fill("#F3C13A");
                    }
                    else if (weather == "autumn") {
                        fill("#E2B13C");
                    }
                    else if (weather == "winter") {
                        fill("#F5D76");
                    }
                }

                else if (matrix[i][j] == 0) {
                    fill('#acacac');
                }

                else if (matrix[i][j] == 3) {
                    if (weather == "spring") {
                        fill('red');
                    }
                    else if (weather == "summer") {
                        fill("#9D2933");
                    }
                    else if (weather == "autumn") {
                        fill("#CF3A24");
                    }
                    else if (weather == "winter") {
                        fill("#D24D57");
                    }

                } else if (matrix[i][j] == 4) {
                    if (weather == "spring") {
                        fill('black');
                    }
                    else if (weather == "summer") {
                        fill("#262626");
                    }
                    else if (weather == "autumn") {
                        fill("#1a1a1a");
                    }
                    else if (weather == "winter") {
                        fill("#0d0d0d");
                    }

                } else if (matrix[i][j] == 5) {
                    if (weather == "spring") {
                        fill('purple');
                    }
                    else if (weather == "summer") {
                        fill("#990099");
                    }
                    else if (weather == "autumn") {
                        fill("#cc00cc");
                    }
                    else if (weather == "winter") {
                        fill("#ff99ff");
                    }

                }
                else if (matrix[i][j] == 6) {
                    if (weather == "spring") {
                        fill('aqua');
                    }
                    else if (weather == "summer") {
                        fill("##00cccc");
                    }
                    else if (weather == "autumn") {
                        fill("#66ffff");
                    }
                    else if (weather == "winter") {
                        fill("#99ffff");
                    }

                }
                rect(j * side, i * side, side, side);
            }
        }
    }
}


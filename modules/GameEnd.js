var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class GameEnd extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 10;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    } 
    mul() {
        let emptyCells = this.chooseCell(6);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 2;
            let gameEnd = new GameEnd(x, y);
            gameEndArr.push(gameEnd);
            this.life = 8;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(1);
        let newCell = random(emptyCells);

        if (newCell) {

            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            for (let i in gishatakerArr) {
                if (gishatakerArr[i].x == x && gishatakerArr[i].y == y) {
                    gishatakerArr.splice(i, 1)
                }

                else if (gishatichArr[i].x == x && gishatichArr[i].y == y) {
                    gishatichArr.splice(i, 1)
                }
                else if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }

            else if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
           else if (weatherArr[i].x == x && weatherArr[i].y == y) {
                    weatherArr.splice(i, 1)
                }

            }
            this.x = x;
            this.y = y;

            if (this.life >= 30)
                this.mul();
            }
        }
        else {
            this.move()
        }
    }
    move() {
        this.life--;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.life < 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in gameEndArr) {
            if (gameEndArr[i].x == this.x && gameEndArr[i].y == this.y) {
                gameEndArr.splice(i, 1)
            }
        }
    }

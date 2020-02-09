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
        for (var i in this.directions) {

            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                matrix[y][x] = 5;
                matrix[this.y][this.x] = 0;
                this.life++;
                for (let i in gishatakerArr) {
                    if (gishatakerArr[i].x == x && gishatakerArr[i].y == y) {
                        gishatakerArr.splice(i, 1)
                    }
                }
                for (let i in gishatichArr) {
                    if (gishatichArr[i].x == x && gishatichArr[i].y == y) {
                        gishatichArr.splice(i, 1)
                    }
                }
                for (let i in grassArr) {
                    if (grassArr[i].x == x && grassArr[i].y == y) {
                        grassArr.splice(i, 1)
                    }
                }
                for (let i in grassEaterArr) {
                    if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                        grassEaterArr.splice(i, 1)
                    }
                }
                for (let i in weatherArr) {
                    for (var i = 0; i < matrix.length; i++) {
                        for (var j = 0; j < matrix[i].length; j++) {
                            matrix[i][j] = 0;

                            for (let i in gishatakerArr) {
                                if (gishatakerArr[i].x == i && gishatakerArr[i].y == j) {
                                    gishatakerArr.splice(i, 1)
                                }
                            }
                            for (let i in gishatichArr) {
                                if (gishatichArr[i].x == i && gishatichArr[i].y == j) {
                                    gishatichArr.splice(i, 1)
                                }
                            }
                            for (let i in grassArr) {
                                if (grassArr[i].x == i && grassArr[i].y == j) {
                                    grassArr.splice(i, 1)
                                }
                            }
                            for (let i in grassEaterArr) {
                                if (grassEaterArr[i].x == i && grassEaterArr[i].y == j) {
                                    grassEaterArr.splice(i, 1)
                                }
                            }
                }
                this.x = x;
                this.y = y;

                if (this.life >= 30) {
                    this.mul();

                }
            }
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
    }
       
}

}


}

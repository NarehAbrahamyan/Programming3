var LiveForm = require("./LiveForm");
var random = require("./random.js");

class Gishataker {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 25;
        this.directions = 
        [];
    }

    //թարմացնել շրջապատի կոորդինատները
    updateCoordinates() {
        this.directions = [
            [this.x +1 , this.y - 1],
            [this.x +1, this.y],
            [this.x + 1, this.y + 1],
            [this.x +1 , this.y + 2],
            [this.x +1, this.y + 3],
            [this.x +1 , this.y + 4],
            [this.x + 1, this.y + 5],
            [this.x +1 , this.y + 6]
        ];
    }

    chooseCell(character) {
        this.updateCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }



    //move() շարժվել
    move() {
        //որոնում է դատարկ տարածքներ
        var emptyCells = this.chooseCell(0);
        var coord = random(emptyCells);

        if (coord) {
            var x = coord[0];
            var y = coord[1];

            //շարժվում է
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            //նոր կորդինատներ է ստանում
            this.x = x;
            this.y = y;
        }

        else{
            emptyCells = this.chooseCell(1);
            var coord = random(emptyCells);
              if (coord) {
            var x = coord[0];
            var y = coord[1];

            //շարժվում է
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 1;

             for (var i in grassArr) {
            if (x == grassArr[i].x && y == grassArr[i].y) {
               grassArr.splice(i, 1);
            }
            var gxot = new Grass(this.x,this.y);
            grassArr.push(gxot)
            this.x = x;
            this.y = y;
        }
            //նոր կորդինատներ է ստանում
        }

        }
    }


    //eat()-ուտել
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var gishatichCells = this.chooseCell(3);
        var coord = random(gishatichCells);

        //եթե կա հարմար սնունդ
        if (coord) {
            var x = coord[0];
            var y = coord[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;

            //բազմացման գործակիցը մեծացնում է
            this.multiply++;
 
            //մեծացնում է էներգիան
            this.energy++;

            // սննդի զանգվածից ջնջում է կերված սնունդը
            for (var i in gishatichArr) {
                if (x == gishatichArr[i].x && y == gishatichArr[i].y) {
                    gishatichArr.splice(i, 1);
                }
            }

            //եթե պատրաստ է բազմացմանը, բազմանում է 
            if (this.multiply == 30) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            //եթե չկա հարմար սնունդ 
            this.move();
            this.energy--;
            if (this.energy <= 0) { //մահանում է, եթե էներգիան 0֊ից ցածր է
                this.die();
            }
        }
    }

    //mul() բազմանալ
    mul() {
        //փնտրում է դատարկ տարածք
        var emptyCells = this.chooseCell(0);
        var coord = random(emptyCells);

        //եթե կա բազմանում է
        if (coord){
            var x = coord[0];
            var y = coord[1];
            // this.multiply++;
            //ստեղծում է նոր օբյեկտ (այստեղ գիշատակեր ) 
            //և տեղադրում է այն Գիշատակերների  զանգվածի մեջ
            var 

            //հիմնական matrix-ում կատարում է գրառում նոր Գիշատիչների  մասին
            matrix[y][x] = 4;
        } 
    }

    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //ջնջում է ինքն իրեն Գիշատակերների  զանգվածից
        for (var i in gishatakerArr) {
            if (this.x == gishatakerArr[i].x && this.y == gishatakerArr[i].y) {
                gishatakerArr.splice(i, 1);
            }
        }
    }

}
function setup() {
    createCanvas(500,500);
    background('#acacac');
}
function draw() {
    fill(20,20,200);
    ellipse(mouseX, mouseY, 50, 50);
};
let value = 0;
function mouseDragged() {
    value = value + 5;
    if (value > 255) {
      value = 0;
    }
  }


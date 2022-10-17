let PATH_LENGTH = 5000;
let PATH_MIN_STEP_SIZE = 1;
let PATH_MAX_STEP_SIZE = 2;
let RECTANGLES_PER_COLUMN = 150;
let RECTANGLE_OFFSET_PER_COLUMN = 2;
let RECTANGLE_HEIGHT = 10;

function setup() {
  createCanvas(1300, 1000);
  angleMode(RADIANS);
  colorMode(HSL, 100);
  randomSeed(1);

  background(42, 50, 96);
  // background(80, 82, 13);
  translate(width / 2, height / 2);

  let initialPoint = {
    x: random(-width / 8, width / 8),
    // x: -width + 10,
    y: random(-height / 2, -height / 16),
  };

  let path = [initialPoint];
  // let angle = random(TAU);
  let angle = random(TAU);
  let MAX_ROTATION = TAU / 75;
  let rotation = random(MAX_ROTATION);

  // 1 means clockwise, -1 means counter-clockwise
  let rotationDirection = 1;
  let turnCounter = 30;
  let isTurning = false;
  for (let i = 1; i < PATH_LENGTH; i++) {
    let step = random(PATH_MIN_STEP_SIZE, PATH_MAX_STEP_SIZE);
    let x = path[i - 1].x + step * cos(angle);
    let y = path[i - 1].y + step * sin(angle);

    if (isTurning) {
      turnCounter--;
      if (turnCounter === 0) {
        turnCounter = 30;
        isTurning = false;
      }
    } else {
      let shouldTurn = angle < -TAU / 12 || angle > TAU / 2 + TAU / 12;
      if (shouldTurn) {
        isTurning = true;
        rotationDirection = -rotationDirection;
      }
      rotation = random(MAX_ROTATION);
    }

    let rotationWhenTurning = random(
      MAX_ROTATION - MAX_ROTATION / 2,
      MAX_ROTATION + MAX_ROTATION / 2
    );
    let shouldRotate = random() > 0.9;
    angle =
      angle +
      rotationDirection *
        (isTurning ? rotationWhenTurning : shouldRotate ? rotation : 0);

    path.push({ x, y });
  }

  noStroke();
  let gradient = chroma
    .scale("Blues")
    .padding([0.2, 0.2])
    .colors(RECTANGLES_PER_COLUMN);
  for (let j = 1; j < path.length; j++) {
    for (let i = 0; i < RECTANGLES_PER_COLUMN; i++) {
      let offset = i * RECTANGLE_OFFSET_PER_COLUMN;
      let color = gradient[RECTANGLES_PER_COLUMN - i - 1];
      fill(chroma(color).alpha(0.3).hex());
      rect(
        path[j - 1].x,
        path[j - 1].y + offset,
        path[j].x - path[j - 1].x,
        RECTANGLE_HEIGHT
      );
    }
  }

  // for (let i = 1; i < path.length; i++) {
  //   stroke(0);
  //   strokeWeight(1);
  //   line(path[i - 1].x, path[i - 1].y, path[i].x, path[i].y);
  // }
}

function draw() {}

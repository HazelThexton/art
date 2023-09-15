/******************************************************************************
Far Filter
by Hazel Thexton

A

Animal images from:

 ******************************************************************************/
var color;
var color1;
var color2;
var color3;

let dotColor;
let bgColor;
let img;
let scale;
let variation = 1;
let variation2 = 1;
let variation3 = 1;
let variation4 = 1;

// preload()
//
// Loads the image before the program starts
function preload() {
    img = loadImage('/art/assets/images/12.jpg');
    //
}

// setup()
//
// Creates the canvas, resizes the image
function setup() {
    rectMode(CENTER);
   scale = windowHeight/img.height;
    img.resize(img.width * scale, windowHeight);
    createCanvas(img.width, img.height);
    background("#ffffff");

    shapeSize = 20;
    shapeSize2 = shapeSize / 5 * 3;
    shapeSize3 = shapeSize / 5 * 2;
    shapeSize4 = shapeSize / 5;
    numDotsInColumn = Math.floor(height / shapeSize);
    // Magnitude of randomness in inner shape size
    mag = 4;

    //noStroke();
    noLoop();
}

// draw()
//
// 
function draw() {
// draws the mosaic with the specified dot radius
    drawMosaic(shapeSize/2)
}

columnWidth = (dotRadius) => dotRadius * 2;

let numberOfColumns = (dotRadius) =>
Math.ceil(width / columnWidth(dotRadius));

function drawColumnDots(dotRadius, offsetX) {

    for (let i = 0; i < numDotsInColumn; i++) {
        centerX = constrain(offsetX + dotRadius, 0, width + -1);
        centerY = constrain(i * shapeSize + dotRadius, 0, height + -1);

        pickColors(dotRadius, i, centerX, centerY)

        noStroke()
        fill(dotColor);
        rect(centerX, centerY, shapeSize + random(0, 1), shapeSize + random(0, 1));
        fill(dotColor2);

        let r = random(-mag, mag);
        rect(centerX, centerY, shapeSize2 + r, shapeSize2 + r);

        fill(dotColor3);
        rect(centerX, centerY, shapeSize4 + r / 2, shapeSize4 + r / 2);
        //fill(dotColor4);
        //ellipse(centerX + -dotRadius, centerY + -dotRadius, shapeSize4 + r/2);
    }
}

function drawMosaic(dotRadius) {
    for (let i = 0; i < numberOfColumns(dotRadius); i++) {
        offsetX = i * columnWidth(dotRadius);
        drawColumnDots(dotRadius, offsetX);
    }
}

function pickColors(dotRadius, i, centerX, centerY) {

    // Find origins to pick colors from

    let centerColorX = constrain(offsetX + random(0, shapeSize), 0, width);
    let centerColorY = constrain(i * shapeSize + random(0, shapeSize), 0, height);
    let centerColor2X = constrain(offsetX + random(0, shapeSize), 0, width);
    let centerColor2Y = constrain(i * shapeSize + random(0, shapeSize), 0, height);

    dotColor = img.get(centerX, centerY);
    dotColor2 = img.get(centerColorX, centerColorY);
    dotColor3 = img.get(centerColor2X, centerColor2Y);
    dotColor4 = img.get(centerColor2X, centerColor2Y);

    for (let index = 0; index < dotColor.length; index++) {
        variation = 1 * random(0, 100);
        variation2 = 1 * random(0, 80);
        variation3 = 1 * random(0, 50);
        variation4 = 1 * random(0, 50);
        dotColor[index] = constrain(dotColor[index] + variation, 0, 255);
        dotColor2[index] = constrain(dotColor2[index] + variation2, 0, 255);
        dotColor3[index] = constrain(dotColor3[index] + variation3, 0, 255);
        dotColor4[index] = constrain(dotColor4[index] + variation4, 0, 255);
    }
}

//function draw() {
//    noStroke();
//  color = map(mouseX,0,width, -100,100);
//if (mouseIsPressed) {

//    var rangeUp = constrain(color+50, -100, 100);
//    var rangeDown = constrain(color-50, -100, 100);

//  color1 = int(random(rangeDown,rangeUp));
//  var convertedColor = constrain(map(color1,-100, 100,0,255),0,255);


//  color2 = int(random(rangeDown,rangeUp));
//  var convertedColor2 = constrain(map(color2,-100, 100,0,255),0,255);

//  color3 = color1 + color2;
//  var convertedColor3 = constrain(map(color3,-100, 100,0,255),0,255);

//  fill(convertedColor);
//  rect(width/2,height/2,200,200);
//  fill(convertedColor2);
//  rect(width/2,height/2,150,150);
//  fill(convertedColor3);
//  rect(width/2,height/2,100,100);

//  console.log(convertedColor,convertedColor2,convertedColor3);
//}
//}

//function square() {
//    noStroke();
//  color = map(mouseX,0,width, -100,100);
//if (keyIsDown(ENTER)) {

//    var rangeUp = constrain(color+50, -100, 100);
//    var rangeDown = constrain(color-50, -100, 100);

//  color1 = int(random(rangeDown,rangeUp));
//  var convertedColor = constrain(map(color1,-100, 100,0,255),0,255);


//  color2 = int(random(rangeDown,rangeUp));
//  var convertedColor2 = constrain(map(color2,-100, 100,0,255),0,255);

//  color3 = color1 + color2;
//  var convertedColor3 = constrain(map(color3,-100, 100,0,255),0,255);

//  fill(convertedColor);
//  rect(width/2,height/2,170,170);
//  fill(convertedColor2);
//  rect(width/2,height/2,140,140);
//  fill(convertedColor3);
//  rect(width/2,height/2,100,100);

//  console.log(convertedColor,convertedColor2,convertedColor3);
//}
//}
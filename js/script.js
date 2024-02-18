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
let pastColor = [];
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
	//img = loadImage('https://64.media.tumblr.com/efb59c1d4ffd277b1104664c48423d05/5ff40c7a6f818087-87/s540x810/9d7f7d354e3a8cde2dcfbdbedf628703902c2459.pnj');
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

    shapeSize = 5;
    shapeSize2 = shapeSize / 5 * 3;
    shapeSize3 = shapeSize / 5 * 1.5;
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
        
  push()

    translate(centerX, centerY);
	angleMode(DEGREES);
    rotate(random(-5, 5));
    rectMode(CENTER)
	fill(dotColor2);
    let r = random(-mag, mag);
        rect(0, 0, shapeSize2 + r, shapeSize2 + r);

    pop();
      push()

    translate(centerX, centerY);
	angleMode(DEGREES);
    rotate(random(-5, 5));
    rectMode(CENTER)
        fill(dotColor3);
        rect(0, 0, shapeSize3 + r / 2, shapeSize3 + r / 2);

    pop();  

        
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
	if(deltaE([dotColor[0],dotColor[1],dotColor[2]], [pastColor[0],pastColor[1],pastColor[2]]) <= 50){
	centerColorX = constrain(offsetX + random(0, shapeSize), 0, width);
	centerColorY = constrain(i * shapeSize + random(0, shapeSize), 0, height);
	dotColor = img.get(centerX, centerY);
	}
    dotColor2 = img.get(centerColorX, centerColorY);
	if(deltaE([dotColor[0],dotColor[1],dotColor[2]], [dotColor2[0],dotColor2[1],dotColor2[2]]) <= 50){
		
	centerColorX = constrain(offsetX + random(0, shapeSize), 0, width);
	centerColorY = constrain(i * shapeSize + random(0, shapeSize), 0, height);
    dotColor2 = img.get(centerColorX, centerColorY);
	}
		
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
	
	
   pastColor = dotColor; 
}

function deltaE(rgbA, rgbB) {
  let labA = rgb2lab(rgbA);
  let labB = rgb2lab(rgbB);
  let deltaL = labA[0] - labB[0];
  let deltaA = labA[1] - labB[1];
  let deltaB = labA[2] - labB[2];
  let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
  let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
  let deltaC = c1 - c2;
  let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
  let sc = 1.0 + 0.045 * c1;
  let sh = 1.0 + 0.015 * c1;
  let deltaLKlsl = deltaL / (1.0);
  let deltaCkcsc = deltaC / (sc);
  let deltaHkhsh = deltaH / (sh);
  let i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
  return i < 0 ? 0 : Math.sqrt(i);
}

function rgb2lab(rgb){
  let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, x, y, z;
  r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  
  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
  y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
  z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
  return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
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

function startAudio(){
  Tone.start();
  console.log("Audio has Started");
  loop();
}

let i = 0;
let gameStarted = false;

let counter = 0;
let newFont = "";



function stopTone(){
  gameStarted = false;
  counter = 0;
  // background(255);
  console.log(gameStarted);
}

function startAudioVisLoop(){
  gameStarted = true;
  counter = 0;
}


let filterS = new Tone.Filter(800, 'lowpass')
let revB = new Tone.Reverb(2).toDestination();
revB.wet.value = 0.3;
let del = new Tone.PingPongDelay("8t", 0.25);
del.wet.value = 0.15;
let synth = new Tone.AMSynth({
oscillator: {type: "sine",},
polyphony: 8,
envelope: {
            attack: 0.5,
            decay: 0.2,
            sustain: 0.1,
            release: 0.5
}});
synth.connect(filterS);
filterS.connect(del);
del.connect(revB);


let filterS2 = new Tone.Filter(800, 'lowpass')
let revB2 = new Tone.Reverb(2).toDestination();
revB2.wet.value = 0.25;
let del2 = new Tone.PingPongDelay("8t", 0.25);
del2.wet.value = 0.15;
let synth2 = new Tone.AMSynth({
oscillator: {type: "sine",},
polyphony: 8,
envelope: {
            attack: 0.5,
            decay: 0.2,
            sustain: 0.1,
            release: 0.5
}});
synth2.connect(filterS);
filterS2.connect(del);
del2.connect(revB);


let filterS3 = new Tone.Filter(800, 'lowpass')
let revB3 = new Tone.Reverb(2).toDestination();
revB3.wet.value = 0.3;
let del3 = new Tone.PingPongDelay("8t", 0.25);
del3.wet.value = 0.15;
let synth3 = new Tone.AMSynth({
oscillator: {type: "sine",},
polyphony: 8,
envelope: {
            attack: 0.5,
            decay: 0.5,
            sustain: 0.1,
            release: 1
}});
synth3.connect(filterS);
filterS3.connect(del);
del3.connect(revB);

// let textScreen;
// let fontLoaded = false;


//function drawText(font) {
//  fontLoaded = true;
//  textFont(font, 22);
//  fill(0);
//}
//let = cFont;


function preload(){
  data = loadTable("avg_temp_year.csv", "csv", "header");
  newFont = loadFont("Arialn.ttf");
}



function setup() {
  //button = createButton("Start AudioVis Loop");
  //button.mousePressed(() => {});
  //button.mousePressed(() => counter = 0);

  let canvas = createCanvas(600, 600, WEBGL);
  textFont(newFont);
  textSize(18);
  //canvas.position(400, 100);
  //canvas.class("lemon");

  // loadFont("Lato", drawText);

  noFill();
}

function draw() {
  if (gameStarted){
    console.log(gameStarted);
    // speed fo viz
    if(frameCount % 30 == 0){
      let row = data.getRow(counter);
      let year = row.get("Year");
      let avgTemp = row.get("AVG_TEMP");
      let aTstr = row.get("AVG_TEMP").toString();
      // console.log(year);


      background(255);
      ambientLight(255);
      ambientMaterial(100);
      directionalLight(255, 200, 100, -1, 0, -2);
      shininess(2);

      //textScreen = createGraphics(600, 600);
      //textScreen.textSize(18);

      text(year, 50, -100);

      tempSplit = aTstr.split(".");

      if (tempSplit[0].length == 1 && tempSplit[1].length == 2){
        text("0" + avgTemp +  "\u00B0" + "C", 500, -100);
      }

      else if (tempSplit[0].length == 1 && tempSplit[1].length == 1){
        text("0" + avgTemp + "0" + "\u00B0" + "C", 500, -100);
      }

      else if (tempSplit[0].length == 2 && tempSplit[1].length == 1){
        text(avgTemp + "0" + "\u00B0" + "C", 500, -100);
      }

      else{
        text(avgTemp +  "\u00B0" + "C", 500, -100);
      }

      //drawingContext.disable(drawingContext.DEPTH_TEST)
      //drawingContext.enable(drawingContext.BLEND)
      //image(textScreen, -300, -300);
      //drawingContext.enable(drawingContext.DEPTH_TEST)
      // yearcounter
      //textFont('Source Code Pro');
      //textAlign(CENTER);
      //text(((int(textData) + counter) % (2023 - 1872)) + 1872, width * 0.5, height * 0.5);
      //text("0 Degrees", width * 0.5, height * 0.5 - 55);
      push();
      noFill();
      translate(width * 0.5 + 0.5, height * 0.5);
      rotate(radians(frameCount))
      //circle(0, 0, 100);
      pop();

      //text("15 Degrees", width * 0.5, height * 0.5 - 130);
      push();
      noFill();
      translate(width * 0.5, height * 0.5);
      //circle(0, 0, 250);
      pop();

      //text("30 Degrees", width * 0.5, height * 0.5 - 205);
      push();
      noFill();
      translate(width * 0.5, height * 0.5);
      //circle(0, 0, 400);
      pop();

      push();
      noFill();
      // stroke(sum / temps.length * 10 % 255, 0, 0);
      stroke(0);
      //strokeWeight(5);
      // translate(width * 0.5, height * 0.5);
      translate(0, 0)
      rotateZ(radians(frameCount));
      rotateY(sin(frameCount));
      // circle(0, 0, sum / temps.length * 15);
      sphere(avgTemp * 11,
             int(map(avgTemp, 7.52, 12.41, 3, 13)),
             int(map(avgTemp, 7.52, 12.41, 3, 13)));
      pop();

      synth.harmonicity.value = map(avgTemp, 7.52, 12.41, 0.95, 1.15);
      filterS.frequency.value = map(avgTemp, 7.52, 12.41, 100, 10000);
      synth.triggerAttackRelease("D2", "8n");

      synth2.harmonicity.value = map(avgTemp, 7.52, 12.41, 0.95, 1.15);
      filterS2.frequency.value = map(avgTemp, 7.52, 12.41, 100, 10000);
      synth2.triggerAttackRelease("A2", "8n");


      synth3.harmonicity.value = map(avgTemp, 7.52, 12.41, 0.95, 1.15);
      filterS3.frequency.value = map(avgTemp, 7.52, 12.41, 100, 10000);
      synth3.triggerAttackRelease("E3", "8n");

      counter += 1;
      if (year == 2022){
        stopTone();
      }
    }
  }
}

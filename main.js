function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}

function modelLoaded(){
  console.log("model loaded");
}

function draw(){
  image(video,0,0,300,300);
  classifier.classify(video, gotResults);
}
var previous_result = "";
function gotResults(error,results){
  if (error){
    console.error(error);
  }
  else{
    if((results[0].confidence > 0.5) && (previous_result != results[0].label)){
      console.log(results);
      previous_result = results[0].label;
      var synth = window.speechSynthesis;
      var speak_data = "Object detected is " + results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);
      document.getElementById("object_name").innerHTML = results[0].label;
      document.getElementById("object_accuracy").innerHTML = Math.floor(results[0].confidence * 100) + " %";
    }
  }
}
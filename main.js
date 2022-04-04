prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id="image_captured" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version:",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/J5cpF9-zx/model.json',modelLoaded);

function modelLoaded() {
    console.log("Model Loaded Successfully!");
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "The Prediction Is "+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("image_captured");
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "ok"){
            document.getElementById("result_emoji").innerHTML = "&#128076;";
            document.getElementById("quote").innerHTML = "Ok, I got it.";
        }
        if(results[0].label == "thumbs up"){
            document.getElementById("result_emoji").innerHTML = "&#128077";
            document.getElementById("quote").innerHTML = "Good job!";
        }
        if(results[0].label == "Peace"){
            document.getElementById("result_emoji").innerHTML = "&#9996;";
            document.getElementById("quote").innerHTML = "Peace!";
        }
        if(results[0].label == "Unity"){
            document.getElementById("result_emoji").innerHTML = "&#9994;";
            document.getElementById("quote").innerHTML = "Yes! lets unite to that.";
        }
      
        if(results[0].label == "Rock"){
            document.getElementById("result_emoji").innerHTML = "&#129304;";
            document.getElementById("quote").innerHTML = "Rock n roll!!";
        }
        if(results[0].label == "Bye"){
            document.getElementById("result_emoji").innerHTML = "&#128075;";
            document.getElementById("quote").innerHTML = "Bye Bye!";
        }
    }
}
song1 = "";
song2 = "";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
leftWristScore = 0;
rightWristScore = 0;
song1_status = "";
song2_status = "";
status = "";

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup(){
    canvas = createCanvas(400,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}

function modelLoaded(){
    console.log("PoseNet is initialized!");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist X = " + rightWristX +"right wrist Y" + rightWristY);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftwristX = " + leftWristX +"leftwristY" + leftWristY);
        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[9].score;
    }
}
function draw(){
    image(video,0,0,400,400);
    stroke("FF0000");
    fill("FF0000");
    song1_status = song1.isPlaying()
    song2_status = song2.isPlaying()
    if(leftWristScore > 0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();
    }
    if (song2_status == false) {
        song1.play();
       document.getElementById("song").innerHTML = "playing - Harry Potter Theme Song";

    }
    if(rightWristScore > 0.2){
        circle(rightWristX,rightWristY,20)
        song2.stop();
    }
    if(song1_status == false){
        song2.play();
        document.getElementById("song").innerHTML = "playing - Peter Pan Song"
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
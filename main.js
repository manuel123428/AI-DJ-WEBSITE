song="";
leftx=0;
lefty=0;
rightx=0;
righty=0;
scoreLeftWrist=0;
scoreRightWrist=0;
function preload(){
    song=loadSound("music.mp3")
}
function setup(){
    canvas = createCanvas(600,500)
    canvas.center()
    video = createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded)
    poseNet.on('pose',gotPoses)
}
function modelLoaded(){
    console.log("Poses loaded")
}
function draw(){
    image(video,0,0,600,500)
    fill('#ff0000')
    stroke("#ff0000")
    if(scoreRightWrist > 0.2){
        circle(rightx,righty,20);
        if(righty > 0 && righty <=100){
            document.getElementById("speed").innerHTML="Speed = 0.5x"
            song.rate(0.5)
        }
        else if(righty > 100 && righty <=200){
            document.getElementById("speed").innerHTML="Speed = 1x"
            song.rate(1)
        }
        else if(righty > 200 && righty <=300){
            document.getElementById("speed").innerHTML="Speed = 1.5x"
            song.rate(1.5)
        }
        else if(righty > 300 && righty <=400){
            document.getElementById("speed").innerHTML="Speed = 2x"
            song.rate(2)
        }
        else if(righty > 400 && righty <=500){
            document.getElementById("speed").innerHTML="Speed = 2.5x"
            song.rate(2.5)
        }
    }
    if(scoreLeftWrist > 0.2){
        circle(leftx,lefty,20);
        InNumberleftY=Number(lefty);
        remove_decimals=floor(InNumberleftY);
        volume= remove_decimals/500;
        document.getElementById("volume").innerHTML="Volume = "+ volume;
        song.setVolume(volume)
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1)
}
function gotPoses(results){
    if(results.length>0){
        console.log(results)
        scoreRightWrist= results[0].pose.kepoints[10].score;
        scoreLeftWrist= results[0].pose.kepoints[9].score;
        console.log("scoreRightWrist = "+ scoreRightWrist +" scoreLeftWrist = "+ scoreLeftWrist);
        leftx=results[0].pose.leftWrist.x;
        lefty=results[0].pose.leftWrist.y;
        console.log("Left wrist x = "+leftx+"Left wrist y = "+lefty);
        rightx=results[0].pose.rightWrist.x;
        righty=results[0].pose.rightWrist.y;
        console.log("right wrist x = "+rightx+"right wrist y = "+righty);
    }
}
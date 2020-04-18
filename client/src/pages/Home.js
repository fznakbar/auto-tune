import React, { useEffect, useState } from 'react'
import * as handTrack from 'handtrackjs';
import Tone from 'tone'


function Home() {
  var synth = new Tone.Synth().toMaster();

  const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.79,    // confidence threshold for predictions.
  }
  const [model, setModel] = useState()
  let [change, setChange] = useState(false)
  useEffect(() => {
    handTrack.load(modelParams)
    .then(lmodel => {
      setModel(lmodel)
    })
  }, [])
    const player = () =>{
      // var loop = new Tone.Loop(function(time){
      //   synth.triggerAttackRelease("C2", "8n", time);
      //   }, "4n");
      // loop.start("1m")
      // Tone.Transport.start();
      var polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();
      //play a chord
      polySynth.triggerAttackRelease(["C4", "E4", "A4", "B4"], "4n");
    }

    const stopper = () => {
      var loop = new Tone.Loop(function(time){
        loop.stop()
        synth.triggerAttackRelease("A2", "8n", time);
        }, "4n");
      loop.start("1m")
      Tone.Transport.start();
    }

    // var distortion = new Tone.Distortion(0.4).toMaster();
    // synth.connect(distortion);

    // var pwm = new Tone.PWMOscillator("Bb3").toMaster().start();

  navigator.getUserMedia({ video: { width: 1280, height: 720 } }, 
    stream => {
      var video = document.querySelector('video');
      video.srcObject = stream;
      video.onloadedmetadata = function(e) {
        video.play();
        setInterval(() => {
          if (model) {
            model.detect(video)
            .then(predictions => {
              // console.log(predictions)
              // console.log(model)
              const canvas = document.querySelector('#canvas')
              const context = canvas.getContext('2d')
              // const test = synth.triggerAttackRelease('C4', '8n').frequency.value
              // console.log(test)
              if (predictions.length > 0) {
                // x tengah = 300
                // y tengah = 200
                predictions.forEach(x => {
                  if (x.bbox[0] < 300 && x.bbox[1] < 200) stopper()
                  else if (x.bbox[0] > 300 && x.bbox[1] < 200) player()
                  else if (x.bbox[0] < 300 && x.bbox[1] > 200) synth.triggerAttackRelease("A4", "8n")
                  else if (x.bbox[0] > 300 && x.bbox[1] > 200) synth.triggerAttackRelease("B4", "8n")
                })
                // console.log(predictions[0].bbox[1])
              }
              model.renderPredictions(predictions, canvas, context, video)
            })
          }          
        }, 200)
      };
    }, err => {
      console.log(err)
    }
    )
 return(
   <div id="img">
    <video id="video" width="800" height="600">

    </video>
    <canvas id="canvas" width="800" height="600">

    </canvas>
    
   </div>
 )
}

export default Home;

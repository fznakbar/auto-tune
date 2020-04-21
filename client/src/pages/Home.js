import React, { useEffect, useState } from 'react'
import * as handTrack from 'handtrackjs';
import Tone from 'tone'
import Swal from 'sweetalert2';
// import Loading from '../components/Loading';
import Navbar from '../components/Navbar'

// GLOBAL COMPONENT
var synth = new Tone.Synth()
const audioContext = Tone.context;
const destination = audioContext.createMediaStreamDestination();
synth.connect(destination);
const recorder = new MediaRecorder(destination.stream);
let test = 'C3'
Tone.Transport.scheduleRepeat(time => {
  synth.triggerAttackRelease(test, "8n");
}, '4n');

function Home() {
  synth.toMaster();
  let chunks = [];
  recorder.ondataavailable = evt => {
    chunks.push(evt.data)
  };
  recorder.onstop = evt => {
    Tone.Transport.stop();
    synth.disconnect();
    const blob = new Blob(chunks, { type: 'audio/ogg; codec=opus' });
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      setMusicData(base64data);
      setRecording(true);
      synth.toMaster();
    }
  }
  const [recording, setRecording] = useState(false);
  const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.79,    // confidence threshold for predictions.
  }
  const [model, setModel] = useState()
  useEffect(() => {
    handTrack.load(modelParams)
    .then(lmodel => {
      setModel(lmodel)
    })
    // eslint-disable-next-line
  }, [])
  const detect = () => {
    if (model) {
      model.detect(video)
      .then(predictions => {
        const canvas = document.querySelector('#canvas')
        const context = canvas.getContext('2d')
        if (predictions.length > 0) {
          // x tengah = 300
          // y tengah = 200
          predictions.forEach(x => {
            if (x.bbox[0] < 200 && x.bbox[1] < 150) test = `A${upLeft}`;
            else if (x.bbox[0] > 200 && x.bbox[1] < 150) test = `D${upRight}`;
            else if (x.bbox[0] < 200 && x.bbox[1] > 150) test = `G${bottomLeft}`;
            else if (x.bbox[0] > 200 && x.bbox[1] > 150) test = `C${bottomRight}`;
          })
        }
        model.renderPredictions(predictions, canvas, context, video)
      })
    }          
  }
  var video = document.querySelector('video');
  navigator.getUserMedia({ video: { width: 1280, height: 720 } }, 
    stream => {
      video = document.querySelector('video');
      video.srcObject = stream;
      video.onloadedmetadata = function(e) {
        video.play();
        setInterval(() => {
          detect(model)
        }, 20)
      };
    }, err => {
      console.log(err)
    }
    )
    const [musicData, setMusicData] = useState('');
    let bottomLeft = 1;
    let bottomRight = 1;
    let upRight = 1;
    let upLeft = 1;
    const kiriAtasPlus = () =>{
      if(upLeft < 4){
        synth.triggerAttackRelease(`A${upLeft + 1}`, "8n")
        upLeft ++;
        // clearInterval(interval)
      }
    }
    const kiriAtasMinus = () =>{
      if(upLeft > 1){
        synth.triggerAttackRelease(`A${upLeft - 1}`, "8n")
        upLeft --;
        // clearInterval(interval)
      }
    }

    const kananAtasPlus = () =>{
      if(upRight < 4){
        synth.triggerAttackRelease(`D${upRight + 1}`, "8n")
        upRight ++;
        // clearInterval(interval)
      }
    }
    const kananAtasMinus = () =>{
      if(upRight > 1){
        synth.triggerAttackRelease(`D${upRight - 1}`, "8n")
        upRight --;
        // clearInterval(interval)
      }
    }

    const kiriBawahPlus = () =>{
      if(bottomLeft < 4){
        synth.triggerAttackRelease(`G${bottomLeft + 1}`, "8n")
        bottomLeft ++;
        // clearInterval(interval)
      }
    }
    const kiriBawahMinus = () =>{
      if(bottomLeft > 1){
        synth.triggerAttackRelease(`G${bottomLeft - 1}`, "8n")
        bottomLeft --;
        // clearInterval(interval)
      }
    }

    const kananBawahPlus = () =>{
      if(bottomRight < 4){
        synth.triggerAttackRelease(`C${bottomRight + 1}`, "8n")
        bottomRight ++;
        // clearInterval(interval)
      }
    }
    const kananBawahMinus = () =>{
      if(bottomRight > 1){
        synth.triggerAttackRelease(`C${bottomRight - 1}`, "8n")
        bottomRight --;
        // clearInterval(interval)
      }
    }
    const saveMusic = () => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You will save your music to your profile!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, save it!'
      }).then((result) => {
        if (result.value) {
          // axios database musicData nya cuyy
          console.log(musicData)
          Swal.fire(
            'Saved!',
            'Your file has been saved.',
            'success'
          )
        }
      })
    }
 return(
   <>
    <Navbar />
  <div className="home row">
    <div className="col-sm-8 mb-0 pb-0">
      <div>
        <tone-demo autoplay style={{ width: '95%', height: '110px', marginTop: '40px', marginLeft: '40px' }} ></tone-demo>
      </div>
      <div>
        <video id="video" width="500" height="400"  style={{display: 'none',  width: '98%', height: '550px', marginTop: '180px', marginLeft: '25px', transform: 'rotateY(180deg)' }}></video>
        <canvas id="canvas" style={{ width: '98%', height: '550px', marginTop: '180px', marginLeft: '25px' }}/>
      </div>
    </div>
    
    <div className="col-sm-4" style={{backgroundColor : "#324257"}}>
      <h2 className="mt-5" style={{textAlign : "center", color : "#4ebab1"}}>ALLEGRO</h2>
      <div className="mt-5" style={{textAlign : "center"}}>
        <audio src={ musicData } style={{ marginBottom: '10px' }} controls></audio><br></br>
        <button onClick={ () => recorder.start() } className="btn btn-success mr-2">Start</button>
        <button onClick={ () => recorder.stop() } className="btn btn-danger ml-2">Stop</button>
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        { recording && <button onClick={ saveMusic } className="btn btn-primary">Save</button> }
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={ () => Tone.Transport.start() } className="btn btn-info mx-1">Start Beat</button>
        <button onClick={ () => Tone.Transport.stop() } className="btn btn-secondary mx-1">Stop Beat</button>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1>BPM</h1>
        <input type="range" className="custom-range" min="60" max="240" style={{ width: '90%' }} onChange={ (e) => Tone.Transport.bpm.value = e.target.value } />
      </div>
      <div style={{textAlign : "center", marginTop : "80px"}}>
        <div className="container row m-0" style={{ width: '100%' }}>
          <div className="col-sm-6">
            <button onClick={ kiriAtasMinus } className="btn btn-success mb-2 mr-2">-</button>
            <button onClick={ kiriAtasPlus } className="btn btn-warning mb-2">+</button><br></br>
          </div>
          <div className="col-sm-6">
            <button onClick={ kananAtasMinus } className="btn btn-success mb-2 mr-2">-</button>
            <button onClick={ kananAtasPlus } className="btn btn-warning mb-2">+</button><br></br>
          </div>
          <div className="col-sm-6 mt-5">
            <button onClick={ kiriBawahMinus } className="btn btn-success mb-2 mr-2">-</button>
            <button onClick={ kiriBawahPlus } className="btn btn-warning mb-2">+</button><br></br>
          </div>
          <div className="col-sm-6 mt-5">
            <button onClick={ kananBawahMinus } className="btn btn-success mb-2 mr-2">-</button>
            <button onClick={ kananBawahPlus } className="btn btn-warning mb-2">+</button><br></br>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
 )
}

export default Home;

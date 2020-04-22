import React, { useEffect, useState } from 'react'
import * as handTrack from 'handtrackjs';
import Tone from 'tone'
import Swal from 'sweetalert2';
import Navbar from '../components/navbar/navbar'
import Loading from '../components/Loading';
import axios from 'axios'
import { addMusic } from '../store/actions/userAction';
import { useDispatch } from 'react-redux';

// GLOBAL COMPONENT
var synth = new Tone.Synth()
const audioContext = Tone.context;
const destination = audioContext.createMediaStreamDestination();
synth.connect(destination);
const recorder = new MediaRecorder(destination.stream);
let beat = 'C3'
Tone.Transport.scheduleRepeat(time => {
  synth.triggerAttackRelease(beat, "8n");
}, '4n');
var intervalId = null
var localStream = null;

function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  synth.toMaster();
  let chunks = [];
  recorder.ondataavailable = evt => {
    chunks.push(evt.data)
  };
  recorder.onstop = evt => {
    Tone.Transport.stop();
    setBeatOn(false);
    setRecording(false);
    const blob = new Blob(chunks, { type: 'audio/ogg; codec=opus' });
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      setMusicData(base64data);
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
      setLoading(false)
    })
    // eslint-disable-next-line
  }, [])
  const detect = () => {
    if (model) {
      model.detect(video)
      .then(predictions => {
        const canvas = document.querySelector('#canvas')
        if(canvas){
          const context = canvas.getContext('2d')
          if (predictions.length > 0) {
            // x tengah = 300
            // y tengah = 200
            predictions.forEach(x => {
              if (x.bbox[0] < 200 && x.bbox[1] < 150) beat = `C${upLeft}`; //kiri atas
              else if (x.bbox[0] > 200 && x.bbox[1] < 150) beat = `D${bottomLeft}`; //kiri bawah
              else if (x.bbox[0] < 200 && x.bbox[1] > 150) beat = `E${upRight}`; //kanan atas
              else if (x.bbox[0] > 200 && x.bbox[1] > 150) beat = `F${bottomRight}`; //kanan bawah
            })
          }
          model.renderPredictions(predictions, canvas, context, video)
        }
      })
    }          
  }
  var video = document.querySelector('video');
  
  useEffect(()=>{
    return () => {
      clearInterval(intervalId)
      video.pause();
    }
    // eslint-disable-next-line 
  },[])
  useEffect(() => {
    camera();
    // eslint-disable-next-line
  }, [model])
  const camera = () => {
    navigator.getUserMedia({ video: { width: 1280, height: 720 } }, 
      stream => {
        video = document.querySelector('video');
        video.srcObject = stream;
        localStream = stream;
        video.onloadedmetadata = function(e) {
          video.play();
          intervalId = setInterval(() => {
            detect()
          }, 0)
        };
      }, err => {
        console.log(err)
    })
  }
  const [beatOn, setBeatOn] = useState(false);
  const [musicData, setMusicData] = useState('');
  let [bottomLeft, setBottomLeft] = useState(3);
  let [bottomRight, setBottomRight] = useState(3);
  let [upRight, setUpRight] = useState(3);
  let [upLeft, setUpLeft] = useState(3);
  const kiriAtasPlus = () =>{
    if(upLeft < 5){
      setUpLeft(upLeft + 1);
      clearInterval(intervalId)
      intervalId = setInterval(() => {
        detect();
      }, 0)
    }
    beat = `C${upLeft}`;
    console.log(upLeft)
    synth.triggerAttackRelease(`C${upLeft}`, "8n")
  }
  const kiriAtasMinus = () =>{
    if(upLeft > 1){
      setUpLeft(upLeft - 1);
      clearInterval(intervalId)
      intervalId = setInterval(() => {
        detect();
      }, 0)
    }
    beat = `C${upLeft}`;
    synth.triggerAttackRelease(`C${upLeft}`, "8n")
    console.log(upLeft)
  }

  const kananAtasPlus = () =>{
    if(upRight < 5){
      setUpRight(upRight + 1);
      clearInterval(intervalId)
      intervalId = setInterval(() => {
        detect();
      }, 0)
    }
    beat = `E${upRight}`;
    synth.triggerAttackRelease(`E${upRight}`, "8n")
  }
  const kananAtasMinus = () =>{
    if(upRight > 1){
      setUpRight(upRight - 1);
      clearInterval(intervalId)
      intervalId = setInterval(() => {
        detect();
      }, 0)
    }
    beat = `E${upRight}`;
    synth.triggerAttackRelease(`E${upRight}`, "8n")
  }

  const kiriBawahPlus = () =>{
    if(bottomLeft < 5){
      setBottomLeft(bottomLeft + 1);
      clearInterval(intervalId)
      intervalId = setInterval(() => {
        detect();
      }, 0)
    }
    beat = `D${bottomLeft}`;
    synth.triggerAttackRelease(`D${bottomLeft}`, "8n")
  }
  const kiriBawahMinus = () =>{
    if(bottomLeft > 1){
      setBottomLeft(bottomLeft - 1);
      clearInterval(intervalId)
      intervalId = setInterval(() => {
        detect();
      }, 0)
    }
    beat = `D${bottomLeft}`;
    synth.triggerAttackRelease(`D${bottomLeft}`, "8n")
  }

  const kananBawahPlus = () =>{
    if(bottomRight < 5){
      setBottomRight(bottomRight + 1);
      clearInterval(intervalId)
      intervalId = setInterval(() => {
        detect();
      }, 0)
    }
    beat = `F${bottomRight}`
    synth.triggerAttackRelease(`F${bottomRight}`, "8n")
  }
  const kananBawahMinus = () =>{
    if(bottomRight > 1){
      setBottomRight(bottomRight - 1);
      clearInterval(intervalId)
      intervalId = setInterval(() => {
        detect();
      }, 0)
    }
    beat = `F${bottomRight}`
    synth.triggerAttackRelease(`F${bottomRight}`, "8n")
  }
  const saveMusic = (e) => {
    e.preventDefault()
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
        setTitle('');
        axios({
          method : "POST",
          url : 'https://gentle-crag-62773.herokuapp.com/musics',
          headers : {
            token : localStorage.getItem('token')
          },
          data : {
            title : title,
            musicData : musicData
          }
        })
          .then(({ data }) => {
            dispatch(addMusic(data));
            Swal.fire(
              'Saved!',
              'Your file has been saved.',
              'success'
            )
          }).catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'You have to login first!',
            })
          })
      }
    })
  }
  const [bpm, setBpm] = useState(Tone.Transport.bpm.value);
  const [title, setTitle] = useState('')
 return(
   <>
   { !loading && <Navbar interval={intervalId} localStream={ localStream } recorder={ recorder } /> }
  <div className="home row">
    <div className="col-sm-8 mb-0 pb-0" style={{ height: '100%' }}>
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
      { loading ? <div style={{ marginTop: '100px', textAlign: 'center' }}><Loading /></div> :
      <>
        <div className="mt-5" style={{textAlign : "center"}}>
          <audio src={ musicData } style={{ marginBottom: '10px' }} controls></audio><br></br>
          { recording ? <button onClick={ () => recorder.stop() } className="btn btn-danger">Stop Recording</button> : 
          <button onClick={ () => {recorder.start(); setRecording(true)} } className="btn btn-success">Start Recording</button>
          }
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          { musicData && 
           <>
            <form onSubmit={saveMusic}>
              <label className="text-warning mt-3" style={{fontSize : "20px"}}>Beat Title :</label><br></br>
              <input type="text" onChange={(e) => setTitle(e.target.value)} required value={ title }></input><br></br>
              <button type="submit" className="btn btn-primary mt-3">Save</button>
            </form>
            </>
          }
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={ () => {Tone.Transport.start(); setBeatOn(true)} } className="btn btn-info mx-1">Start Beat</button>
          <button onClick={ () => {Tone.Transport.stop(); setBeatOn(false)} } className="btn btn-secondary mx-1">Stop Beat</button>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h1 className="text-warning">{bpm} BPM</h1>
          <input type="range" value={ bpm } className="custom-range" min="60" max="240" style={{ width: '90%' }} onChange={ (e) => { Tone.Transport.bpm.value = e.target.value; setBpm(e.target.value)} } />
        </div>
        { !beatOn &&
          <div style={{textAlign : "center", marginTop : "80px"}}>
            <div className="container row m-0" style={{ width: '100%' }}>
              <div className="col-sm-6">
                <h3 className="text-warning">C{upLeft}</h3>
                <button onClick={ kiriAtasMinus } className="btn btn-success mb-2 mr-2">-</button>
                <button onClick={ kiriAtasPlus } className="btn btn-warning mb-2">+</button><br></br>
              </div>
              <div className="col-sm-6">
                <h3 className="text-warning">D{upRight}</h3>
                <button onClick={ kananAtasMinus } className="btn btn-success mb-2 mr-2">-</button>
                <button onClick={ kananAtasPlus } className="btn btn-warning mb-2">+</button><br></br>
              </div>
              <div className="col-sm-6 mt-5">
                <h3 className="text-warning">E{bottomLeft}</h3>
                <button onClick={ kiriBawahMinus } className="btn btn-success mb-2 mr-2">-</button>
                <button onClick={ kiriBawahPlus } className="btn btn-warning mb-2">+</button><br></br>
              </div>
              <div className="col-sm-6 mt-5">
                <h3 className="text-warning">F{bottomRight}</h3>
                <button onClick={ kananBawahMinus } className="btn btn-success mb-2 mr-2">-</button>
                <button onClick={ kananBawahPlus } className="btn btn-warning mb-2">+</button><br></br>
              </div>
            </div>
          </div>
        }
      </>
      }
    </div>
  </div>
  </>
 )
}

export default Home;

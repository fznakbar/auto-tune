import React, { useEffect, useState } from 'react'
import './beat.css'
import Navbar from '../components/navbar/navbar'
import Listbeat from '../components/listbeat/Listbeat'
import Prev from '../components/playbtn/Prev'
import Forward from '../components/playbtn/forward'
import Play from '../components/playbtn/Play'
import Pause from '../components/playbtn/Pause'
import { Howl } from 'howler'
import { useDispatch, useSelector } from 'react-redux'
import { musics } from '../store/actions/userAction'
import { useHistory } from 'react-router-dom'

const Beat = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const id = localStorage.id
  const stateMusic = useSelector(state => state.userReducer.musics)

  useEffect(() => {
    if (!localStorage.id) {
      history.push('/login');
    } else {
      dispatch(musics(id))
    }
    // eslint-disable-next-line 
  }, [])
  const [sound, setSound] = useState(new Howl({ src: [''], onend: () => setMusicIsPlay(false) }));
  const playNow = () => {
    sound.play()
    setMusicIsPlay(true);
  }
  const pauseNow = () => {
    sound.pause();
    setMusicIsPlay(false)
  }
  const changeMusic = (howl, title, counter) => {
    if (counter) {
      setMusicCounter(counter);
    }
    sound.stop();
    setMusicIsPlay(false)
    setMusicPlaying(title);
    const newSound = new Howl({ src: [howl], onend: () => setMusicIsPlay(false) });
    setSound(newSound);
  }
  const showMusic = () => {
    const data = stateMusic.map((dataValues, index) => {
      return (
        <div key={dataValues.id} onClick={() => changeMusic(dataValues.musicData, dataValues.title, index)}>
          <Listbeat key={dataValues.id} id={dataValues.id} title={dataValues.title} />
        </div>
      )
    });
    return data;
  }
  const [musicCounter, setMusicCounter] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState('');
  const [musicIsPlay, setMusicIsPlay] = useState(false);
  const prevMusic = () => {
    if (stateMusic[musicCounter - 1]) {
      const { musicData, title } = stateMusic[musicCounter - 1];
      changeMusic(musicData, title)
      setMusicCounter(musicCounter - 1);
    }
  }
  const nextMusic = () => {
    if (stateMusic[musicCounter + 1]) {
      const { musicData, title } = stateMusic[musicCounter + 1];
      changeMusic(musicData, title)
      setMusicCounter(musicCounter + 1);
    }
  }
  return (
    <div>
      <Navbar />
      <div className='container-beat'>
        <div className='container-list'>
          {stateMusic.length > 0 && showMusic()}
        </div>
        <div className='container-thumbPlay'>
          <div className='container-Coverplay'>
            <div className='cove-play'>
              <img src='https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' width='100%' height='100%' alt=''></img>
            </div>
          </div>
          <div className='songtitle' style={{ height: '100px' }}>
            <h1 className="text-warning">{musicPlaying}</h1>
          </div>
          <div className='control-play'>
            <div onClick={prevMusic}>
              <Prev />
            </div>
            {musicIsPlay ?
              <div onClick={() => pauseNow()}>
                <Pause />
              </div>
              :
              <div onClick={() => playNow()}>
                <Play />
              </div>
            }
            <div onClick={nextMusic}>
              <Forward />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Beat
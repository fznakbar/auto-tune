import React, { useEffect, useState } from 'react'
import './beat.css'
import Navbar from '../components/navbar/navbar'
import Listbeat from '../components/listbeat/Listbeat'
import Prev from '../components/playbtn/Prev'
import Forward from '../components/playbtn/forward'
import Play from '../components/playbtn/Play'
import Pause from '../components/playbtn/Pause'
import Loading from '../components/Loading';
import { Howl } from 'howler'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Beat = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const stateMusic = useSelector(state => state.userReducer.musics)
  useEffect(() => {
    if (stateMusic[0]) {
      const { musicData, title } = stateMusic[0];
      changeMusic(musicData, title)
      setMusicCounter(0);
    }
    // eslint-disable-next-line
  }, [stateMusic]);
  useEffect(() => {
    if (!localStorage.id) {
      history.push('/login');
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
          <Listbeat setLoading={ setLoading } key={dataValues.id} id={dataValues.id} title={dataValues.title} />
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
  const showData = () => {
    if (stateMusic.length > 0) {
      if (loading) {
        return (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Loading />
          </div>
        )
      } else {
        return showMusic();
      }
    } else {
      return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1 style={{ color: 'white' }}>There is nothing here, yet!</h1>
        </div>
      )
    }
  }
  return (
    <div>
      <Navbar />
      <div className='container-beat'>
        <div className='container-list'>
          {showData()}
        </div>
        <div className='container-thumbPlay'>
          <div className='container-Coverplay'>
            <i className="fas fa-music" style={{ fontSize: '150px', color: 'white' }}></i>              
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
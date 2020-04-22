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
            {/* <i class="fas fa-users fa-7x"></i> */}
              <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAilBMVEX///8zMzMwMDBBQUEsLCxoaGg+Pj78/PweHh4aGhonJycYGBgpKSkoKCgkJCQcHBwTExM5OTnBwcH29vaVlZVTU1OIiIjp6ekPDw+xsbHw8PDS0tLa2tqioqLi4uJubm6AgICoqKhdXV3U1NTJycl2dnZJSUlISEi3t7dQUFB+fn6cnJySkpJiYmIoIjEaAAAE6ElEQVR4nO3dbXOiOgCGYYlRg1he5UVFEarWtvr//95R7O7aLmiSg8nGee5v25nNeE00BHZNez2EEEIIIYQQQgghhBBCCCGEEEIIIYQQQnpKF7PDVveLeEij+WI/3Q6Z7bluoPvFdFyU75fbmPieO6bEOkX6ul9SV0WrcLmOPd9mLiW17dIzCFebMqmGzGHu5Er2DMJRupklRZCdabTBZrLwvI4UfXqivbTTzBTO8/3nNnb/rCP3M0UY5ad15J0ym59mivC0RJbrY3BeIidEzPavC+t15EiYfXMdMVN42mpNB7uxz7OOmCUczV9PW61+JrKOmCUcZJ3S/kUh7RgHofIghBBC/UEIIYT6gxBCCPUHIYQXEH1xmf2UwguNWYOk3KyeS1jTHLtf00aXoa6eO5osJHRymjXXqq5ol0amCwk50/zgmJThKmoYyVxhPWuOG1TJ8sesfc9A4WXWMlqtW2bte0YJaxoLqvUyzO/TvjJC+DVrLBaifWWCkATVhwTtKwOEZPi/RoJQVxDyB6GuIOQPQl1ByB+EuoKQPwh1BSF/EOoKQv4g1BWE/EGoKwj5g1BXEPIHoa4g5A9CXUHIH4S6gpA/CHUFIX8Q6gpC/iDUFYRtzTfLbfX+XhXJMlzVP3kq4eLQz+pzk8jl/+z7cRKmPetZhKuE2uMfhzCQF+YNr/9ssHBR+U0HQ53/+lMIXyuH69sLpgrnhc/57QxDhTN7wuczVDgqHF6fmcI0GPMDTRTmrtAhPXqFUXT95SU+4atjyGlm83BaWS+UDN8/lpu0/hGXMBcEahLmn7uM1UdCkfrbP/5ksFz0Cg5hKvYW1SOMyuHfWy3qetfLR6twKPw9U+XCaOpyTEObMHFFgaqFo0+H6zW2CDe+MFCxMKScc9AiDCQOc1MpjArudbBZWDJxoEphTrj3ki1CS2IKFQpnmcDraxTuZaZQnXAptEg0CiupEwnImxrgp8DdQItw7skALarmTHaxGWwWhlJvUsstVQBD0etYk3Aqcs/0JydXAEyFL9RNwkLuY6jkWP138c1kg7CSOrvV/VQAnIp/gJqEsZTQmT8emNr3XwePUOr4mnHyeGDvg38rc1Mo9TlkCqZwLnE/0Nla6qm4VEgt8h1dD2mlACh1x2OR3d8Die9pyFjy5BChcrHt2leTpq2W8OUiWygA9krx5w5Wy1YrFJzEbK8CKLWStm21hkKTmM2UAOWu08RqHGuRCQzhh2qAcgvN+NA8GP+jNsqUfAbP9WWEftoyWvXCN4C7axuh+2TepbRoHW7Hc3Ulvoq92q9k9lrOqnW4UXX3uk/Ym4pbwt8dxLc07s0ZOPg33xWEEUVr6K/E91qE3B4x39mtRmoH5Y3TBh/SXFh4/7FDGDtNV1nqeseNCtOPjoIfRIfndiBPbOfqtyOd/zuU7Rd7BbdKDW3ENqaMdxnMy3Uc2L7j+GwyPB5mrw9V3CwWmURvLTL0KJqn6fd/KtdRLnALbKu8kHXXkvt96qt4MPaI1nzrKfVUbZa7b8tD9Cp1e8nuS+7+09pYyUOjBxZObu7exnai4pHKQ4vWWdudD3Htg8lv0N+licv+vjRS14kVb5Uf2Gg/YPb5lxpeomNms6J8ium7Kt8fivhtGARv8WAatt8IIoQQQgghhBBCCCGEEEIIIYQQQgghhBDqov8AxVpZEU1E1uYAAAAASUVORK5CYII=' width='100%' height='100%' alt=''></img>
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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import KaKaoLogin from 'react-kakao-login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App(){
  let my_audio;
  useEffect(()=>{
    my_audio = new Audio()
    my_audio.src = '/audio/bgm.mp3'
    // my_audio.play();
  })

  
  const playAudio = () => {
    my_audio.play();
  }
  const pauseAudio = () => {
    my_audio.pause();
  }

  const stopAudio = () => {
    my_audio.pause();
    my_audio.currentTime = 0;
  }

  return (
    <div>
      <button id="play" onClick={()=>{playAudio()}}>재생</button>
      <button id="pause" onClick={()=>{pauseAudio()}}>일시정지</button>
      <button id="stop" onClick={()=>{stopAudio()}}>정지</button>
    </div>
  );
}
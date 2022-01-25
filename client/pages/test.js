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

<<<<<<< HEAD
  return(
    <>
    <div className="background">
    <span></span>
      <span></span>
      <style jsx>{`
        @keyframes move {
            100% {
                transform: translate3d(0, 0, 1px) rotate(360deg);
            }
        }
        
        .background {
            position:relative;
            width: 100vw;
            height: 100vh;
            top: 0;
            left: 0;
            background: #ffffff;
            overflow: hidden;
        }
        
        .background span {
            width: 20vmin;
            height: 20vmin;
            border-radius: 20vmin;
            backface-visibility: hidden;
            position: absolute;
            animation: move;
            animation-duration: 45;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
        }
        
        
        .background span:nth-child(0) {
            color: #6667AB;
            background-image: url('/img/character_1.png'); 
            top: 22%;
            left: 68%;
            animation-duration: 32s;
            animation-delay: -28s;
            transform-origin: 9vw 17vh;
            box-shadow: -40vmin 0 5.441112881575712vmin currentColor;
        }
        .background span:nth-child(1) {
            color: #6667AB;
            background-image: url('/img/character_1.png'); 
            top: 87%;
            left: 50%;
            animation-duration: 47s;
            animation-delay: -41s;
            transform-origin: 23vw 16vh;
            box-shadow: 40vmin 0 5.317984633917012vmin currentColor;
        }
        .background span:nth-child(2) {
            color: #6667AB;
            background-image: url('/img/character_1.png'); 
            top: 78%;
            left: 57%;
            animation-duration: 44s;
            animation-delay: -36s;
            transform-origin: -1vw -5vh;
            box-shadow: -40vmin 0 5.983245125515878vmin currentColor;
        }
        .background span:nth-child(3) {
            color: #6667AB;
            background-image: url('/img/character_1.png'); 
            top: 48%;
            left: 68%;
            animation-duration: 19s;
            animation-delay: -21s;
            transform-origin: -13vw -5vh;
            box-shadow: -40vmin 0 5.583421919649888vmin currentColor;
        }
        .background span:nth-child(4) {
            color: #6667AB;
            background-image: url('/img/character_1.png'); 
            top: 69%;
            left: 93%;
            animation-duration: 25s;
            animation-delay: -2s;
            transform-origin: 22vw 23vh;
            box-shadow: -40vmin 0 5.7118368939913156vmin currentColor;
        }
        .background span:nth-child(5) {
            color: #6667AB;
            background-image: url('/img/character_1.png'); 
            top: 21%;
            left: 81%;
            animation-duration: 10s;
            animation-delay: -16s;
            transform-origin: -24vw -24vh;
            box-shadow: -40vmin 0 5.613232329162278vmin currentColor;
        }
        .background span:nth-child(6) {
            color: #6667AB;
            background-image: url('/img/character_1.png'); 
            top: 80%;
            left: 23%;
            animation-duration: 31s;
            animation-delay: -21s;
            transform-origin: 7vw -18vh;
            box-shadow: -40vmin 0 5.2576564541620705vmin currentColor;
        }
        .background span:nth-child(7) {
            color: #6667AB;
            background-image: url('/img/character_1.png'); 
            top: 87%;
            left: 13%;
            animation-duration: 41s;
            animation-delay: -37s;
            transform-origin: -19vw 3vh;
            box-shadow: -40vmin 0 5.471673719321731vmin currentColor;
        }
        .background span:nth-child(8) {
            color: #6667AB;
            background-image: url('/img/character_1.png'); 
            top: 26%;
            left: 60%;
            animation-duration: 25s;
            animation-delay: -15s;
            transform-origin: 1vw -2vh;
            box-shadow: -40vmin 0 5.701139363560004vmin currentColor;
        }
        .background span:nth-child(9) {
            color: #ffffff;
            background-image: url('/img/character_1.png'); 
            top: 32%;
            left: 89%;
            animation-duration: 22s;
            animation-delay: -13s;
            transform-origin: -4vw -17vh;
            box-shadow: 40vmin 0 5.513841718695892vmin currentColor;
        }
        .background span:nth-child(10) {
            color: #ffffff;
            background-image: url('/img/character_1.png'); 
            top: 11%;
            left: 6%;
            animation-duration: 9s;
            animation-delay: -6s;
            transform-origin: -5vw -16vh;
            box-shadow: 40vmin 0 5.419934289880256vmin currentColor;
        }
        .background span:nth-child(11) {
            color: #ffffff;
            background-image: url('/img/character_1.png'); 
            top: 38%;
            left: 88%;
            animation-duration: 12s;
            animation-delay: -50s;
            transform-origin: -5vw 17vh;
            box-shadow: -40vmin 0 5.740566140353076vmin currentColor;
        }
        .background span:nth-child(12) {
            color: #ffffff;
            background-image: url('/img/character_1.png'); 
            top: 15%;
            left: 41%;
            animation-duration: 20s;
            animation-delay: -19s;
            transform-origin: 12vw 11vh;
            box-shadow: -40vmin 0 5.621066756916803vmin currentColor;
        }
        .background span:nth-child(13) {
            color: #ffffff;
            background-image: url('/img/character_1.png'); 
            top: 73%;
            left: 94%;
            animation-duration: 49s;
            animation-delay: -43s;
            transform-origin: 17vw -9vh;
            box-shadow: -40vmin 0 5.412732949888468vmin currentColor;
        }
        .background span:nth-child(14) {
            color: #fffdff;
            background-image: url('/img/character_1.png'); 
            top: 59%;
            left: 89%;
            animation-duration: 53s;
            animation-delay: -20s;
            transform-origin: -13vw -15vh;
            box-shadow: 40vmin 0 5.9844938477006036vmin currentColor;
        }
        .background span:nth-child(15) {
            color: #ffffff;
            background-image: url('/img/character_1.png'); 
            top: 96%;
            left: 60%;
            animation-duration: 6s;
            animation-delay: -50s;
            transform-origin: -12vw 0vh;
            box-shadow: -40vmin 0 5.209986026411939vmin currentColor;
        }
        .background span:nth-child(16) {
            color: #ffffff;
            background-image: url('/img/character_1.png'); 
            top: 25%;
            left: 67%;
            animation-duration: 13s;
            animation-delay: -29s;
            transform-origin: -13vw -8vh;
            box-shadow: 40vmin 0 5.926619235171507vmin currentColor;
        }
        .background span:nth-child(17) {
            color: #ffffff;
            background-image: url('/img/character_1.png'); 
            top: 53%;
            left: 4%;
            animation-duration: 48s;
            animation-delay: -7s;
            transform-origin: 8vw 0vh;
            box-shadow: 40vmin 0 5.490202740945403vmin currentColor;
        }
        .background span:nth-child(18) {
            color: #957897;
            background-image: url('/img/character_1.png'); 
            top: 65%;
            left: 41%;
            animation-duration: 17s;
            animation-delay: -10s;
            transform-origin: 22vw 18vh;
            box-shadow: -40vmin 0 5.608666261912255vmin currentColor;
        }
        .background span:nth-child(19) {
            color: #c3b4cb;
            background-image: url('/img/character_1.png'); 
            top: 38%;
            left: 24%;
            animation-duration: 25s;
            animation-delay: -16s;
            transform-origin: -4vw 25vh;
            box-shadow: -40vmin 0 5.795622988592061vmin currentColor;
        }
      `}</style>
    </div>
      
    </>
  )
=======
  
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
>>>>>>> 330e7734f61c8e24de3239967a969b238c2a8a7d
}
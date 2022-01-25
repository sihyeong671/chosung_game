import Head from 'next/head'
import Image from 'next/image'
import Button from '@mui/material/Button'
import Link from 'next/link'
import {BACKGROUND_IMG} from '../public/img/background_img.jpg'
import { Color } from '../utils/color/colors'
import VerticalLayout from '../components/VerticalLayout'
import { connectSocket } from '../utils/socket/socketManger'
import KaKaoLogin from 'react-kakao-login';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import HorizontalLayout from '../components/HorizontalLayout'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if(typeof window !== "undefined"){
      window.Kakao.init("21ae8256364207043d3cf2492252d388");
    }
  }, []);


  return(
    <div className="main_screen">
      <VerticalLayout>
        <div className='image'>
            <marquee scrollamount='8'  width='100%' height='100%'>
            <HorizontalLayout>
              <div>
                <img className='character3' src='/img/character_1.png' width={200} height={120} />
              </div>
              <div>
                <img className='character4' src='/img/character_2.png' width={200} height={120} />
              </div>
              <div>
                <img className='character3' src='/img/character_3.png' width={200} height={120} />
              </div>
              <div>
                <img className='character4' src='/img/character_4.png' width={200} height={120} />
              </div>
              <div>
                <img className='character3' src='/img/character_5.png' width={200} height={120} />
              </div>
              <div>
                <img className='character4' src='/img/character_6.png' width={200} height={140} />
              </div>
              <div>
                <img className='character3' src='/img/character_7.png' width={200} height={120} />
              </div>
              </HorizontalLayout>
            </marquee>
            
          
        </div>
        <div className='main_title'>
          천 리길도 한 걸음 부터
        </div>
        <div className='login_wrapper'>
          <Link href={'/lobby'}>
            <button className='guest_login' onClick={()=>{
              sessionStorage.setItem('guest', 'true')
              connectSocket()
            }}>
              게스트 로그인
            </button>
          </Link>
          <KaKaoLogin
            token={String("21ae8256364207043d3cf2492252d388")}
            onSuccess={(re)=>{
              console.log('로그인 성공',re);
              connectSocket()
              sessionStorage.setItem('guest', 'false')
              sessionStorage.setItem('nickname',re.profile.properties.nickname);
              router.push('/lobby');
            }}
            onFail={(err)=>{console.log("로그인 실패", err)}}
            onLogout={()=>{console.log("로그아웃")}}
            render={({ onClick }) => {
              return (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onClick();
                  }}
                >
                  카카오로 로그인하기
                </button>
              );
            }}
            />
          
        </div>
      </VerticalLayout>
      <style jsx>{`
        .login_wrapper{
          display: flex;
          flex-grow: 1;
          flex-direction: column; 
          align-items: center;
          justify-content: center;
        }
        .main_screen{
          display: flex;
          background: linear-gradient(to bottom, ${Color.blue_1}, ${Color.blue_2});
          height:100vh;
        }
        .image{
          height:24vh;
        }
        .main_title{
          display: flex;
          flex-grow: 1;
          font-size: 50px;
          font-weight: bold;
          align-items: center;
          justify-content: center;
          padding-top: 100px;
        }
        // .photo{
        //   background-image: url('/img/background_img.jpg');
        //   background-repeat: no-repeat;
        //   background-size: cover; 
        //   width: 300px;
        //   height: 300px;
          
        // }
        .guest_login{
          background-color: transparent;
          border: none;
          padding: 5px 16px;
          color: white;
          font-size: 20px;
          font-weight: bold;
        }
        .guest_login:hover{
          cursor: pointer;
          color: black;
        }
        .kakao:hover{
          cursor:'pointer';
        }
        // .character1 {
        //   animation: rotate_image 6s linear infinite;
        //   transform-origin: 50% 50%;
        //   margin: 8px;
        // }
        .character2 {
          animation: rotate_image 6s linear infinite, scale1 6s linear infinite;
          transform-origin: 50% 50%;
          margin: 8px;
        }
        .character3 {
          animation: motion1 0.5s linear 0s infinite alternate;
          scrollamount: 4;
          margin: 8px;
        }
        .character4 {
          animation: motion2 0.5s linear 0s infinite alternate;
          margin: 8px;
        }
        @keyframes rotate_image {
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes scale1 {
          0% { transform: scale(0) }
          100% { transform: scale(1) }
        }
        @keyframes motion1 {
          0% {padding-top: 8px;}
          100% {padding-top: 28px;}
        }
        @keyframes motion2 {
          100% {padding-top: 8px;}
          0% {padding-top: 28px;}
        }
      `}</style>
    </div>
  )
}

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
        <div className='main_title'>
          제목이 여기에 들어오는 건 어떤가요?
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
          background: linear-gradient(to bottom, ${Color.green_1}, ${Color.green_8});
          height:100vh;
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
      `}</style>
    </div>
  )
}

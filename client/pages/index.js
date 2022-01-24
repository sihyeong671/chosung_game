import Head from 'next/head'
import Image from 'next/image'
import Button from '@mui/material/Button'
import Link from 'next/link'
import {BACKGROUND_IMG} from '../public/img/background_img.jpg'
import { Color } from '../utils/color/colors'
import VerticalLayout from '../components/VerticalLayout'
import { connectSocket } from '../utils/socket/socketManger'
export default function Home() {
  
  return(
    <div className="main_screen">
      <VerticalLayout>
        <div className='main_title'>
          제목이 여기에 들어오는 건 어떤가요?
          {/* <div className='photo'></div> */}
        </div>
        <div className='login_wrapper'>
          <div>
            <Link href={'/lobby'}>
              <button className='guest_login' onClick={()=>{
                sessionStorage.setItem('guest', 'true')
                connectSocket()
              }}>
                게스트 로그인
              </button>
            </Link>
            {/* <div>
              카카오 로그인
            </div> */}
          </div>
        </div>
      </VerticalLayout>
      <style jsx>{`
        .login_wrapper{
          display: flex;
          flex-grow: 1;
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
      `}</style>
    </div>
  )
}

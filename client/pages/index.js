import Head from 'next/head'
import Image from 'next/image'

import Button from '@mui/material/Button'
import Link from 'next/link'
import {BACKGROUND_IMG} from '../public/img/background_img.jpg'
import { Color } from '../utils/color/colors'
export default function Home() {
  
  return(
    <div className="main_screen">
      <div className='photo_wrapper'>
        <div className='photo'></div>
      </div>
      <div className='login_wrapper'>
        <div>
          <Link href={'/lobby'}>
            <Button onClick={()=>{
              connectSocket()
              sessionStorage.setItem('guest', 'true')
            }}>
              게스트 로그인
            </Button>
          </Link>
          <div>
            카카오 로그인
          </div>
        </div>
      </div>
      <style jsx>{`
        .login_wrapper{
          display: flex;
          flex-grow: 1;
          align-items: center;
          justify-content: center;
        }
        .main_screen{
          display: flex;
        }
        .photo_wrapper{
          display: flex;
          flex-grow: 1;
        }
        .photo{
          background-image: url('/img/background_img.jpg');
          background-repeat: no-repeat;
          background-size: cover; 
          width: 300px;
          height: 300px;
          
        }
      `}</style>
    </div>
  )
}

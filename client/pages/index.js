import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
    return(
      <div className="main_screen">
        <div className='photo_wrapper'>
          <div className='photo'>사진</div>
        </div>
        <div className='login_wrapper'>
          <div>
            <div>
              게스트 로그인
            </div>
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
            background-color: aqua;
          }
        `}</style>
      </div>
  )
}

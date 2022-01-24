import Image from 'next/image'
import { Color } from '../utils/color/colors'
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import HorizontalLayout from './HorizontalLayout';

export default function Header(){
  return(
    <>
      <div className='header'>
        <div className='title'>
          천 리 길도 한 걸음 부터
        </div>
        <div className='menu'>
          <HorizontalLayout>
            <div className='logout'>
              <LogoutIcon></LogoutIcon>
            </div>
            <div>
              <MenuIcon></MenuIcon>
            </div>
          </HorizontalLayout>
        </div>
      </div>
      <style jsx>
        {`
          .header{
            background-color: ${Color.green_6};
            display: flex;
            justify-content: space-between;
            align-items: center; 
            height: 10vh;
            margin-bottom: 1rem;
            //box-shadow: 0px 15px 10px -15px #111;
            //border-radius: 20px;
          }
          .title{
            margin-left: 1rem;
            //color: white;
            font-weight: bold;
            font-size: 20px;
          }
          .menu{
            margin-right: 1rem;
          }
          .logout{
            margin-right: 15px;
          }
          .menu:hover{
            cursor: pointer;
          }
        `}
      </style>
    </>

  )
}
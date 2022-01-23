import Image from 'next/image'
import { Color } from '../utils/color/colors'
import MenuIcon from '@mui/icons-material/Menu';

export default function Header(){
  return(
    <>
      <div className='header'>
        <div className='title'>
          천 리 길도 한 걸음 부터
        </div>
        <div className='menu'>
          <MenuIcon></MenuIcon>
        </div>
      </div>
      <style jsx>
        {`
          .header{
            background-color: ${Color.green_1};
            display: flex;
            justify-content: space-between;
            align-items: center; 
            height: 10vh;
            margin-bottom: 1rem;
            box-shadow: 0px 15px 10px -15px #111;
            border-radius: 20px;
          }
          .title{
            margin-left: 1rem;
            color: ${Color.green_5}
          }
          .menu{
            margin-right: 1rem;
          }
          .menu:hover{
            cursor: pointer;
          }
        `}
      </style>
    </>

  )
}
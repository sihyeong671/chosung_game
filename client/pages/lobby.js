
import uuid from 'react-uuid'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'

import UserCard from '../components/UserCard'
import Room from '../components/Room'
import Link from 'next/link'
import { connectSocket, socket } from '../utils/socket/socketManger'
import CreateRoom from '../components/CreateRoom'
import { user_infos } from '../utils/data/userdata'
import { rooms } from '../utils/data/roomdata'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Color } from '../utils/color/colors'
import VerticalLayout from '../components/VerticalLayout'
import HorizontalLayout from '../components/HorizontalLayout'


function NextArrow(props){

  const {className, style, onClick} = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: Color.green_1 }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props){
  const {className, style, onClick} = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: Color.green_1 }}
      onClick={onClick}
    />
  );
}

export default function Lobby(){
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    rows: 3,
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>
  };
  const [show_modal, set_show_modal] = useState(false)
  const [room_list, set_room_list] = useState([])

  const off_modal = () => {
    set_show_modal(false)
  }

  const roomUpdate = () => {
    const temp = []
    rooms?.forEach((v, k)=>{
      temp.push(
        <Room
          key={uuid()}
          room_id={k}
          room_title={v.title}
          room_cnt={v.rcnt}
          is_in_game={v.is_in_game}
          is_lock = {v.is_lock}
        />
      )
    })
    //  렌더링 최적화 필요
    set_room_list(temp);
  }
  
  useEffect(async ()=>{
    await connectSocket()
    return(()=>{
      console.log('clean lobby');
    })
  },[])

  useEffect(()=>{ // 방정보 room_list에 컴포넌트로 만들어서 담기
    roomUpdate()
    const interval = setInterval(roomUpdate, 1000)
    return (()=>{clearInterval(interval)})
  },[])

  const quickEnter = () => {
    const info = {
      room_id: -1,
      user: sessionStorage.getItem('nickname'),
    }
    socket.emit('enter_room', info)
  }
  
  const sorted_infos = user_infos.sort((a, b) => {
    return b.score - a.score
  })

  return(
    <>
      <div className='screen_wrapper'>
        <div className='ranking_wrapper'>
          <div className='ranking'>
            {sorted_infos.map((user_info, idx)=>{
              return(
                <UserCard 
                  key={uuid()}
                  idx={idx+1}
                  user_info={user_info}
                />
              )
            })}
          </div>
          <div className='my_rank'>
            <VerticalLayout>
              <div>
                내 랭킹
              </div>
              <div>
                <HorizontalLayout>
                  <div className='my_place'>
                    n위
                  </div>
                  <div className='my_score'>
                    n점
                  </div>
                </HorizontalLayout>
              </div>
            </VerticalLayout>
          </div>
        </div>
        <div className='rooms_wrapper'>
          <div className='button'>
              <button className='make_room_btn' onClick={()=>{
                set_show_modal(true)
              }}variant="contained">방 만들기</button>
            <Link href="/GamePage">
              <button className='quick_enter_btn' onClick={()=>{
                quickEnter()
              }} variant="contained">빠른 입장</button>
            </Link>
          </div>
          <div className='slider'>
            <Slider {...settings}>
              {room_list}
            </Slider>
          </div>
        </div>
          
      </div>
      {show_modal? <CreateRoom className='modal' on_click_cancel={off_modal}/> : null}
      <style jsx>{`
        .screen_wrapper{
          display: flex;
          height: 100vh;
        }

        .ranking_wrapper{
          flex-grow: 1;
          padding: 3rem;
          margin: 1rem;
        }
        .slider{
          margin:3rem;
        }
        .ranking{
          height: 60vh;
          width: 30vw;
          overflow-y: scroll;
          overflow-x: hidden;
        }
        .ranking::-webkit-scrollbar{
          width: 5px;
        }
        .ranking::-webkit-scrollbar-thumb{
          background-color: ${Color.green_8};
          border-radius: 10px;
        }
        .ranking::-webkit-scrollbar-track{
          background-color: ${Color.green_3};
          boreder-radius: 10px;
        }
        .my_rank{
          border: 1px solid;
          padding: 10px;
          margin: 16px;
          font-weight: bold;
        }
        .my_place{
          margin-right: 10px;
          margin-top: 10px;
        }
        .my_score{
          margin-left: 10px;
          margin-top: 10px;
        }
        .rooms_wrapper{
          flex-grow: 1;
          min-height: 0;
          min-width: 0;
        }
        .button{
          display: flex;
          justify-content: center;
        }
        .make_room_btn{
          background-color: ${Color.green_6};
          border: none;
          padding: 5px 16px;
          color: white;
          font-size: 20px;
          font-weight: bold;
          margin-right: 10px;
        }
        .make_room_btn:hover{
          cursor: pointer;
          background-color: ${Color.green_7} 
        }
        .quick_enter_btn{
          background-color: ${Color.green_6};
          border: none;
          padding: 5px 16px;
          color: white;
          font-size: 20px;
          font-weight: bold;
          margin-right: 10px;
        }
        .quick_enter_btn:hover{
          cursor: pointer;
          background-color: ${Color.green_7};
        }
        .make_room{
          background-color: black; 
        }
        .quick_enter{
          margin-left: 1rem;
        }
        .slider{
          width: 70vw;
        }
        .modal{
          background:-color: ${Color.green_2};
        }
      `}</style>
    </>
  )
}


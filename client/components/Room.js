import { socket } from "../utils/socket/socketManger"
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { Color } from "../utils/color/colors";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react'

export default function Room({room_id, room_title, room_cnt, is_in_game, is_lock}){
  console.log(is_in_game);
  const router = useRouter();
  let join_button;


  const enterRoom = (room_id) => {
    const info = {
      room_id: parseInt(room_id),
      user: sessionStorage.getItem('nickname'),
    }
    socket.emit('enter_room', info)
  }

  const enterRoomPW = (room_id, pw) => {
    const info = {
      room_id: parseInt(room_id),
      user: sessionStorage.getItem('nickname'),
      pw: pw
    }
    socket.emit('enter_room', info)
  }



  useEffect(() => {

    socket.on('full_join',(data)=>{
      window.alert('방이 가득 찼습니다');
    })

    socket.on('incorrect_pw',(data)=>{
      window.alert('비밀번호가 틀렸습니다');
    })

    socket.on('correct_pw', (data)=>{
      sessionStorage.setItem('room_id', room_id)
      router.push('/GamePage')
    })

  }, []);

  return(
    <>
      <div className="room">
        <div className="room-top">
          <div className="title_and_number">
            <div className="title">
              {room_title}
            </div>
            <div className="number">
              {room_cnt} / 6
            </div>
          </div>
        </div>
        <div className="lock_and_state">
          <div className="state">
            {is_in_game? '게임중' : '입장 가능'}
          </div>
          <div className="lock">
            {is_lock? <LockIcon/> : <LockOpenIcon/>}
          </div>
        </div>
        <div className="button">
          {room_cnt === 6 || is_in_game ? 
            <button
              disabled
              className="enter_btn">
                참가하기
            </button>
              :
              (is_lock ? 
                <button
                className="enter_btn"
                onClick={()=>{
                  let pw = window.prompt("비밀번호를 입력하세요")
                  enterRoomPW(room_id, pw.toString())
                }}>
                참가하기
              </button>:
                <button
                className="enter_btn"
                onClick={()=>{
                  sessionStorage.setItem('room_id', room_id)
                  enterRoom(room_id)
                  router.push('/GamePage')
                }}>
                참가하기
              </button>)
            
          }
        </div>
      </div>
      <style jsx>{`
        .room{
          width: 150px;
          display: flex;
          flex-direction: column;
          padding: 1rem;
        }
        .title_and_number{
          display: flex;
          justify-content: space-between; 
        }
        .title{
          margin-left: 1rem;
        }
        .number{
          margin-right: 1rem;
        }
        .lock_and_state{
          display: flex;
          justify-content: space-between;
        }
        .lock{
          margin-left: 1rem;
        }
        .state{
          margin-right: 1rem;
        }
        .button{
          display: flex;
          justify-content: center; 
        }
        .enter_btn{
          background-color: ${Color.green_3};
          border: none;
          padding: 3px 8px;
          font-size: 16px;
          font-weight: bold;
        }
        .enter_btn:hover{
          background-color: ${Color.green_6};
        }
        .join_btn{
          border: none;
          
        }
      `}</style>
    </>
  )
}
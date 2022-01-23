import { socket } from "../utils/socket/socketManger"
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

export default function Room({room_id, room_title, room_cnt, is_in_game, is_lock}){
  const enterRoom = (room_id) => {
    const info = {
      room_id: room_id,
      user: sessionStorage.getItem('nickname'),
    }
    console.log(info)
    socket.emit('enter_room', info)

  }

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
          
            <button
              onClick={()=>{enterRoom(room_id)}}
            >
              <Link href='/GamePage'>참가하기</Link>
              
          </button>
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
      `}</style>
    </>
  )
}
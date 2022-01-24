import HorizontalLayout from "./HorizontalLayout";
import VerticalLayout from "./VerticalLayout";
import {useState, useRef} from 'react'

import { makeRoom, socket } from "../utils/socket/socketManger";
import { useRouter } from "next/router";
import { Color } from "../utils/color/colors";


export default function CreateRoom(props){

  const inputRef = useRef(null)
  const router = useRouter()
  const [lock, set_lock] = useState(false)
  const [lock_number, set_lock_number] = useState('')
  const [room_name, set_room_name] = useState('')


  const handlePassWordField = () => {
    if(inputRef.current.disabled === false) inputRef.current.disabled = true;
    else if (inputRef.current.disabled === true) inputRef.current.disabled = false;
  }
  
  const makeRoom = () => {
    const info = {
      title: room_name,
      user: sessionStorage.getItem('nickname'),
      pw: lock_number,
      is_lock: lock
    }
    console.log(info.is_lock)           
    socket.emit('make_room', info)
  }

  return(
    <>
      <div className="room_modal">
        <VerticalLayout>
          <div>
            <div className="room_name_label">방 정보 설정하기</div>
            <div>
              <input 
                type='text'
                className='room_name'
                placeholder='방 이름'
                value={room_name}
                onChange={e => {
                  set_room_name(e.target.value)
                }}>
                </input>
            </div>
            <div className="pw_wrapper">
              <HorizontalLayout>
                  <button onClick={()=>{
                    set_lock(!lock)
                    handlePassWordField();
                  }}className='pw_btn'>비밀번호</button>
                  <input type='password' className='pw_input' ref={inputRef}/>
              </HorizontalLayout>
            </div>
            <div className="button">
              <HorizontalLayout>
                <button 
                  onClick={()=>{
                    makeRoom()
                    router.push('/GamePage')
                    }}
                  className="ok">확인</button>
                <button onClick={()=>{props.on_click_cancel()}} className="cancel">취소</button>
              </HorizontalLayout>
            </div>
          </div>
        </VerticalLayout>
      </div>
      <style jsx>{`
        .room_modal{
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20vw;
          height: 30vh;
          background-color: white;
          border: 2px solid;
          padding: 10px;
        }
        .room_name_label{
          font-weight: bold;
        }
        .room_name{
          margin-top: 10px;
          margin-bottom: 10px;
          width: 97%;
        }
        .pw_wrapper{
          margin-top: 20px;
          margin-bottom: 20px;
        }
        .pw_btn{
          margin: auto;
          width: 15%;
        }
        .pw_input{
          margin: auto;
          width: 80%;
        }
        .ok{
          background-color: ${Color.green_6};
          border: none;
          padding: 5px 16px;
          color: white;
          font-size: 20px;
          font-weight: bold;
          margin:auto;
        }
        .ok:hover{
          cursor: pointer;
          background-color: ${Color.green_7};
        }
        .cancel{
          background-color: ${Color.green_6};
          border: none;
          padding: 5px 16px;
          color: white;
          font-size: 20px;
          font-weight: bold;
          margin:auto;
        }
        .cancel:hover{
          cursor: pointer;
          background-color: ${Color.green_7};
        }
      `}
      </style>
    </>
  )

  

}
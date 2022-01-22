import HorizontalLayout from "./HorizontalLayout";
import VerticalLayout from "./VerticalLayout";
import {useState, useRef} from 'react'

import { makeRoom } from "../utils/socket/socketManger";
import { useRouter } from "next/router";

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
      lock: lock_number
    }
    socket.emit('make_room', info)
  }

  return(
    <>
      <div className="room_modal">
        <VerticalLayout>
          <div>
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
            <div>
              <HorizontalLayout>
                  <button onClick={()=>{
                    set_lock(!lock)
                    handlePassWordField();
                  }}className='pw_btn'>비밀번호 설정?</button>
                  <input type='password' className='pw_input' ref={inputRef}/>
              </HorizontalLayout>
            </div>
            <div className="button">
              <button 
                onClick={()=>{
                  makeRoom()
                  router.push('/GamePage')
                  }}
                className="ok">확인</button>
              <button onClick={()=>{props.on_click_cancel()}}className="cancel">취소</button>
            </div>
          </div>
        </VerticalLayout>
      </div>
      <style jsx>{`
        .room_modal{
          position: absolute;
          top: 50%;
          left: 50%;
          width: 50vw;
          height: 30vh;
          
        }
        .room_name{
          margin-bottom: 10px;
          width: 100%;
        }
        .pw_btn{
          margin: auto;
          width: 15%;
        }
        .pw_input{
          margin: auto;
          width: 80%;
        }
      `}
      </style>
    </>
  )

  

}
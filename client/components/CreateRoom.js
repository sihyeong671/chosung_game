import HorizontalLayout from "./HorizontalLayout";
import VerticalLayout from "./VerticalLayout";
import {useState, useRef} from 'react'

import { makeRoom, socket } from "../utils/socket/socketManger";
import { useRouter } from "next/router";
import { Color } from "../utils/color/colors";
import { motion } from "framer-motion";

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
      pw: lock_number.toString(),
      is_lock: lock
    }
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
                    <input 
                      disabled
                      placeholder="비밀번호"
                      type='password'
                      className='pw_input'
                      ref={inputRef}
                      value={lock_number}
                      onChange={(e)=>{
                        set_lock_number(e.target.value)
                      }}/>
                    <div className="toggle">
                      <input
                        type="checkbox"
                        onClick={()=>{
                        set_lock(!lock)
                        handlePassWordField();
                        }}
                        className='pw_btn'/>
                    </div>
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
            top: 30%;
            left: 57%;
            width: 20vw;
            height: 30vh;
            background-color: white;
            border: 2px solid;
            border-radius: 20px;
            padding: 10px;
          }
          .room_name_label{
            display: flex;
            justify-content:center;
            font-size: 1.5rem;
            margin-top:10px;
            margin-bottom:10px;
            font-weight: bold;
          }
          .room_name{
            font-family: "KATURI";
            font-size:1.5rem;
            margin-top: 10px;
            margin-bottom: 10px;
            width: 97%;
          }
          .pw_wrapper{
            margin-top: 20px;
            margin-bottom: 20px;
          }
          .toggle input[type="checkbox"]{
            margin:15px;
            position:relative;
            width:35px;
            height:15px;
            -webkit-appearance: none;
            background: linear-gradient(to right, ${Color.green_5}, ${Color.green_8});
            outline: none;
            border-radius: 30px;
          }
          .toggle input:checked[type="checkbox"]:nth-of-type(1) {
            background: linear-gradient(to right, ${Color.green_1}, ${Color.green_3});
          }
          .toggle input[type="checkbox"]:before {
            content:'';
            position:absolute;
            top:0;
            left:0;
            width:20px;
            height:15px;
            background: linear-gradient(0deg, ${Color.green_5}, ${Color.green_6});
            border-radius: 11.25px;
            transform: scale(.98,.96);
            transition:.5s;
          }

          .toggle input:checked[type="checkbox"]:before {
            left:15px;
          }
          .toggle input[type="checkbox"]:after{
            content:'';
            position:absolute;
            top:calc(50% - 2px);
            left:26.25px;
            width:0.375px;
            height:0.375px;
            background: linear-gradient(to bottom, ${Color.green_1}, ${Color.green_5});
            border-radius: 50%;
            transition:.5s;
          }

          .toggle input:checked[type="checkbox"]:after {
            left:27.5px;
          }
          .pw_input{
            font-family: "KATURI";
            font-size:1.5rem;
            margin: auto;
            width: 80%;
          }
          .ok{
            background-color: ${Color.green_6};
            border: none;
            padding: 5px 16px;
            color: white;
            font-size: 25px;
            font-family: "KATURI";
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
            font-size: 25px;
            font-family: "KATURI";
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
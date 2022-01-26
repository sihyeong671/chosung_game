import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import uuid from "react-uuid";
import { Color } from "../utils/color/colors";
import { sendMessage, socket } from "../utils/socket/socketManger";
import HorizontalLayout from "./HorizontalLayout";
import VerticalLayout from "./VerticalLayout"

export const Chatting = () => {

  console.log("채팅 컴포넌트 렌더링");
  const [message, set_message] = useState('')
  const [message_list, set_message_list] = useState([])
  const [saveduser, set_saveduser] = useState('');

  let correct = true
  let test;

  useEffect(()=>{ //session storage에 저장된 user nickname 가져오기
    set_saveduser(sessionStorage.getItem('nickname'))
  } , [])

  useEffect(() => { //wrong event
    socket.on('wrong', (data) => {
      correct = false
    })
    return(()=>{
      socket.off('wrong')
    })
    
  }, [])

  useEffect(() => { //correct event
    socket.on('correct', (data) => { // 수정
      correct = true
      toast(`${data.user}(이)가 정답을 맞췄습니다!`)
      // set_correct_person(data.user)
    })
    return(()=>{
      socket.off('correct')
    })
  }, [])

  useEffect(()=>{
    socket.off('new_message')
    socket.on('new_message', (data) => {
      console.log("recieve new message");
      set_message_list([...message_list, data])
    })
  }, [message_list])

  

  
  
  useEffect(()=>{
    const chatting_view = document.getElementById('chatting')
    chatting_view.scrollBy({top:chatting_view.scrollHeight})
  },[message_list])


  const handlepost = (e) => { //채팅 입력했을 때
    e.preventDefault()
    // console.log(saveduser);
    const temp = {
      user: saveduser,
      content: message
    }
    if(message.length === 0){
      return;
    }
    
    sendMessage(temp)
    set_message_list([...message_list, temp])
    set_message('')
  }

  return(
    <>
      <div>
        <VerticalLayout>
          <div id='chatting'>
            {
              message_list?.map((msg) => {
                let show_name
                
                if(msg.user.length > 7){ // 이름
                  show_name = msg.user.slice(0, 6) + '...'
                }
                else{
                  show_name = msg.user
                }

                if(msg.user === saveduser){
                  return(
                    <div key={uuid()}>
                      <span  className='my_message'>{msg.content}</span>
                    </div>
                  )
                }
                else{
                  return(
                    <div key={uuid()}>
                      <HorizontalLayout>
                        <div className='name'>{show_name}</div>
                        <span className='other_message'>{msg.content}</span>
                      </HorizontalLayout>
                      
                    </div>
                  )
                }
                
              })
            }
          </div>
          <div>
            <form onSubmit={handlepost} className='chatting_bottom'>
              <input type='text' autoComplete = "off" id='chatting_input' placeholder='채팅 입력창' onChange={e=>{set_message(e.target.value)}} value={message}></input>
            </form>
          </div>
        </VerticalLayout>
      </div>
      <style jsx>{`
        #chatting{
          display: flex;
          flex-direction: column;
          height: 34vh;
          width: 95%;
          margin: auto;
          margin-bottom: 5px;
          overflow-y: scroll;
          overflow-x: hidden;
          background-color: ${Color.green_1};
        }
        #chatting::-webkit-scrollbar {
          width: 5px;
        }
        #chatting::-webkit-scrollbar-thumb {
          background-color: ${Color.green_8};
          border-radius: 10px;
        }
        #chatting::-webkit-scrollbar-track {
          background-color: ${Color.green_3};
          boreder-radius: 10px;
        }
        .my_message{
          float: right;
          background-color: ${Color.green_4};
          padding: 10px;
          margin: 10px;
        }
        .name{
          padding-left: 8px;
          padding-top: 25px;
        }
        .other_message{
          float: left;
          background-color: white;
          padding: 10px;
          margin: 10px;
        }
        #chatting_input{
          display: block;
          width: 94%;
          height: 30px;
          margin: auto;
          border-radius: 10px;
          border-color: ${Color.green_2};
          padding: 3px 8px 3px 8px;
        }
        .chatting_bottom{
          margin-top: 3px;
          margin-bottom:16px;
        }
      `}
      </style>
    </>
  )
}
import VerticalLayout from "../components/VerticalLayout";
import HorizontalLayout from "../components/HorizontalLayout";
import { io, Socket } from "socket.io-client";
import React, { useState, useEffect, useRef } from 'react';
import ProgressBar from "../components/ProgressBar.js";
import uuid from 'react-uuid'
import { useRouter } from 'next/router'
import { connectSocket, sendMessage, ready } from '../utils/socket/socketManger'
import { chainPropTypes } from "@mui/utils";
import { socket } from "../utils/socket/socketManger";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@mui/styles";
import {Color} from "../utils/color/colors";
import { my_room } from "../utils/data/roomdata";



const useStyles = makeStyles({
  player: {
    margin: 'auto',
    backgroundColor: Color.green_1,
  },
  player_img: {
    width: '80px',
    marginRight: '8px',
  }
})

//for test
// connectSocket()

export default function GamePage() {
  const classes = useStyles();
  
  //session storage에 저장된 user nickname 가져오기
  //const saveduser = sessionStorage.getItem('nickname')
  const saveduser = "userTest"

  let round_start = false
  

  const [problem, set_problem] = useState('')

  const [message, set_message] = useState('')
  const [message_list, set_message_list] = useState([])

   //socket listener
  useEffect(()=>{
    
    socket.on('round_start', (data)=>{
      round_start = true;
      console.log('round_start: ' + round_start)
      set_problem(data.hint)
      console.log(problem)
    })

    socket.on('hint_update', (data)=>{
      set_problem(data.hint)
      console.log(problem)
    })

    socket.on('round_over', (data)=>{
      console.log('round_over')
    })

    socket.on('new_message', (data) => {
      console.log(data)
    })
    
    socket.on('wrong', (data) => {
      console.log('wrong' + data.user)
    })

    socket.on('correct', (data) => {
      console.log('correct' + data.user)
    })

  }, [round_start, problem])

  
  let ready_state = false
  //준비하기 버튼 눌렀을 때
  const handleready = () =>{
    //for test
    // socket.emit('make_room', {title: 'test', user: 'testuser'})
    if(ready_state === false){
      ready_state = true;
      ready()
      console.log("ready: " + ready_state)
    }
    else{
      ready_state = false
      //서버쪽에 보내서 처리 필요
    }
    
    //ui 바뀌도록
  }


  //새로운 message 보낼 때 스크롤 위치
  useEffect(() => {
    const chatting_view = document.getElementById('chatting')
    chatting_view.scrollBy({top:chatting_view.scrollHeight})
  }, [message_list])

  //채팅 입력했을 때
  const handlepost = (e) => {
    e.preventDefault()
    const temp = {
      user: saveduser,
      message: message
    }
    sendMessage(temp)
    console.log(message)
    set_message_list([...message_list, temp])
    console.log(message_list)
    set_message('')
  }

  let max_second = 60
  let set_timer

  const [seconds, set_seconds] = useState(0)

  //timer 숫자 설정
  useEffect(() => {

    if(round_start === true){
      set_timer = setInterval(() => {
        if(seconds === max_second){
          set_seconds(0)
          //handle round over
        }
        else{
          set_seconds(seconds + 1)
        }
        
        console.log(seconds)
      }, 1000);
  
      return () => clearInterval(set_timer)
    }
    
  }, [seconds])
  


  return(         
    <>
      <div className='game_page' >
        <VerticalLayout>
          <div className='progress_bar'>
            <ProgressBar second={seconds}/>
          </div>
          <div>
            <div className='question'>
              {/*<Card elevation={5} className={classes.problem_card}>
                <CardHeader title={problem}></CardHeader>
                <CardContent></CardContent>
              </Card>*/}
              <span className='question_text'>{problem}</span>
              {/*<span className='question_text'>ㅊ ㄹ ㄱㄷ ㅎ ㄱㅇㅂㅌ</span>*/}
            </div>
          </div>
          <div>
            <VerticalLayout>
              <div className='set_player'>
                <HorizontalLayout>
                  {
                      my_room.pnames.map(item => {
                        return(
                          <Card key={uuid()} className={classes.player} elevation={5}>
                            <CardContent>
                              <HorizontalLayout>
                                <CardMedia
                                  component='img'
                                  height='80'
                                  image='/img/test.jpg' className={classes.player_img}/>
                                <div>
                                <Typography variant='h6' component='div'>
                                  {item.name}
                                </Typography>
                                <Typography variant='body2'>
                                  {item.score}
                                </Typography>
                                </div>
                              </HorizontalLayout>
                            </CardContent>
                          </Card>
                        )
                      })
                  }
                </HorizontalLayout>
              </div>
              <div>
                <VerticalLayout>
                  <div id='chatting'>
                    {
                      message_list.map((msg) => {

                        if(msg.user == saveduser){
                          console.log("me")
                          return(
                            <div>
                              <span key={uuid()} className='my_message'>{msg.message}</span>
                            </div>
                          )
                        }
                        else{
                          console.log("you")
                          return(
                            <div key={uuid()} className='other_message'>
                              <span>{msg.message}</span>
                            </div>
                          )
                        }
                        
                      })
                    }
                  </div>
                </VerticalLayout>
              </div>
              <div>
                  <form onSubmit={handlepost} className='chatting_bottom'>
                    <input type='text' id='chatting_input' placeholder='채팅 입력창' onChange={e=>{set_message(e.target.value)}} value={message}></input>
                  </form>
              </div>
              <div className='ready'>
                <HorizontalLayout>
                  <button className='ready_btn' onClick={handleready}>준비하기</button>
                  <button className='out_btn'>방 나가기</button>
                </HorizontalLayout>
              </div>
            </VerticalLayout>
          </div>
        </VerticalLayout>
        
      </div>
      <style jsx>{`
        .game_page{
          height: 100%;
        }
        .progress_bar{
          height: 5vh;
          width: 100%;
          padding-top: 5px;
          padding-bottom: 5px;
        }
        .question{
          display: table;
          height: 20vh;
          margin: auto;
          text-align: center;
        }
        .question_text{
          display: table-cell;
          vertical-align: middle;
          font-size: 50px;
          font-weight: bold;
          padding-bottom: 10px;
        }
        .set_player{
          margin-bottom: 16px;
        }
        #chatting{
          display: flex;
          flex-direction: column;
          height: 35vh;
          overflow-y: scroll;
          overflow-x: hidden;
        }
        .my_message{
          float: right;
          background-color: ${Color.yellow_2};
          padding: 10px;
          margin: 10px;
        }
        .other_message{
          float: right;
          background-color: ${Color.green_2};
          padding: 10px;
          margin: 10px;
        }
        #chatting_input{
          width: 95%;
          height: 30px;
          margin: auto;
          border-radius: 20px;
          border-color: ${Color.green_2};
          padding: 3px;
        }
        .chatting_bottom{
          margin-top: 3px;
          margin-bottom:16px;
        }
        .ready{
          height: 5vh;
          margin:auto;
        }
        .ready_btn{
          background-color: ${Color.green_6};
          border: none;
          padding: 5px 16px;
          color: white;
          font-size: 20px;
          font-weight: bold;
          margin-right: 10px;
        }
        .out_btn{
          background-color: ${Color.green_6};
          border: none;
          padding: 5px 16px;
          color: white;
          font-size: 20px;
          font-weight: bold;
          margin-left: 10px;
        }
      `}
      </style>
    </>
  )
}
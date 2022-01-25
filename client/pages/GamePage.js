import VerticalLayout from "../components/VerticalLayout";
import HorizontalLayout from "../components/HorizontalLayout";
import React, { useState, useEffect } from 'react';
import ProgressBar from "../components/ProgressBar.js";
import uuid from 'react-uuid'
import { sendMessage } from '../utils/socket/socketManger'
import { socket } from "../utils/socket/socketManger";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@mui/styles";
import {Color} from "../utils/color/colors";
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useStyles_not_ready = makeStyles({ //player card not ready style
  player: {
    margin: 'auto',
    backgroundColor: Color.yellow_1,
  },
  player_img: {
    width: '80px',
    marginRight: '8px',
  }
})

const useStyles_ready = makeStyles({  //player car ready style
  player: {
    margin: 'auto',
    backgroundColor: Color.green_3,
  },
  player_img: {
    width: '80px',
    marginRight: '8px',
  }
})


export default function GamePage() {

  const not_ready_class = useStyles_not_ready();
  const ready_class = useStyles_ready();
  let correct = true

  const [saveduser, set_saveduser] = useState('');
  const [round_start, set_round_start]= useState(false)
  const [problem, set_problem] = useState('')
  const [message, set_message] = useState('')
  const [message_list, set_message_list] = useState([])
  const [my_ready_state, set_my_ready_state] = useState(false)
  const [btn_background, set_btn_background] = useState(Color.green_6)
  const [seconds, set_seconds] = useState(0)
  const [my_room, set_my_room] = useState({})
  const [score, set_score]= useState([])
  const [meaning, set_meaning] = useState('')
  const [correct_person, set_correct_person] = useState('')

  useEffect(()=>{ //session storage에 저장된 user nickname 가져오기
    set_saveduser(sessionStorage.getItem('nickname'))
  } , [])

  useEffect(() => { //timer 시간 set
    socket.on('one_second', (data) =>{
      set_seconds(data.tick)
      // console.log(seconds);
    })
  }, [])

  useEffect(() => { //correct event
    socket.on('correct', (data) => { // 수정
      console.log('correct' + data.user)
      correct = true
      console.log('correct' + correct)
      toast(`${data.user}가 정답을 맞췄습니다!`)
      // set_correct_person(data.user)
    })
  }, [])

  useEffect(() => { //round start event
    socket.on('round_start', (data)=>{
      //test()
      set_meaning('')
      set_round_start(true)
      //console.log('round_start: ' + round_start)
      set_problem(data.hint)
      // console.log(problem)
      //console.log(data.hint);
    })
  }, [])

  useEffect(() => { //hint update event
    socket.on('hint_update', (data)=>{
      set_problem(data.hint)
      console.log(problem)
    })
  }, [])

  useEffect(() => { //round over event
    socket.on('round_over', (data)=>{ // 수정
      console.log('round_over')
      console.log(data);
      set_score(data.score);
      set_round_start(false);
      set_problem(data.answer)
      set_meaning(data.meaning)
    })
  }, [])

  useEffect(() => { //wrong event
    socket.on('wrong', (data) => {
      console.log('wrong' + data.user)
      correct = false
      console.log('correct' + correct)
    })
  }, [])

  useEffect(() => { //update detail room event
    socket.on('update_detail_room', (data)=>{
      console.log(data);
      set_my_room(data);
    })
  }, [])

  useEffect(() => { //game over event
    socket.on('game_over', (data) => {
      set_my_ready_state(false)
      console.log(my_ready_state);
      console.log("게임 오버" + my_ready_state)
      set_btn_background(Color.green_6)
      toast("게임 종료!")
    })
  }, [])

  useEffect(()=>{ // get detail room
    socket.emit('get_detail_room', {
      room_id : parseInt(sessionStorage.getItem('room_id'))
    })

  },[])

  useEffect(()=>{
    socket.on('new_message', (data) => {
      set_message_list([...message_list, data])
    })
  }, [message_list])
  
  
  useEffect(() => { //새로운 message 보낼 때 스크롤 위치
    const chatting_view = document.getElementById('chatting')
    chatting_view.scrollBy({top:chatting_view.scrollHeight})
  }, [message_list])

  const handleready = () =>{  //준비하기 클릭 시
    if(my_ready_state === false){
      set_my_ready_state(true)
      socket.emit('ready')
      // console.log("ready: " + my_ready_state)
      set_btn_background(Color.yellow_6)
    }
    else{
      set_my_ready_state(false)
      socket.emit('cancel_ready')
      // console.log("ready: " + my_ready_state)
      set_btn_background(Color.green_6)
    }
  }

  const handlepost = (e) => { //채팅 입력했을 때
    e.preventDefault()
    // console.log(saveduser);
    const temp = {
      user: saveduser,
      content: message
    }
    sendMessage(temp)
    // console.log(message)
    set_message_list([...message_list, temp])
    // console.log(message_list)
    set_message('')
  }

  const handleexit = (e) => { //나가기 버튼 클릭 시
    socket.emit('exit_room')
    // console.log("exit")
  }


  return(         
    <>
      <div className='game_page' >
        <VerticalLayout>
          <div className='progress_bar'>
            <ProgressBar second={seconds}/>
          </div>
          <div>
            <div className='question'>
              <span className='question_text'>{problem}</span>
            </div>
            <div className='meaning'>
              <span className='meaning_text'>{meaning}</span>
            </div>
          </div>
          <div>
            <VerticalLayout>
              <div className='set_player'>
                <HorizontalLayout>
                  {(my_room.pnames)?.map((name)=>{

                      let show_name;
                      let ready_state;
                      let my_score = 0;
                      let img_num = 1;

                      for(let i = 0; i< name.length; i++){
                        let c = name.charCodeAt(i)
                        img_num = img_num * 256 + c
                        img_num = img_num % 7 + 1
                      }

                      console.log(img_num)

                      if(name.length > 7){ // 이름
                        show_name = name.slice(0, 6) + '...'
                      }
                      else{
                        show_name = name
                      }

                      if(my_room.is_ready.includes(name)){ // 준비상태
                        ready_state = true;
                      }
                      else{
                        ready_state = false;
                      }

                      // 점수
                      score?.forEach((item)=>{
                        if(item.name === name){
                          my_score = item.value;
                        }
                      })

                    return(
                      <Card key={uuid()} className={ready_state? ready_class.player: not_ready_class.player} elevation={5}>
                        <CardContent>
                          <HorizontalLayout>
                            <CardMedia
                              component='img'
                              height='80'
                              image={`/img/character_${img_num}.png`} className={ready_state? ready_class.player_img : not_ready_class.player_img}/>
                            <div>
                            <Typography variant='h6' component='div'>
                              {show_name}
                            </Typography>
                            <Typography variant='body2'>
                              {my_score}
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
                      message_list?.map((msg) => {
                        let show_name
                        
                        if(msg.user.length > 7){ // 이름
                          show_name = msg.user.slice(0, 6) + '...'
                        }
                        else{
                          show_name = msg.user
                        }

                        if(msg.user === saveduser){
                          console.log("me " + saveduser)
                          return(
                            <div key={uuid()}>
                              <span  className='my_message'>{msg.content}</span>
                            </div>
                          )
                        }
                        else{
                          console.log("you")
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
                </VerticalLayout>
              </div>
              <div>
                  <form onSubmit={handlepost} className='chatting_bottom'>
                    <input type='text' id='chatting_input' placeholder='채팅 입력창' onChange={e=>{set_message(e.target.value)}} value={message}></input>
                  </form>
              </div>
              <div className='ready'>
                <HorizontalLayout>
                  <button className='ready_btn' disabled={round_start} onClick={()=>{handleready()}}>준비하기</button>
                  <Link href='/lobby'>
                    <button className='out_btn' onClick={()=>{handleexit()}}>방 나가기</button> 
                  </Link>
                </HorizontalLayout>
              </div>
            </VerticalLayout>
          </div>
        </VerticalLayout>
      </div>
      {/* {correct ? toast(`${correct_person}가 정답을 맞췄습니다!`) : null} */}
      <ToastContainer closeOnClick/>
      <style jsx>{`
        .game_page{
          height: 100%;
        }
        .progress_bar{
          height: 5vh;
          width: 100%;
          //margin-bottom 16px;
          padding-top: 5px;
          padding-bottom: 5px;
        }
        .question{
          //display: table;
          height: 10vh;
          margin: auto;
          text-align: center;
        }
        .question_text{
          //display: table-cell;
          vertical-align: middle;
          font-size: 50px;
          font-weight: bold;
          padding-top: 10px;
        }
        .meaning{
          height: 10vh;
          text-align :center;
          margin-bottom: 16px;
          margint-top: 16px;
        }
        .set_player{
          margin-bottom: 16px;
        }
        #chatting{
          display: flex;
          flex-direction: column;
          height: 36vh;
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
        .ready{
          height: 5vh;
          margin:auto;
        }
        .ready_btn{
          background-color: ${btn_background};
          border: none;
          padding: 5px 16px;
          color: white;
          font-size: 20px;
          font-weight: bold;
          margin-right: 10px;
        }
        .ready_btn:hover{
          cursor: pointer;
          background-color: ${Color.green_7} 
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
        .out_btn:hover{
          cursor: pointer;
          background-color: ${Color.green_7};
        }
        
      `}
      </style>
    </>
  )
}
import VerticalLayout from "../components/VerticalLayout";
import HorizontalLayout from "../components/HorizontalLayout";
import React, { useState, useEffect, useMemo } from 'react';
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
import { motion } from "framer-motion";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { Chatting } from "../components/Chatting"
import { useRouter } from "next/router";




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
  console.log("게임 페이지 렌더링");
  const not_ready_class = useStyles_not_ready();
  const ready_class = useStyles_ready();
  
  let audio;
  const slide = {
    hidden: {
        x: '-100%',
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1
    }
  }

  const router = useRouter();
  const [saveduser, set_saveduser] = useState('');
  const [round_start, set_round_start]= useState(false)
  const [problem, set_problem] = useState('')
  const [problem_type, set_problem_type] = useState('')
  const [meaning, set_meaning] = useState('')
  const [my_ready_state, set_my_ready_state] = useState(false)
  const [btn_background, set_btn_background] = useState(Color.green_6)
  
  const [my_room, set_my_room] = useState({})
  const [score, set_score]= useState([])
  
  const [correct_person, set_correct_person] = useState('')


  useEffect(()=>{
    audio = new Audio();
  }, [])

  useEffect(()=>{ //session storage에 저장된 user nickname 가져오기
    set_saveduser(sessionStorage.getItem('nickname'))
  } , [])

  

  useEffect(() => { //round start event
    socket.on('round_start', (data)=>{
      //test()
      set_meaning('')
      set_round_start(true)
      //console.log('round_start: ' + round_start)
      set_problem(data.hint)
      set_problem_type(data.type)
      // console.log(problem)
      //console.log(data.hint);
    })
    return(() => {
      socket.off('round_start');
    })
  }, [])

  useEffect(() => { //hint update event
    socket.on('hint_update', (data)=>{
      set_problem(data.hint)
    })
    return(() => {
      socket.off('hint_update');
    })
  }, [])

  useEffect(() => { //round over event
    socket.on('round_over', (data)=>{ // 수정
      set_score(data.score);
      set_round_start(false);
      set_problem(data.answer)
      set_meaning(data.meaning)
    })
    return(()=>{
      socket.off('round_over');
    })
  }, [])

  

  useEffect(() => { //update detail room event
    socket.on('update_detail_room', (data)=>{
      set_my_room(data);
    })
    return(()=>{
      socket.off('update_detail_room');
    })
  }, [])

  useEffect(() => { //game over event
    socket.on('game_over', (data) => {
      set_my_ready_state(false)
      set_btn_background(Color.green_6)
      toast("게임 종료!")
    })
    return(()=>{
      socket.off('game_over');
    })
  }, [])

  useEffect(()=>{ // get detail room
    socket.emit('get_detail_room', {
      room_id : parseInt(sessionStorage.getItem('room_id'))
    })
  },[])


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

  const handleexit = (e) => { //나가기 버튼 클릭 시
    socket.emit('exit_room')
    router.replace('/lobby');
    // console.log("exit")
  }


  return(         
    <>
    <motion.div initial='hidden' animate='visible' exit='hidden' variants={slide}>
      <div className='game_page' >
        <VerticalLayout>
          <div className='progress_bar'>
            <ProgressBar/>
          </div>
          <div>
            <div className="type">
              <span className="type_text">{problem_type}</span>
            </div>
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

                      if(name.length > 7){ // 이름
                        show_name = <div className="my_name">{name.slice(0, 6) + '...'}</div>
                      }
                      else{
                        show_name = <div className="my_name">{name}</div>
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
                          my_score = <div className="my_score">{item.value}</div>;
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
                <Chatting/>

              </div>
                            
              <div className='ready'>
                <HorizontalLayout>
                  <button className='ready_btn' disabled={round_start} onClick={()=>{handleready()}}>준비하기</button>
                  <button className='out_btn' onClick={()=>{handleexit()}}>방 나가기</button> 
                </HorizontalLayout>
              </div>
            </VerticalLayout>
          </div>
        </VerticalLayout>
      </div>

      <ToastContainer 
        position="top-left"
        closeOnClick
      />
      <style jsx>{`
        .game_page{
          height: 89vh;
        }
        .progress_bar{
          height: 5vh;
          width: 99.3%;
          padding-bottom: 3px;
        }
        .question{
          //display: table;
          height: 7vh;
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
          height: 7vh;
          text-align :center;
          margin-bottom: 13px;
          margin-top: 10px;
        }
        .type{
          display:flex;
          justify-content: center;
        }
        .type_text{
          font-size: 1.5rem;
          padding-top:0.5rem;
          padding-bottom:0.5rem;
        }
        .set_player{
          margin-bottom: 16px;
        }
        #chatting{
          display: flex;
          flex-direction: column;
          height: 32vh;
          width: 95%;
          margin: auto;
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
        .my_name{
          font-family:"KATURI";
        }
        .my_score{
          font-family:"KATURI";
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
          display: flex;
          flex-direction: column; 
        }
        .ready_btn{
          background-color: ${btn_background};
          border: none;
          padding: 5px 16px;
          color: white;
          font-family: "KATURI";
          font-size: 25px;
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
          font-family: "KATURI";
          font-size: 25px;
          font-weight: bold;
          margin-left: 10px;
        }
        .out_btn:hover{
          cursor: pointer;
          background-color: ${Color.green_7};
        }
        
      `}
      </style>
      </motion.div>
    </>
  )
}
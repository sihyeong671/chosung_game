import VerticalLayout from "../components/VerticalLayout";
import HorizontalLayout from "../components/HorizontalLayout";
import { io, Socket } from "socket.io-client";
import React, { useState, useEffect } from 'react';
import ProgressBar from "../components/ProgressBar.js";
import uuid from 'react-uuid'
import { useRouter } from 'next/router'

//import  Grid  from '@material-ui/core/Grid';
//import {Typography} from '@material-ui/core';
//import {Container} from '@material-ui/core';
//import Card from '@mui/material/Card';
//import CardHeader from '@mui/material/Card';
//import CardContent from '@mui/material/Card';
//import { makeStyles } from "@mui/styles";
//import Box from '@mui/material/Box';
//import { alpha } from '@mui/material/styles';

//need to add server domain
// const socket = io("http://192.249.18.147:80");

  // socket.on("connect", () => {
  //   console.log(socket.connected);
  // });

// const useStyles = makeStyles({
//   problem_card: {
//     backgroundColor: 'green',
//   }
// })

export default function GamePage() {

  //const classes = useStyles();
  const router = useRouter()
  const { GamePage } = router.query

  //const answer = ['답1', '답1', '답1', '답1', '답1', '답1', '답1', '답1']
  const player = ['사람1', '사람1', '사람1', '사람1', '사람1', '사람1']
  const chatting = ['chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting']
  const problem = "ㅁㅈㄹ ㅂㅇㅇㅇㅎ" 

  const [message, set_message] = useState([]);

  
  const second = 10;

  // const handlepost = (e) => {
  //   socket.emit('new_message', {message})
  // }


  return(         
    <>
      <div className='game_page' >
        <VerticalLayout>
          <div className='progress_bar'>
            <ProgressBar second={second}/>
          </div>
          <div>
            <div className='question'>
              {/*<Card elevation={5} className={classes.problem_card}>
                <CardHeader title={problem}></CardHeader>
                <CardContent></CardContent>
              </Card>*/}
              <span className='question_text'>{problem}</span>
            </div>
          </div>
          <div>
            <VerticalLayout>
              <div>
                <HorizontalLayout>
                  {
                      player.map(item => {
                        return(
                          <div key={uuid()} className='player'>{ item }</div>
                        )
                      })
                  }
                </HorizontalLayout>
                
              </div>
              <div>
                <VerticalLayout>
                  <div className='chatting' >
                    <ul>
                      {
                        chatting.map(item =>{
                          return(
                            <li key={uuid()}>{item}</li>
                          )
                        })
                      }
                    </ul>
                  </div>
                  <HorizontalLayout className='chatting_bottom'>
                    <input type='text' className='chatting_input' placeholder='채팅 입력창' onChange={(e) => set_message(e.target.value)}></input>
                    <button className='send_btn'>보내기</button>
                  </HorizontalLayout>
                </VerticalLayout>
              </div>
              <div className='ready'>
                <button>준비하기</button>
              </div>
            </VerticalLayout>
          </div>
        </VerticalLayout>
        
      </div>
      <style jsx>{`
        .game_page{
          height: 100vh;
        }
        .progress_bar{
          height: 5vh;
          width: 100%;
          margin:auto;
          margin-bottom:10px;
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
          font-size: 80px;
          font-weight: bold;
          padding-bottom: 10px;
        }
        .answer{
          border: solid 1px;
          margin: auto;
          padding: 5px;
          height: 5vh;
        }
        .player{
          border: solid 1px;
          margin: auto;
          padding: 5px;
          height: 10vh;
        }
        .chatting{
          height: 35vh;
          overflow: scroll;
        }
        .chatting_bottom{
          height: 10vh;
        }
        .chatting_input{
          width: 95%;
          margin: auto;
        }
        .send_btn{
          width: 5%;
          margin: auto;
        }
        .ready{
          height: 5vh;
          margin:auto;
        }
      `}
      </style>
    </>
  )
}
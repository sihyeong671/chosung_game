import VerticalLayout from "../components/VerticalLayout";
import HorizontalLayout from "../components/HorizontalLayout";
import { io, Socket } from "socket.io-client";
import React, { useState, useEffect } from 'react';
import ProgressBar from "../components/ProgressBar.js";
import uuid from 'react-uuid'
import { useRouter } from 'next/router'
import { connectSocket, sendMessage } from '../utils/socket/socketManger'
import { chainPropTypes } from "@mui/utils";
import { socket } from "../utils/socket/socketManger";
// const useStyles = makeStyles({
//   problem_card: {
//     backgroundColor: 'green',
//   }
// })


export default function GamePage() {

  //const classes = useStyles();
  const router = useRouter()
  const { GamePage } = router.query

  const player = ['사람1', '사람1', '사람1', '사람1', '사람1', '사람1']
  const problem = "ㅁㅈㄹ ㅂㅇㅇㅇㅎ" 

  const [message, set_message] = useState('')
  const [message_list, set_message_list] = useState([])

   //for test
  useEffect(()=>{
    connectSocket()
    socket.on('new_message', (data) => {
      console.log(data);
    })
  }, [])

  const renderChat = () => {
    return message_list.map((msg) => (
      <div key={uuid()}>
        <span>{msg.message}</span>
      </div>
    ))
  }
  
  const second = 10;

  const handlepost = (e) => {
    e.preventDefault()
    const temp = {
      user: 'testuser',
      message: message
    }
    sendMessage(temp)
    console.log(message)
    set_message_list([...message_list, temp])
    console.log(message_list)
    set_message('')
    const chatting_view = document.getElementById('chatting')
    chatting_view.scrollBy({top:100})
  }


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
              <div className='set_width'>
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
                  <div id='chatting' >
                    {renderChat()}
                  </div>
                  <HorizontalLayout className='chatting_bottom'>
                    <form onSubmit={handlepost}>
                      <input type='text' id='chatting_input' placeholder='채팅 입력창' onChange={e=>{set_message(e.target.value)}} value={message}></input>

                    </form>
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
          height: 80vh;
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
        .player{
          border: solid 1px;
          margin: auto;
          padding: 5px;
          height: 10vh;
        }
        #chatting{
          height: 35vh;
          overflow-y: scroll;
          overflow-x: hidden;
        }
        .chatting_bottom{
          height: 10vh;
        }
        #chatting_input{
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

import uuid from 'react-uuid'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'

import UserCard from '../components/UserCard'
import Room from '../components/Room'
import Link from 'next/link'
import { connectSocket, socket } from '../utils/socket/socketManger'
import CreateRoom from '../components/CreateRoom'
import { user_infos } from '../utils/data/userdata'
import { rooms } from '../utils/data/roomdata'

export default function Lobby(){

  const [show_modal, set_show_modal] = useState(false)

  const off_modal = () => {
    set_show_modal(false)
  }
  

  useEffect(async ()=>{
    await connectSocket()
    return(()=>{
      console.log('clean lobby');
    })
  },[])

  const quickEnter = () => {
    const info = {
      room_id: -1,
      user: sessionStorage.getItem('nickname'),
    }
    socket.emit('enter_room', info)
  }
  // user, room import 해서 가져오기
  
  const sorted_infos = user_infos.sort((a, b) => {
    return b.score - a.score
  })

  const room_list = []
  rooms?.forEach((v, k)=>{
    room_list.push(
      <Room
        key={uuid()}
        room_id={k}
        room_title={v.title}
        room_cnt={v.rcnt}
        room_readycnt={v.readycnt}
      />
    )
  }) 
  return(
    <>
      <div className='screen_wrapper'>
        <div className='ranking_wrapper'>
          <div className='ranking'>
            {sorted_infos.map((user_info, idx)=>{
              return(
                <UserCard 
                  key={uuid()}
                  idx={idx+1}
                  user_info={user_info}
                />
              )
            })}
          </div>
          <div className='my_rank'>
            내 랭킹
          </div>
        </div>
        <div className='rooms_wrapper'>
          <div className='button'>
              <Button onClick={()=>{
                set_show_modal(true)
              }}variant="contained">방 만들기</Button>
            <Link href="/GamePage">
              <Button onClick={()=>{
                quickEnter()
              }} variant="contained">빠른 입장</Button>
            </Link>
          </div>
          <div className='rooms'>
            {room_list}
          </div>
        </div>
      </div>
      {show_modal? <CreateRoom on_click_cancel={off_modal}/> : null}
      <style jsx>{`
        .screen_wrapper{
          position: relative;
          display: flex;
          height: 100vh;
        }

        .rankinkg_wrapper{
          display: flex;
          flex-direction: column;
          flex-grow:1;
          height: 100vh;
        }
        .ranking{
          height: 100vh;
          overflow: scroll;
        }
        .rooms_wrapper{
          flex-grow:1;
          padding: 3rem;
        }
        .button{
          display: flex;
          justify-content: center; 
        }
        .make_room{
          background-color: black; 
        }
        .quick_enter{
          margin-left: 1rem;
        }
      `}</style>
    </>
  )
}


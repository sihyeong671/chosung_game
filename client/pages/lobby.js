import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import uuid from 'react-uuid'
import Button from '@mui/material/Button'

import UserCard from '../components/UserCard'
import Room from '../components/Room'
import Link from 'next/link'

export default function Lobby(){

  // let user_info;
  // let my_rank;
  // useEffect(async () => {
  //   const user_res = await axios.get();
  //   const room_res = await axios.get();
  
  //   user_info
  //   배열 sort이후 대입
  // }, []);
  const user_infos = [
    {
      nick_name: '시형',
      score: 100
    },
    {
      nick_name: '병규',
      score: 30
    },
    {
      nick_name: '민서',
      score: 22
    },
    {
      nick_name: '시형',
      score: 100
    },
    {
      nick_name: '병규',
      score: 30
    },
    {
      nick_name: '민서',
      score: 22
    },
    {
      nick_name: '시형',
      score: 100
    },
    {
      nick_name: '병규',
      score: 30
    },
    {
      nick_name: '민서',
      score: 22
    },
    {
      nick_name: '시형',
      score: 100
    },
    {
      nick_name: '병규',
      score: 30
    },
    {
      nick_name: '민서',
      score: 22
    },
  ]

  const sorted_infos = user_infos.sort((a, b) => {
    return b.score - a.score
  })

  const rooms = [
    {
      room_id: 'ABCD12345',
      room_title: "test1",
      room_cnt: 2,
      room_readycnt: 0,
    },
    {
      room_id: 'ABCD12345XX',
      room_title: "test2",
      room_cnt: 1,
      room_readycnt: 0,
    },
    {
      room_id: 'XXABCD12345',
      room_title: "test3",
      room_cnt: 5,
      room_readycnt: 2,
    },

  ]

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
            <Button onClick={()=>{console.log("click");}}variant="contained">방 만들기</Button>
            <Link href="/gamemain/GamePage=123">
              <Button onClick={()=>{}} variant="contained">빠른 입장</Button>
            </Link>
          </div>
          <div className='rooms'>
            {rooms.map((room)=>{
              return(
                <Room
                  key={uuid()}
                  room_id={room.room_id}
                  room_title={room.room_title}
                  room_cnt={room.room_cnt}
                  room_readycnt={room.room_readycnt}
                />
              )
            })}
          </div>
        </div>
      </div>
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

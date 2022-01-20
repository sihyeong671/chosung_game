import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import uuid from 'react-uuid'

import UserCard from '../components/UserCard'
import Room from '../components/Room'

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
  ]

  return(
    <>
      <div className='screen_wrapper'>
        <div className='ranking'>
          {user_infos.map((user_info)=>{
            return(
              <UserCard 
                key={uuid()}
                user_info={user_info}
              />
            )
          })}
          <div className='my_rank'>

          </div>
        </div>
        <div className='rooms'>
          <div className='button'>
            <div className='make_room'>방 만들기</div>
            <div className='quick_enter'>빠른 입장</div>
          </div>
          <div className='rooms'>

          </div>
        </div>
      </div>
      <style jsx>{`
        .screen_wrapper{
          display: flex;
        }
        .ranking{
          overflow: scroll;
          height: 30vh;
        }
      `}</style>
    </>
  )
}

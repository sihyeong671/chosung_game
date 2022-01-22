// socket Handler
import io from 'socket.io-client'
import { updateDetailRoom, updateRoom } from '../data/roomdata';
import { getRank } from '../data/userdata';

export let socket;

export function connectSocket(){
  socket = io("http://192.249.18.147:80")

  // 연결
  socket.on('connect', ()=>{
    console.log('connect');
    if(sessionStorage.getItem('guest') === 'true'){
      const nickname = `guest${socket.id}`
      sessionStorage.setItem('nickname', nickname)
    }
    else{ // 카카오 로그인 한 경우
      socket.emit('getmystatus', sessionStorage.getItem('nickname'))
    }
    // socket.emit('getranking');
  })
  // 연결해제
  socket.on('disconnect', ()=>{
    console.log('disconnect');
  })

  socket.on('yourranking', (data)=>{
    console.log(data);
    getRank(data);
  })

} 
// 참가하기
// export function enterRoom(id){
//   const info = {
//     room_id: id,
//     user: socket.id
//   }
//   socket.emit("enter_room", info)
// }



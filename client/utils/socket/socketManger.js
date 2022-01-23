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

  // 방 업데이트
  socket.on('update_room', (data)=>{
    console.log('update-room');
    console.log(data);
    updateRoom(data);
  })

  socket.on('update_detail_room', (data)=>{
    console.log('update-detail-room');
    console.log(data);
    updateDetailRoom(data);
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

export function sendMessage(state){
  console.log(state)
  socket.emit('message', {content: state.message, user: state.user})
}

export function ready(){
  socket.emit('ready')
}



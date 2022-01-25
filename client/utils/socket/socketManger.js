// socket Handler
import io from 'socket.io-client'
import { Chatting } from '../../components/Chatting';

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

  socket.on('send_room_id',(data)=>{
    sessionStorage.setItem('room_id', data.room_id)
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
  socket.emit('message', {content: state.content, user: state.user})
}





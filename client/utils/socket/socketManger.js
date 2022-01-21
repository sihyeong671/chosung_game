// socket Handler
import io from 'socket.io-client'

export let socket;

export function connectSocket(){
  socket = io("http://192.249.18.147:80")
  socket.on('connect', ()=>{
    console.log('connect - ', socket.id);
  })
} 

export function makeRoom(room_data){
  
  socket.emit('make_room',)
}



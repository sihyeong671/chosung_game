export const rooms = new Map() // 로비에서 사용할 전체 방 정보
export const my_room = {} // 내가 들어간 방의 세부 정보

rooms.set('ABCDE123',{
  title: '1',
  rcnt: 3,
  readycnt: 3,
  is_lock: false,
  is_in_game: false
})
rooms.set('ABCDE1234',{
  title: '2',
  rcnt: 3,
  readycnt: 1,
  is_lock: false,
  is_in_game: true
})
rooms.set('ABCDE12352',{
  title: '3',
  rcnt: 4,
  readycnt: 0,
  is_lock: true,
  is_in_game: false
})
rooms.set('ABCDE123522',{
  title: '4',
  rcnt: 4,
  readycnt: 0,
  is_lock: true,
  is_in_game: false
})
rooms.set('ABCDE1235222',{
  title: '5',
  rcnt: 4,
  readycnt: 0,
  is_lock: true,
  is_in_game: false
})
rooms.set('ABCDE1231235',{
  title: '6',
  rcnt: 4,
  readycnt: 0,
  is_lock: true,
  is_in_game: false
})
rooms.set('ABCDE1235rr',{
  title: '7',
  rcnt: 4,
  readycnt: 0,
  is_lock: true,
  is_in_game: false
})
rooms.set('ABCDE123qewcs514tf',{
  title: '8',
  rcnt: 4,
  readycnt: 0,
  is_lock: true,
  is_in_game: false
})
rooms.set('ABCDsdv3E1235f431',{
  title: '9',
  rcnt: 4,
  readycnt: 0,
  is_lock: true,
  is_in_game: false
})
rooms.set('ABCDsdvvvE1235f431',{
  title: '10',
  rcnt: 4,
  readycnt: 0,
  is_lock: true,
  is_in_game: false
})
rooms.set('ABCDEsfvsfvv1235f431',{
  title: '11',
  rcnt: 4,
  readycnt: 0,
  is_lock: true,
  is_in_game: false
})
rooms.set('ABCDE1fvd235f431',{
  title: '12',
  rcnt: 4,
  readycnt: 0,
  is_lock: true,
  is_in_game: false
})
rooms.set('ABCDE1fvd23522f431',{
  title: '13',
  rcnt: 4,
  readycnt: 0,
  is_lock: true,
  is_in_game: false
})
export function updateRoom(room_info){
  const room_id = room_info.room_id
  const room_cnt = room_info.room_cnt
  const room_title = room_info.room_title
  const room_readycnt = room_info.room_readycnt

  // 인원수가 1이상이고, 없는 방인 경우 생성
  if(room_cnt > 0 && !rooms.get(room_id)){
    rooms.set(room_id, {
      title: room_title,
      rcnt: room_cnt,
      readycnt: room_readycnt
    })
    console.log(rooms);
  }
  // 현재 존재하는 방이고 인원수가 0이하로 가는 경우 삭제
  else if(rooms.get(room_id) && room_cnt <= 0){
    rooms.delete(room_id)
  }
}

export function updateDetailRoom(room_detail_info){
  const room_id = room_detail_info.room_id
  const room_pnames = room_detail_info.room_pnames
  const is_ready = room_detail_info.is_ready // array
  
  my_room.id = room_id;
  my_room.names = room_pnames;
  my_room.ready_names = is_ready;
  console.log(my_room);
}

const rooms = new Map()
const my_room = new Map()

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
  
  const room = rooms.get(room_id)
  room[room_pnames]?.filter((name)=>{
    return room_pnames.includes(name)
  })
  room[is_ready]?.filter((name)=>{
    return is_ready.includes(name)
  })
}

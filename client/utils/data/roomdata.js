export const rooms = new Map() // 로비에서 사용할 전체 방 정보
export const my_room = {
  id: '123',
  pnames: [{
    name: '사람 1',
    score: '80',
  },
  {
    name: '사람 2',
    score: '80',
  },
  {
    name: '사람 3',
    score: '12',
  },
  {
    name: '사람 4',
    score: '123',
  },
  {
    name: '사람 5',
    score: '80',
  },
  {
    name: '이름이길어지면이렇게됨',
    score: '80',
  },
],
  is_ready:[{
    name: '사람 1',
    score: '80',
  },
  {
    name: '사람 2',
    score: '80',
  },
  {
    name: '사람 3',
    score: '12',
  },
]
} // 내가 들어간 방의 세부 정보

rooms.set('ABCDE123',{
  title: 'test',
  rcnt: 3,
  readycnt: 3
})
rooms.set('ABCDE1234',{
  title: 'test1',
  rcnt: 3,
  readycnt: 1
})
rooms.set('ABCDE1235',{
  title: 'test2',
  rcnt: 4,
  readycnt: 0
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
}

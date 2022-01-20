export default function Room({room_id, room_title, room_cnt, room_readycnt}){

  return(
    <>
      <div className="room">
        <div className="room-top">
          <div className="title">
            {room_title}
          </div>
          <div className="number">
            {room_cnt} / 6
          </div>
        </div>
        <div className="room-bottom">
          <div className="lock">
            잠금 여부
          </div>
          <div className="state">
            게임 여부
          </div>
        </div>
      </div>
      <style jsx>{`

      `}</style>
    </>
  )
}
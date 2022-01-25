import React, { useEffect, useState } from "react";
import { Color } from "../utils/color/colors";
import { socket } from "../utils/socket/socketManger";

const ProgressBar = () => {

  const [seconds, set_seconds] = useState(0)
  useEffect(() => { //timer 시간 set
    socket.on('one_second', (data) =>{
      set_seconds(data.tick)
      // console.log(seconds);
    })
  }, [])

  let second_percent = ((60-seconds)/60) *100
  let filler_color = Color.green_5

  if((60 - seconds) < 10){
    filler_color = Color.red_1
    console.log(filler_color)
  } else if((60 - seconds) < 25){
    filler_color = Color.orange_1
  }
  
  const secondfiller = {
    width: `${ second_percent }%`
  }

  return(
    <>
      <div className='container'>
        <div className='filler' style={secondfiller}>
          <span className='label'>{`${60-seconds}`}</span>
        </div>
      </div>
      <style jsx>{`
        .container{
          background-color: #E0E0DE;
          border-radius: 50px;
        }
        .filler{
          height: 100%;
          background-color: ${filler_color};
          border-radius: inherit;
          padding: 5px;
          text-align: right;
        }
        .label{
          padding: 5px;
          color: white;
          font-size = 8px;
          font-weight: bold;
        }
      `}
      </style>
    </>
    
  )
}

export default ProgressBar
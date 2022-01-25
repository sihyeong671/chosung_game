import React from "react";
import { Color } from "../utils/color/colors";

const ProgressBar = (props) => {
  const { second } = props

  let second_percent = ((60-second)/60) *100
  let filler_color = Color.green_5

  if((60 - second) < 10){
    filler_color = Color.red_1
    console.log(filler_color)
  } else if((60 - second) < 25){
    filler_color = Color.orange_1
  }
  
  const secondfiller = {
    width: `${ second_percent }%`
  }

  return(
    <>
      <div className='container'>
        <div className='filler' style={secondfiller}>
          <span className='label'>{`${60-second}`}</span>
        </div>
      </div>
      <style jsx>{`
        .container{
          background-color: #E0E0DE;
          border-radius: 50px;
          margin-left: 8px;
          margin-right: 8px;
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
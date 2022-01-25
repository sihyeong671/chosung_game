import React from "react";
import { Color } from "../utils/color/colors";

const ProgressBar = (props) => {
  const { second } = props

  let second_percent = ((60-second)/60) *100
  
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
          background-color: ${Color.green_4};
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
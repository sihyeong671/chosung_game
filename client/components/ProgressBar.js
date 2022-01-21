import React from "react";

const ProgressBar = (props) => {
  const { second } = props

  let second_percent = (second/60) *100
  
  const secondfiller = {
    width: `${ second_percent }%`
  }

  return(
    <>
      <div className='container'>
        <div className='filler' style={secondfiller}>
          <span className='label'>{`${second}초`}</span>
        </div>
      </div>
      <style jsx>{`
        .container{
          height: 100%;
          width: 100%;
          background-color: #E0E0DE;
          border-radius: 50px;
        }
        .filler{
          height: 100%;
          background-color: #00CC00;
          border-radius: inherit;
          padding: 5px;
          text-align: right;
        }
        .label{
          padding: 5px;
          color: white;
          font-weight: bold;
        }
      `}
      </style>
    </>
    
  )
}

export default ProgressBar
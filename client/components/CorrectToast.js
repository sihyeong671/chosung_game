import { Color } from "../utils/color/colors";

export default function CorrectToast({correct_player}){
  return(
    <>
      <div className='correct_toast'>
        {correct_player}가 정답을 맞췄습니다.
      </div>
      <style jsx>{`
        .correct_toast {
          position: absolute;
          top: 50vh;
          left: 40vw;
          padding: 11px;
          width: 20vw;
          height: 30vh;
          //background: ${Color.green_7};
          //color: white;
          border-radius: 4px;
          border: 1px solid;
        }
      `}</style>
    </>
  )
}
import { Color } from "../utils/color/colors";

export default function CorrectToast(){
  return(
    <>
      <div className='correct_toast'>
        Correct!! 디자인 넣어야겠다
      </div>
      <style jsx>{`
        .correct_toast {
          position: absolute;
          top: 20vh;
          left: 30vw;
          padding: 11px;
          width: 40vw;
          height: 60vh;
          //background: ${Color.green_7};
          //color: white;
          border-radius: 4px;
          border: 1px solid;
        }
      `}</style>
    </>
  )
}
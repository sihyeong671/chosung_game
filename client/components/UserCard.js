import { Color } from "../utils/color/colors"

export default function UserCard({idx, user_info}){
  const nick_name = user_info.name
  const score = user_info.score
  const rank = idx
  return(
    <div className="card">
      <div className="rank">
        {rank}
      </div>
      <div className="name">
        {nick_name}
      </div>
      <div className="score">
        {score}
      </div>
      <style jsx>{`
        .card{
          display:flex;
          //background-color: ${Color.green_1};
          margin-bottom: 1rem;
          margin-right: 1rem;
          border: 1px solid;
          border-color: black;
          border-radius: 5px;
        }
        .rank{
          margin: 1rem;
          font-size: 1.5rem;
        }
        .name{
          margin: 1rem;
        }
        .score{
          margin: 1rem;
        }
      `}</style>
    </div>
  )
}
export default function UserCard({idx, user_info}){
  console.log(user_info);
  const nick_name = user_info.nick_name
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
          display: flex;
          align-items: flex-start;
          background-color: blue;
          margin-bottom: 1rem;
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
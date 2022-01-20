export default function UserCard({user_info}){
  console.log(user_info);
  const nick_name = user_info.nick_name
  const score = user_info.score
  return(
    <div>
      <div>
        {nick_name}
      </div>
      <div>
        {score}
      </div>
    </div>
  )
}
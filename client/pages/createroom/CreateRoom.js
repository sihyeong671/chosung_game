import HorizontalLayout from "../../components/HorizontalLayout";
import VerticalLayout from "../../components/VerticalLayout";

export default function CreateRoom(){
  return(
    <>
      <div>
        <VerticalLayout>
          <div>
            <div>
              <input type='text' className='room_name' placeholder='방 이름'></input>
            </div>
            <div>
              <HorizontalLayout>
                  <button className='pw_btn'>비밀번호 설정?</button>
                  <input type='text' className='pw_input' placeholder='방 비밀번호'></input>
              </HorizontalLayout>
            </div>
          </div>
        </VerticalLayout>
      </div>
      <style jsx>{`
        .room_name{
          margin-bottom: 10px;
          width: 100%;
        }
        .pw_btn{
          margin: auto;
          width: 15%;
        }
        .pw_input{
          margin: auto;
          width: 80%;
        }
      `}
      </style>
    </>
  )
}
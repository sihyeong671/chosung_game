import VerticalLayout from "../../components/VerticalLayout";
import HorizontalLayout from "../../components/HorizontalLayout";

export default function GamePage() {

  const answer = ['답1', '답1', '답1', '답1', '답1', '답1', '답1', '답1']
  const player = ['사람1', '사람1', '사람1', '사람1', '사람1', '사람1']
  const chatting = ['chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting', 'chatting']

  return(
    <>
      <div className='game_page' >
        <VerticalLayout>
          <div className='progress_bar'>
            progress bar
          </div>
          <div>
            <VerticalLayout>
              <div className='question'>
                <p>ㅊㅅ</p>
              </div>
              <div className='answer_list'>
                <HorizontalLayout>
                  {
                      answer.map(item => {
                        return(
                          <div className='answer'>{ item }</div>
                        )
                      })
                  }
                </HorizontalLayout>
              </div>
            </VerticalLayout>
          </div>
          <div>
            <VerticalLayout>
              <div>
                <HorizontalLayout>
                  {
                      player.map(item => {
                        return(
                          <div className='player'>{ item }</div>
                        )
                      })
                  }
                </HorizontalLayout>
                
              </div>
              <div>
                <VerticalLayout>
                  <div className='chatting' >
                    <ul>
                      {
                        chatting.map(item =>{
                          return(
                            <li>{item}</li>
                          )
                        })
                      }
                    </ul>
                  </div>
                  <HorizontalLayout className='chatting_bottom'>
                    <input type='text' className='chatting_input' placeholder='채팅 입력창'></input>
                    <button className='send_btn'>보내기</button>
                  </HorizontalLayout>
                </VerticalLayout>
              </div>
              <div className='ready'>
                <button>준비하기</button>
              </div>
            </VerticalLayout>
          </div>
        </VerticalLayout>
        
      </div>
      <style jsx>{`
        .game_page{
          height: 100vh;
        }
        .progress_bar{
          height: 5vh;
          margin: auto;
        }
        .question{
          height: 15vh;
          margin: auto;
        }
        .answer{
          border: solid 1px;
          margin: auto;
          padding: 5px;
          height: 5vh;
        }
        .player{
          border: solid 1px;
          margin: auto;
          padding: 5px;
          height: 10vh;
        }
        .chatting{
          height: 35vh;
          overflow: scroll;
        }
        .chatting_bottom{
          height: 10vh;
        }
        .chatting_input{
          width: 95%;
          margin: auto;
        }
        .send_btn{
          width: 5%;
          margin: auto;
        }
        .ready{
          height: 5vh;
          margin:auto;
        }
      `}
      </style>
    </>
  )
}
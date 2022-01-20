import Image from 'next/image'

export default function Header(){
  return(
    <>
      <div className='header'> 
        헤더 입니다
      </div>
      <style jsx>
        {`
          .header{
            background-color: yellow;
          }
        `}
      </style>
    </>

  )
}
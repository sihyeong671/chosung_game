import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import KaKaoLogin from 'react-kakao-login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App(){

  useEffect(() => {
    if(typeof window !== "undefined"){
      window.Kakao.init("21ae8256364207043d3cf2492252d388");
    }
  }, []);

  return (
    <KaKaoLogin 
      token={String("21ae8256364207043d3cf2492252d388")}
      onSuccess={()=>{console.log('로그인 성공');}}
      onFail={(err)=>{console.log("로그인 실패", err)}}
      onLogout={()=>{console.log("로그아웃")}}
      render={({onClick})=>(
        <div onClick={(e)=>{
          e.preventDefault();
          onClick();
        }}>
          카카오로 로그인하기
        </div>
      )}
    />
  );
}
#   
프로그래밍의 제 1 원칙 그것이 작동한다면 건드리지 마라   
![비둘기](https://user-images.githubusercontent.com/77565951/151102216-ab8b68b1-6253-4200-a496-768988f661c8.gif)


# 천 리 길도 한 걸음 부터 (속담/어록 초성게임)
- Frontend: react, Next js
- Backend: Node js, express
- mongoDB

## 게임 소개
- '천 리 길도 한 걸음 부터'는 여러 명이 함께 속담/어록 초성게임을 즐길 수 있는 게임입니다.

## 홈 화면

사이트 접속 시 홈 화면이 나타납니다.

홈 화면은 게임 캐릭터, 제목과 로그인으로 구성했습니다. 로그인은 게스트 로그인과 카카오로 로그인 하기 두 가지 방식으로 할 수 있도록 구현했습니다.

## 로비 화면

게스트 또는 카카오 로그인을 하면 로비 화면으로 연결됩니다. 로비화면에서는 랭킹 목록과 나의 랭킹, 점수를 확인할 수 있습니다. 방 만들기 버튼을 통해서 새로운 방을 만들 수 있고, 방 목록에서 참가하기 버튼을 클릭하면 게임 room 화면으로 연결됩니다. 

## 게임 화면

방을 만들거나 참가하기를 통해 게임 room으로 들어올 수 있습니다. 
   
게임 화면에서 아래쪽의 준비하기 버튼을 클릭할 수 있고, 방 안의 모든 사람이 준비하기를 하게 되면 게임이 시작됩니다.
   
게임은 (방 안의 인원 수) * 3 라운드로 이루어져 있고, 각 라운드 별로 60초의 제한시간이 있습니다. 라운드가 시작되면 DB에 저장되어 있는 속담 또는 어록 초성 문제가 랜덤으로 보여집니다. 채팅창에 정답을 입력하는 방식으로 답을 입력할 수 있습니다. 정답을 입력하면 다른 사람에게는 보여지지 않습니다, 정답을 먼저 입력한 순서대로 점수를 차등 지급 합니다.

## Game Play
[![main_screen](https://user-images.githubusercontent.com/77565951/151115852-d6c668bc-7639-4261-ad4d-3ed59a3e7ce7.png)](https://drive.google.com/file/d/1mqwKJLVev7EtDcnGh7aN_Zj7ueIvttVi/view?usp=sharing)

## Detail   

### 사용한 라이브러리
- socket.io
- framer-motion
- material-ui
- react-slick
- react-uuid
- styled-jsx
- mongoose
- cors

### 구현하지 못한 부분
- 새로고침 에러 핸들링
- 빠른 입장
- 로그아웃


### Credit
- 박시형 ([sihyeong671](https://github.com/sihyeong671))
- 공병규 ([johnpooh121](https://github.com/johnpooh121))
- 조민서 ([jjminsuh](https://github.com/jjminsuh))

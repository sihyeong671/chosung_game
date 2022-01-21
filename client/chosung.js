const express = require('express')
const cors = require('cors')

const {
  use
} = require('express/lib/application')
const mongoose = require('mongoose')
const http = require('http')
const crypto = require('crypto');
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server,{
	cors:{
		origin:'*'
	}
})
app.use(cors());
const MONGO_URL = 'mongodb://127.0.0.1:27017/test' // 이 부분 ssh로 접속한 서버 ip로 바꿔야함. 그 전에 ssh 서버에 몽고디비 깔아놓기도 하고!
const userSchema = new mongoose.Schema({
  name: String,
  score : Number
})
const User = mongoose.model("sokdamuser", userSchema)
const sokdamSchema = new mongoose.Schema({
	id:Number,
	content:String,
	meaning:String
  })
const Sokdam = mongoose.model("sokdam", userSchema)
const {
  handle
} = require('express/lib/router')
mongoose
  .connect(MONGO_URL)
  .then(() => console.log('MongoDB conected'))
  .catch((err) => {
    console.log(err);
  });
const randomstring = require('randomstring')
const {
  emit, title
} = require('process')
const { clear } = require('console')

const Cho = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
const Jung = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];
const Jong = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
function spliter(word){
	let n=word.charCodeAt(0)-0xAC00;
	const jong=n%28;
	const k = (n-jong)/28;
	const jung=k%21;
	const cho=(k-jung)/21;
	return [cho,jung,jong];
}
function isHangul(word){
	let n=word.charCodeAt(0)-0xAC00;
	if(n<0||n>117171)return false;
	return true;
}

function extract_chosung(str){
	let hstr="";
	for(i=0;i<str.length;i++){
		if(!isHangul(str[i])){
			hstr=hstr+str[i];
			continue;
		}
		const [cho,,]=spliter(str[i]);
		hstr=hstr+Cho[cho];
	}
	return hstr;
}

const l=3;
let roomnumber=0;
let rooms=[],roomSet=new Set();
let weight=[70,55,45,30,20,10];
/*
room 속성
rcnt,title,pnames,is_ready,readycnt,answer,hint
winner,score, is_in_game
socket 속성
room_id,name
*/
// 소켓 연결 코드
io.sockets.on('connection', (socket) => {
	console.log(`Socket connected : ${socket.id}`)
	let room_id=-1;//현재 방에 들어가있지 않음
	let name;
	let round_timerId=-1,hint_timerId=-1;
	
	for(let rid of roomSet){// 처음 들어왔을때 모든 방 정보를 그 소켓에만 보내기
		let room=rooms[rid];
		const room_info={
			room_id:rid,
			room_title:room.title,
			room_cnt:room.rcnt,
			room_readycnt:room.readycnt
		}
		socket.emit(`update_room`,room_info);
	}

	socket.on('getmystatus',(data)=>{
		name = data.name;
		User.findOne({ 'name': name }, function (err, person) {
			if (err) return handleError(err);
			score=0;
			if(person==null){
			User.create({'name':name, score:0})
			}
			else score=person.score;			  
			console.log(`getstatus ${username} : %d ;point`,score);
			io.emit('yourstatus',{score:score});
		})
	})
	
	socket.on('make_room', (data) => {
		room_id=roomnumber;
		name=data.user;
		roomnumber++;
		rooms[room_id]={
			title:data.title,
			rcnt:1,
			pnames:[data.user],
			is_ready:new Set(),
			readycnt:0,
			score:new Map(),
			is_in_game:false
		}
		console.log(`room made! : id ${room_id} , title ${data.title}`);
		socket.join(room_id);
		roomSet.add(room_id);
		send_update_room(room_id);
	})

	socket.on('enter_room', (data) => {
		room_id=data.room_id;
		name=data.user;
		console.log(`enter room : id ${room_id} , name : ${name}`);
		if(room_id!=-1){
			handle_enter(room_id);	
		}
		else{// quick match
			if(roomSet.size==0){
				io.emit('full_join',{user:name});
				return;
			}
			let roomArr=Array.from(roomSet);
			roomArr.sort((a,b)=>{
				if(rooms[a].rcnt==l)return 1;
				if(rooms[b].rcnt==l)return -1;
				return rooms[b].rcnt-rooms[a].rcnt;
			})
			if(rooms[roomArr[0]].rcnt>=l){
				io.emit('full_join',{user:name});
				return;
			}
			room_id=roomArr[0];
			handle_enter(room_id);
		}
	})

	socket.on('ready', (data) => {
		rooms[room_id].is_ready.add(name);
		rooms[room_id].readycnt=rooms[room_id].is_ready.size;
		send_update_room(room_id);
		console.log(`ready : name ${name}`);
		if(rooms[room_id].readycnt==rooms[room_id].rcnt){
			rooms[room_id].round=1;
			rooms[room_id].is_in_game=true;
			console.log(`room full, game start id : ${room_id}`);
			handle_round_start(room_id);
		}
	})

	socket.on('disconnect', () => {
		console.log(`Socket disconnected : ${socket.id}`);

	})

	socket.on('message',(data)=>{
		if(room_id==-1||rooms[room_id].is_in_game==false){
			//socket.to(room_id).emit('new_message',data);//그냥 echo
			console.log(data.content);
			socket.emit('new_message',data);
			return;
		}
		if(data.content!=rooms[room_id].answer){
			socket.to(room_id).emit('new_message',data);
			socket.to(room_id).emit('wrong',{user:name});
			return;
		}
		if(rooms[room_id].winner.includes(name))return;
		rooms[room_id].winner.push(name);
		socket.to(room_id).emit('correct',{user:name});
		if(rooms[room_id].winner.length>=rooms[room_id].rcnt){
			handle_roundover();
		}
	})

	function handle_enter(room_id){
		if(rooms[room_id].rcnt>=l){
			io.emit(`full`,{user:name});
			return;
		}
		rooms[room_id].rcnt++;
		let pset=new Set(rooms[room_id].pnames);
		pset.add(name);
		rooms[room_id].pnames=Array.from(pset);
		socket.join(room_id);
		send_update_room(room_id);
	}

	function handle_round_start(room_id){
		console.log(`new round`);
		let rd=crypto.randomInt(10760);
		Sokdam.findOne({id:rd},(err,sokdam)=>{
			if(err)return handleError(err);
			round=rooms[room_id].round
			round_timerId=setTimeout(handle_timeout,60000);
			hint_timerId=setInterval(handle_hint,5000);
			rooms[room_id].answer=sokdam.content;
			rooms[room_id].hint=extract_chosung(sokdam.content);
			io.to(room_id).emit('round_start',{
				round_number:round,
				hint:rooms[room_id].hint
			});
			
		})
	}
	function handle_roundover(){
		console.log(`handling round over`);
		clearInterval(hint_timerId);
		clearTimeout(round_timerId);
		let i=0;
		for(let person of rooms[room_id].winner){
			v=0;
			if(rooms[room_id].score.has(person))v=rooms[room_id].score.get(person);
			rooms[room_id].score.set(person,v+weight[i]);
			i++;
		}
		rooms[room_id].winner=[];
		rooms[room_id].hint="";
		rooms[room_id].answer="";
		rooms[room_id].round++;
		io.to(room_id).emit('round_over',{
			answer:rooms[room_id].answer,
			score:Array.from(rooms[room_id].score, ([name, value]) => ({ name, value }) )
		})
		if(rooms[room_id].round<=2*rooms[room_id].rcnt){
			setTimeout(handle_round_start,1000);
			return;
		}
		handle_gameover();
	}

	function handle_gameover(){
		console.log('handling game over');

		rooms[room_id].pnames.sort((a,b)=>{
			va=0;
			if(rooms[room_id].score.has(a))va=rooms[room_id].score.get(a);
			vb=0;
			if(rooms[room_id].score.has(b))vb=rooms[room_id].score.get(b);
			return va-vb;
		})//오름차순

		for(i=0;i<pnames.length;i++){
			person=pnames[i];
			User.findOneAndUpdate({"name":person},{$inc:{"score":(i+1)*10}}).then(()=>
				User.findOne({"name":person})
			)
		}

		rooms[room_id].is_in_game=false;
		rooms[room_id].readycnt=0;
		rooms[room_id].is_ready=new Set();
		rooms[room_id].score=new Map();
		io.to(room_id).emit('game_over',{});
		send_update_room(room_id);
	}

	function handle_timeout(){
		handle_roundover();
	}
	function handle_hint(){
		if(rooms[room_id].hint==rooms[room_id].answer)return;
		let hstr=rooms[room_id].hint;
		let ans=rooms[room_id].answer;
		let cand=new Set();
		console.log(`old hint : ${hstr}`);
		for(i=0;i<hstr.length;i++){
			if(!isHangul(hstr[i]))continue;
			if(ans[i]==hstr[i])continue;
			cand.add(i);
		}
		candarr=Array.from(cand);
		let rd=crypto.randomInt(cand.size);
		let tmp="";
		for(i=0;i<hstr.length;i++){
			if(i==rd)tmp=tmp+ans[i];
			else tmp=tmp+hstr[i];
		}
		rooms[room_id].hint=tmp;
		console.log(`new hint : ${tmp}`);
		io.to(room_id).emit('hint_update',{
			hint:rooms[room_id].hint
		})
	}
})



function send_update_room(room_id){
	let room=rooms[room_id];
	const room_info={
		room_id:room_id,
		room_title:room.title,
		room_cnt:room.rcnt,
		room_readycnt:room.readycnt
	}
	io.emit(`update_room`,room_info);
	const room_detail={
		room_id:room_id,
		pnames:room.pnames,
		is_ready:Array.from(room.is_ready)
	}
	io.to(room_id).emit(`update_detail_room`,room_detail);
}

server.listen(80, () => {
	console.log(`Server listening at http://localhost:80`)
})
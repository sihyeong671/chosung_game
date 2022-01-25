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
const Sokdam = mongoose.model("sokdam", sokdamSchema)
const analectSchema = new mongoose.Schema({
	id:Number,
	content:String,
	meaning:String
  })
const Analect = mongoose.model("analect", sokdamSchema)
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

const l=6;
let roomnumber=0;
let rooms=[],roomSet=new Set();
let weight=[70,55,45,30,20,10];
/*
room 속성
rcnt,title,pnames,is_ready,readycnt,answer,hint,pw,is_lock
winner,score, is_in_game
socket 속성
room_id,name
*/
// 소켓 연결 코드
io.sockets.on('connection', (socket) => {
	console.log(`Socket connected : ${socket.id}`)
	let room_id=-1;//현재 방에 들어가있지 않음
	let name;
	let round_timerId=-1,hint_timerId=-1,ticker_timerId=-1;

	socket.on('get_room_list',(data)=>{// required : name
		// name = data.name;
		for(let rid of roomSet){// 처음 들어왔을때 모든 방 정보를 그 소켓에만 보내기
			let room=rooms[rid];
			const room_info={
				room_id:rid,
				room_title:room.title,
				room_cnt:room.rcnt,
				room_readycnt:room.readycnt,
				is_lock: room.is_lock
			}
			socket.emit(`update_room`,room_info);
		}
	})

	socket.on('get_detail_room',(data)=>{
		const rid = data.room_id;
		console.log("get detail room ->room id:", rid);
		if(!roomSet.has(rid)){
			console.log("no such room");
			socket.emit(`no_such_room`,{});
			return;
		}
		let room = rooms[rid];
		const detail_room_info = {
			room_id:rid,
			pnames:room.pnames,
			is_ready:Array.from(room.is_ready)
		}
		//console.log(detail_room_info);
		io.to(parseInt(rid)).emit('update_detail_room', detail_room_info);
		//console.log(io.sockets.adapter.rooms);
	})

	socket.on('getmystatus',(data)=>{// required : name
		name = data.name;
		User.findOne({ 'name': name }, function (err, person) {
			if (err) return handleError(err);
			score=0;
			if(person==null){
			User.create({'name':name, score:0})
			}
			else score=person.score;			  
			console.log(`getstatus ${name} : %d : point`,score);
			io.emit('yourstatus',{score:score});
		})
	})
	
	socket.on('getranking',(data)=>{
    User.find({},(err,docs)=>{
      if(err)return handleError(err);
      const msg={
        username:name,
        stats:docs,
        length:docs.length
      }
      io.emit('yourranking',msg);
      console.log(`${docs.length} docs have been transferred`);
	  console.log(docs);
    })
  })

	socket.on('exit_room',(data)=>{
		console.log(`exit room!`);
		handle_roomexit(room_id);
	})

	socket.on('make_room', (data) => {// required : (user)name, title, is_lock, pw
		room_id=roomnumber;
		name=data.user;
		roomnumber++;
		// console.log(data);
		rooms[room_id]={
			title:data.title,
			pw:data.pw,
			is_lock:data.is_lock,
			rcnt:1,
			pnames:[data.user],
			is_ready:new Set(),
			readycnt:0,
			score:new Map(),
			is_in_game:false
		}
		// console.log(rooms[room_id]);
		console.log(`room made! : id ${room_id} , title ${data.title}`);
		socket.join(room_id);
		roomSet.add(room_id);
		socket.emit('send_room_id', {room_id: room_id});
		send_update_room(room_id);
	})

	socket.on('enter_room', (data) => { // required : room_id(quick match면 -1), pw(안잠겼으면 "")
		if(data.room_id!=-1 && rooms[data.room_id].is_in_game){
			socket.emit('already_in_game',{});
			return;
		}
		room_id = data.room_id;
		name = data.user;
		console.log(`enter room : id ${room_id} , name : ${name}`);
		if(room_id!=-1){
			handle_enter(room_id,data.pw, name);	
		}
		else{// quick match
			if(roomSet.size==0){
				socket.emit('full_join',{user:name});
				return;
			}
			let roomArr=Array.from(roomSet);
			roomArr.sort((a,b)=>{
				if(rooms[a].rcnt==l)return 1;
				if(rooms[b].rcnt==l)return -1;
				return rooms[b].rcnt-rooms[a].rcnt;
			})
			if(rooms[roomArr[0]].rcnt>=l){
				socket.emit('full_join',{user:name});
				return;
			}
			room_id=roomArr[0];
			handle_enter(room_id,data.pw, name);
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
			handle_round_start();
		}
	})

	socket.on('cancel_ready', (data) => {
		rooms[room_id].is_ready.delete(name);
		rooms[room_id].readycnt=rooms[room_id].is_ready.size;
		send_update_room(room_id);
		console.log(`cancel ready : name ${name}`);
	})

	socket.on('disconnect', () => {
		console.log(`Socket disconnected : ${socket.id}`);
		if(room_id==-1)return;
		handle_roomexit(room_id);
	})

	socket.on('message',(data)=>{// required : name, content
		console.log(`new message`);
		console.log(data);
		if(room_id==-1||rooms[room_id].is_in_game==false){
			socket.to(room_id).emit('new_message',data);//그냥 echo
			// socket.emit('new_message',data);
			return;
		}
		if(data.content!=rooms[room_id].answer){
			socket.to(room_id).emit('new_message',data);
			socket.emit('wrong',{user:name});
			return;
		}
		if(rooms[room_id].winner.includes(name))return;
		rooms[room_id].winner.push(name);
		io.to(room_id).emit('correct',{user:name});
		if(rooms[room_id].winner.length>=rooms[room_id].rcnt){
			handle_roundover();
		}
	})

	function handle_roomexit(room_id){
		rooms[room_id].rcnt--;
		pset=new Set(rooms[room_id].pnames);
		pset.delete(name);
		rooms[room_id].pnames=Array.from(pset);
		rooms[room_id].is_ready.delete(name);
		rooms[room_id].readycnt=rooms[room_id].is_ready.size;
		socket.leave(room_id);
		io.to(room_id).emit('leave',{user:name});
		console.log(`${name} left room ${room_id}`);
		send_update_room(room_id);
		if(rooms[room_id].rcnt<=0){
			clearInterval(hint_timerId);
			clearTimeout(round_timerId);
			clearInterval(ticker_timerId);
			roomSet.delete(room_id);
		}
		room_id=-1;
	}

	function handle_enter(room_id,room_pw, name){
		if(rooms[room_id].is_lock&&rooms[room_id].pw!=room_pw){
			socket.emit('incorrect_pw',{});
			return;
		}
		socket.emit(`correct_pw`,{});
		if(rooms[room_id].rcnt>=l){
			socket.emit(`full`,{user:name});
			return;
		}
		rooms[room_id].rcnt++;
		let pset=new Set(rooms[room_id].pnames);
		pset.add(name);
		rooms[room_id].pnames=Array.from(pset);
		socket.join(room_id);
		send_update_room(room_id);
	}
	
	function handle_round_start(){
		if(room_id==-1||rooms[room_id].rcnt<=0)return;
		console.log(`new round`);
		if(rooms[room_id].round<=rooms[room_id].rcnt*2){
			let rd=crypto.randomInt(1,612);
			console.log(`sokdam, selected rd : ${rd}`);
			Sokdam.findOne({id:rd},(err,sokdam)=>{
				console.log(`findone`);
				if(err)return handleError(err);
				round=rooms[room_id].round
				console.log('timersetting');
				clearInterval(hint_timerId);
				clearTimeout(round_timerId);
				clearInterval(ticker_timerId);
				round_timerId=setTimeout(handle_timeout,60000);
				hint_timerId=setInterval(handle_hint,3000);
				ticker_timerId=setInterval(handle_tick,1000);
				rooms[room_id].sec=0;
				rooms[room_id].answer=sokdam.content;
				rooms[room_id].meaning=sokdam.meaning;
				rooms[room_id].winner=[];
				console.log(`sokdam : ${sokdam.content}`);
				rooms[room_id].hint=extract_chosung(sokdam.content);
				io.to(room_id).emit('round_start',{
					round_number:round,
					hint:rooms[room_id].hint
				});
				
			})
		}
		else{
			let rd=crypto.randomInt(1,369);
			console.log(`analect, selected rd : ${rd}`);
			Analect.findOne({id:rd},(err,analect)=>{
				console.log(`findone`);
				if(err)return handleError(err);
				round=rooms[room_id].round
				console.log('timersetting');
				clearInterval(hint_timerId);
				clearTimeout(round_timerId);
				clearInterval(ticker_timerId);
				round_timerId=setTimeout(handle_timeout,60000);
				hint_timerId=setInterval(handle_hint,3000);
				ticker_timerId=setInterval(handle_tick,1000);
				rooms[room_id].sec=0;
				rooms[room_id].answer=analect.content;
				rooms[room_id].meaning=analect.meaning;
				rooms[room_id].winner=[];
				console.log(`analect : ${analect.content}`);
				rooms[room_id].hint=extract_chosung(analect.content);
				io.to(room_id).emit('round_start',{
					round_number:round,
					hint:rooms[room_id].hint
				});
				
			})
		}
	}
	function handle_roundover(){
		console.log(`handling round over`);
		clearInterval(hint_timerId);
		clearTimeout(round_timerId);
		clearInterval(ticker_timerId);
		let i=0;
		for(let person of rooms[room_id].winner){
			v=0;
			if(rooms[room_id].score.has(person))v=rooms[room_id].score.get(person);
			rooms[room_id].score.set(person,v+weight[i]);
			i++;
		}
		rooms[room_id].winner=[];
		rooms[room_id].hint="";
		rooms[room_id].round++;
		console.log(`emitting round_over`);
		io.to(room_id).emit('round_over',{
			answer:rooms[room_id].answer,
			score:Array.from(rooms[room_id].score, ([name, value]) => ({ name, value }) ),
			meaning:rooms[room_id].meaning
		})
		rooms[room_id].answer="";
		if(rooms[room_id].round<=3*rooms[room_id].rcnt){
			setTimeout(()=>{handle_round_start()},6000);
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

		for(i=0;i<rooms[room_id].pnames.length;i++){
			person=rooms[room_id].pnames[i];
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
			if(ans[i]==hstr[i])continue;
			cand.add(i);
		}
		candarr=Array.from(cand);
		if(cand.size<=1)return;
		let rd=crypto.randomInt(cand.size);
		let tmp="";
		for(i=0;i<hstr.length;i++){
			if(i==candarr[rd])tmp=tmp+ans[i];
			else tmp=tmp+hstr[i];
		}
		rooms[room_id].hint=tmp;
		console.log(`new hint : ${tmp}`);
		io.to(room_id).emit('hint_update',{
			hint:rooms[room_id].hint
		})
	}
	function handle_tick(){
		rooms[room_id].sec+=1;
		io.to(room_id).emit(`one_second`,{tick:rooms[room_id].sec});
	}
})



function send_update_room(room_id){
	let room=rooms[room_id];
	const room_info={
		room_id:room_id,
		room_title:room.title,
		room_cnt:room.rcnt,
		room_readycnt:room.readycnt,
		room_is_lock:room.is_lock
	}
	io.emit(`update_room`,room_info);
	const room_detail={
		room_id:room_id,
		pnames:room.pnames,
		is_ready:Array.from(room.is_ready)
	}
	io.to(room_id).emit(`update_detail_room`,room_detail); // 따로 함수 만들고 on 이벤트 만들것 
}

server.listen(80, () => {
	console.log(`Server listening at http://localhost:80`)
})
// const app = require('express')();
// const http = require('http').createServer(app);

// // http://172.10.5.101/
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// http.listen(80, () => {
//     console.log('connected at 80');
// });

const crypto = require('crypto');
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

let [c1,c2,c3] = spliter("ㅎ");

console.log(Cho[c1]);
console.log(Jung[c2]);
console.log(Jong[c3]);
let hintstr="나는, 힌트입니다. 항 핳 넘 .. ";
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
console.log(extract_chosung(hintstr));
// arr = [1,2,3,4,5];
// arr.push(6);
// console.log(arr);
// clearTimeout(0);
let map = new Map().set('a', 1).set('b', 2),
    array = Array.from(map, ([name, value]) => ({ name, value }));

console.log(array);
arr=[1,3,5,2,6];
arr.sort((a,b)=>{
	return a-b;
})
console.log(arr);
console.log(map.get('c'));
se = new Map();
se.set("a",1);
se.set("b",1);

function hash_to_number(word){
	ret=0;
	for(i=0;i<word.length;i++){
		c=word.charCodeAt(i);
		ret=ret*256+c;
		ret%=7;
	}
	return ret;
}
console.log(hash_to_number("guest-sdfsgagdd"));
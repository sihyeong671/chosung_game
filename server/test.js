console.log(Math.min(4,5));

function isHangul(word){
	let n=word.charCodeAt(0)-0xAC00;
	if(n<0||n>117171)return false;
	return true;
}

function getHangulCnt(word){
	let c=0;
	for(i=0;i<word.length;i++){
		if(isHangul(word[i]))c++;
	}
	return c;
}

console.log(getHangulCnt("안녕하세요. 1234  옹"));
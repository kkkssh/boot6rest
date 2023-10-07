/**
 * admin.html 
 */
// document.querySelector('#star').style.display='none'

//clear 버튼 동작입니다. -> input 요소 초기화
const clear = function(){
	document.querySelector('#id').value=''
	document.querySelector('#name').value=''
	document.querySelector('#password').value=''
	document.querySelector('#email').value=''
	document.querySelector('#birth').value='1999-01-01'
	document.querySelectorAll('.subjects').forEach(item => item.checked =false)
	document.querySelector('#default').innerHTML =`<div class="card-header" id="idOk">\tI am MessageBot!</div>`
}

document.querySelector('#clear').addEventListener('click',clear)

//전체조회 : GET 버튼 클릭 동작 -> 비동기 요청을 보내고 응답받은 회원 목록을 table 태그로 출력합니다.
document.querySelector('#selectAll').addEventListener('click',function(){
	const xhr = new XMLHttpRequest()		//비동기 통신 객체 생성
	xhr.open('GET','/api/admin')			//전송 보낼 준비 (url과 method)
	xhr.send()								//요청 전송. body와 함께 보낼 때가 있습니다.
	xhr.onload=function(){					//요청에 대한 응답받았을 때 이벤트 onload 핸들러 함수
		if(xhr.status === 200 || xhr.status ===201){
			const list = JSON.parse(xhr.response)        //자바스크립트 객체의 배열
			makeList(list)
		}else {
			console.error('오류1',xhr.status)
			console.error('오류2',xhr.response)
		}
	}
})

//응답받은 회원 목록을 태그로 출력하는 함수입니다.
function makeList(list){			//list 는 dto타입과 동일한 자바스크립트 객체 배열입니다.
        	// console.log(list);

            document.querySelector('tbody').innerHTML =''			//테이블의 기존 내용은 clear
		//  전달받은 list 를 각 항목을 table td 태그로 출력
            list.forEach(item => {    //배열에서 하나 가져온 member
		            const $tr = document.createElement("tr");
	               	const $temp=
						`<td>${item.id}</td>
						<td>${item.name}</td>
						<td>${item.email}</td>
						<td>${item.birth}</td>
						<td>${item.subjects}</td>` ;
	               	// '<td>'+ item.id+'</td>' +
	               	// '<td>'+ item.name+'</td>' +
	               	// '<td>'+ item.email+'</td>' +
	               	// '<td>'+ item.birth+'</td>' +
	               	// '<td>'+ item.subjects+'</td>' ;
	                 $tr.innerHTML=$temp;
	                 document.querySelector('tbody').appendChild($tr);
             });
}



//아이디로 조회 : GET 버튼 동작 -> 비동기 요청을 보내고 응답받은 회원 정보를 input 태그로 출력합니다.
document.querySelector('#selectOne').addEventListener('click',function(){
	//id값 필수 입력해야 합니다.
	const id = document.querySelector('#id').value
	if(!id) {
		alert('아이디 입력은 필수입니다.')
		return
	}

	const xhr = new XMLHttpRequest()		//비동기 통신 객체 생성
	xhr.open('GET','/api/bookuser/'+id)			//전송 보낼 준비 (url과 method)
	xhr.send()								//요청 전송.
	xhr.onload=function(){					//요청에 대한 응답받았을 때 처리되는 onload 이벤트 핸들러 함수
		if(xhr.status === 200 || xhr.status ===201){
			const bookuser = JSON.parse(xhr.response);

            document.getElementById('name').value = bookuser.name;
            document.getElementById('email').value = bookuser.email;
            document.getElementById('birth').value = bookuser.birth;
            // document.getElementById('subjectAll').value = bookuser.subjects;
			const subjectAll =  bookuser.subjects;
			//select한 사용자의 관심분야가 subjects 각 체크박스 요소의 value 를 포함하고 있는지 각각 비교하여 checked 하기
            document.querySelectorAll('.subjects').forEach(item => {
                    if (subjectAll != null && subjectAll.includes(item.value)) item.checked = true;
                    else item.checked = false;    
  	             });
		}else {
			console.error('오류1',xhr.status,xhr.response)
			console.error('오류2',xhr.response)
		}
	}
})


const idcheck = function() {
	let isValidId = false			//리턴변수
	const id =document.querySelector('#id').value
	if (!id) {
		return
	}
	const xhr = new XMLHttpRequest()		//비동기 통신 객체 생성
	xhr.open('GET', '/api/bookuser/is/' + id)        //전송 보낼 준비 (url과 method)
	xhr.send()								//요청 전송. body와 함께 보낼 때가 있습니다.
	xhr.onload = function () {					//요청에 대한 응답받았을 때 이벤트 onload 핸들러 함수
		if (xhr.status === 200 || xhr.status === 201) {
			//json문자열 -> 자바스크립트 객체
			const result = JSON.parse(xhr.response);
			console.log(result.isExist)

			isValidId = !result.isExist			//서버 응답 isExist 값으로 isValidId 저장. 존재하면 새로운 회원은 사용할 수 없는 아이디
			if (isValidId) {
				document.querySelector('#idOk').innerHTML = '없는 아이디 입니다.새로운 회원은 사용 가능합니다.'
				document.querySelector('#idOk').style.color = 'red'
				userid = id
			} else {
				document.querySelector('#idOk').innerHTML = '존재하는 아이디 입니다. 회원 정보 조회하세요.'
				document.querySelector('#idOk').style.color = 'green'

			}
		} else {
			console.error('오류', xhr.status, xhr.response)
		}
	}
			return isValidId			//사용할수 있으면 true
}
//id input 에서 키보드입력 할 때 중복검사 => 비동기 통신으로 입력된 id를 전달하기
document.querySelector("#id").addEventListener('keyup', idcheck)

// 체크박스 선택한 value 값을 , 구분자로 연결한 문자열을 만들어서 hidden 입력값으로 저장합니다. 회원등록에서 관심분야 값 전달
let subjects = []
document.querySelector('#checkSubjects').addEventListener('click', e=> {
	//e.preventDefault()
	e.stopPropagation()

	const target = e.target
	if(target.tagName !== 'INPUT') {return}


	document.querySelectorAll('.subjects').forEach(item => {
		if (item.checked) subjects.push(item.value)			//checked 상태는 배열에 추가
		else {   //checked 해제는 배열에서 제거
			const index = subjects.indexOf(item.value);
			if (index !== -1) { subjects.splice(index, 1); 	}
		}
	});
	console.log(subjects)
});

//회원 등록 : POST => input 에 입력한 값으로 json 문자열 생성하여 서버에 전달
document.querySelector('#save').addEventListener('click',function(){
	let yn=false
	const id = document.querySelector('#id').value
	// const result=idcheck()
	// console.log(result)
	if(idcheck()){			//중복검사를 필수로 함.
		alert('이미 사용중인 아이디 입니다.')
		return;
	}
	else {
		yn = confirm('아이디 \'' + id + '\' 로 회원가입 하시겠습니까?')
		if(!yn) return;
	}
	//1. 입력값 가져오기
	// const id = document.querySelector('#id').value
	const name =document.querySelector('#name').value
	const password = document.querySelector('#password').value
	const email = document.querySelector('#email').value
	const birth = document.querySelector('#birth').value
	// const subjects = document.querySelector('#subjectAll').value
	//2. 입력값으로 자바스크립트 객체 생성(자바스크립트 객체는 미리 타입을 정의하지 않고 사용할수 있습니다.)
	const jsObj={"id":id,
	"name":name,
	"password":password,
	"email":email,
	"birth":birth,
	"subjects":subjects}
	console.log(jsObj)
	//3.자바스크립트 객체를 json 전송을 위해 직렬화 (문자열로 변환)
	const jsStr = JSON.stringify(jsObj)
	
	const xhr = new XMLHttpRequest()		//비동기 통신 객체 생성
	xhr.open('POST','/api/bookuser')			//4.전송 보낼 준비 (url과 method)
	// Content-Type 헤더를 JSON으로 설정
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	xhr.send(jsStr)		//5. 요청 전송. POST에서는  body와 함께 보냅니다.
	xhr.onload=function(){					//요청에 대한 응답받았을 때  onload 이벤트 핸들러 함수
		if(xhr.status === 200 || xhr.status ===201){
			const resultObj = JSON.parse(xhr.response);
			if(resultObj.count==1) {
				clear()			//정상 등록 후 입력 요소 초기화
				document.querySelector('.card-header').innerHTML = '새로운 회원 \'' + id + '\'가입 되었습니다.'
				document.querySelector('.card-header').style.color = 'orange'
			}
		}else {
			console.log('오류1-',xhr.response)
			console.log('오류2-',xhr.status)
			const values = Object.values(resultObj);
			console.log(values)
			let resultMsg =''
					values.forEach(msg =>
									resultMsg += msg +"<br>")

			document.querySelector('.card-header').innerHTML = resultMsg
		}
	}
})


//회원정보 수정 : PUT =>
document.querySelector('#update').addEventListener('click',function(){
		const id = document.querySelector('#id').value
		const email = document.querySelector('#email').value
		const age = document.querySelector('#age').value
		const hobbies = document.querySelector('#hobbies').value
		//자바스크립트 객체		
		const jObj={"id":id,
			"email":email,
			"age":age,
			"hobbies":hobbies}
		
		const xhr = new XMLHttpRequest();
		xhr.open('PUT','/api/member/'+id)
		xhr.setRequestHeader('content-type', 'application/json;charset=utf-8');	//body에 형식을 갖는 header
		const data = JSON.stringify(jObj)				//자바객체를 문자열로 직렬화한 것.
		xhr.send(data)
		xhr.onload=function(){					//요청에 대한 응답받았을 때 이벤트 onload 핸들러 함수
		if(xhr.status === 200 || xhr.status ===201){
			jsonStr.innerHTML = xhr.response
			
		}else {
			console.error('오류',xhr.status)
		}
	}
})

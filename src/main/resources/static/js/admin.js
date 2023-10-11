//clear 버튼 동작입니다. -> input 요소 초기화
const clear = function () {
    document.querySelector('#id').value = ''
    document.querySelector('#name').value = ''
    document.querySelector('#password').value = ''
    document.querySelector('#email').value = ''
    document.querySelector('#birth').value = '1999-01-01'
    document.querySelector('#regdate').value = ''
    document.querySelectorAll('.subjects').forEach(item => item.checked = false)
    document.querySelector('#default').innerHTML = `<div class="card-header" id="chatBot">나는 메세지봇입니다.</div>`
    document.querySelector('#idMessage').innerHTML = `<span class="text-sm" ></span>`
}

document.querySelector('#clear').addEventListener('click', clear)
//addEventListener 는 클릭이 발생하면 실행시킬 clear 함수를 등록한다.(브라우저에게 알려줌)
//브라우저는 #clear 의 클릭이 발생하는지 listener(감시)하고 있다가 사용자가 클릭하면
// clear 함수를 큐(자료구조)에 저장한다.(큐는 선입선출)
//브라우저 스케쥴링을 통해서 큐에 저장된 함수들을 순서대로 실행시켜준다.
//큐에 저장하는 순서와 실행 순서는 개발자가 예측한 순서와 다를 수 있다.
///////////////////////////////////////////////////////////////////////////////////

const selectAll = function () {
    const xhr = new XMLHttpRequest()      //비동기 통신 객체 생성
    xhr.open('GET', '/api/admin/bookusers')         //전송 보낼 준비 (url과 method)
    xhr.send()                        //요청 전송. body와 함께 보낼 때가 있습니다.
    xhr.onload = function () {               //요청에 대한 응답받았을 때 이벤트 onload 핸들러 함수
        if (xhr.status === 200 || xhr.status === 201) {        //readyState 가 DONE
            const list = JSON.parse(xhr.response)        //자바스크립트 객체의 배열로 변환
            console.log("get /api/admin/bookusers", list)
            makeList(list)
        } else {
            console.error('오류1', xhr.status)
            console.error('오류2', xhr.response)
        }
    }
}
document.querySelector('#selectAll').addEventListener('click', selectAll)


//응답받은 회원 목록을 태그로 출력하는 함수입니다.
const makeList = function (list) {         //list 는 dto타입과 동일한 자바스크립트 객체 배열입니다.
    // console.log(list);

    document.querySelector('tbody').innerHTML = ''         //테이블의 기존 내용은 clear
    //  전달받은 list 를 각 항목을 table td 태그로 출력
    list.forEach(item => {    //배열에서 하나 가져온 member
        const $tr = document.createElement("tr");
        const $temp =
            `<td>${item.r}</td>
                  <td>${item.id}</td>
                  <td>${item.name}</td>
                  <td>${item.email}</td>
                  <td>${item.birth}</td>
                  <td>${item.reg_date}</td>
                  <td>${item.subjects}</td>`;
        $tr.innerHTML = $temp;
        document.querySelector('tbody').appendChild($tr);
    });
}

//////////////////////////////////////////////////////////////////////////////

const selectOne = function () {
    const id = document.querySelector('#id').value
    if (!id) {
        alert('아이디 입력은 필수입니다.')
        return
    }
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/bookuser/' + id)
    // xhr.open('GET',`/api/bookuser/${id}`) //위와 똑같은 코드
    xhr.send()
    xhr.onload = function () {
        console.log('xhr response:', xhr.response)
        if (xhr.status === 200 || xhr.status === 201) {        //readyState 가 DONE
            const bookuser = JSON.parse(xhr.response);        //자바스크립트 객체의 배열로 변환
            document.getElementById('name').value = bookuser.name;
            document.getElementById('email').value = bookuser.email;
            document.getElementById('birth').value = bookuser.birth;
            document.getElementById('regdate').value = bookuser.reg_date;
            // document.getElementById('subjectAll').value = bookuser.subjects;
            const subjectAll = bookuser.subjects;       //만화,소설
            //select한 사용자의 관심분야가 subjects 각 체크박스 요소의 value 를 포함하고 있는지 
            // 각각 비교하여 checked 를 true 또는 false 로 설정하기
            arrSubject.splice(0,arrSubject.length)
            document.querySelectorAll('.subjects').forEach(item => {
                if (subjectAll != null && subjectAll.includes(item.value)){
                    item.checked = true;
                    arrSubject.push(item.value)       //조회한 관심분야로 배열 초기화
            }
                else item.checked = false
            })
        }else {
            console.error('오류1', xhr.status, xhr.response)
            console.error('오류2', xhr.response)
        }
    } //onload end
}
document.querySelector('#selectOne').addEventListener('click', selectOne)

/////////////////////////////////////////////////////////////////////

//관심분야 선택 checked 로 문자열 만들기
const arrSubject = []       //arrSubject.toString() 은 배열 요소로 문자열을 만들어 줍니다. post에서 사용하기
const checkSubject = e => {
    // e.preventDefault()
    e.stopPropagation()

    const target = e.target
    if (target.tagName !== 'INPUT') {
        return
    }

    if (target.checked) arrSubject.push(target.value)        //체크 상태이면 배열에 넣기
    else {      //체크 해제 상태이면 기존 배열에서 삭제하기
        const index = arrSubject.indexOf(target.value); //해당 값의 배열 위치를 알아내기
        if (index !== -1) {
            arrSubject.splice(index, 1);
        }   //해당 위치에서 삭제하기
    }
    console.log(arrSubject)     //클릭하면서 결과를 콘솔에서 확인하세요.
}
//id 'checkSubjects' 는 checkbox input 모두를 포함하고 있는 div 태그 입니다.
//checkbox 요소가 많으므로 부모 요소에 이벤트를 주는 방식으로 합니다.
document.querySelector('#checkSubjects').addEventListener('click', checkSubject)
function test(){        //함수 선언을 이렇게 하면 끌어올리기 가능
    
}
//idCheck
let isValid = false         //idCheck 결과를 저장하기 : 전역변수
const idcheck = function (){
    let isValidId = false       //리턴 변수
    const id = document.querySelector('#id').value
    if (!id){
        alert('아이디를 입력하세요')
        return
    }
    const xhr = new XMLHttpRequest()       //비동기 통신 객체 생성
    xhr.open('GET','/api/bookuser/check/' + id)     //전송 보낼 준비 (url과 method)
    xhr.send()                              //요청 전송. body와 함께 보낼 때가 있다.
    xhr.onload = function (){       //요청에 대한 응답을 받았을 때 이벤트 onload 핸들러 함수
        if(xhr.status === 200 || xhr.status === 201) {
            //json 문자열 -> 자바스크립트 객체
            const result = JSON.parse(xhr.response);    //자바스크립트 객체로 역직렬화
            console.log("응답:",result.exist)
            //서버 응답 exist 값으로 isValidId 저장. 존재하면 새로운 회원은 사용할 수 없는 아이디
            isValid = !result.exist       //result.exist 는 true 또는 false를 리턴한다.
            if (isValid) {
                document.querySelector('#idMessage > span').innerHTML
                    = '사용할 수 있는 아이디 입니다.'
                document.querySelector('#idMessage > span').style.color = 'green'
                // userid = id

            } else {
                document.querySelector('#idMessage > span').innerHTML
                    = '존재하는 아이디입니다. 다른 아이디를 사용해주세요.'
                document.querySelector('#idMessage > span').style.color = 'red'
            }
        }else {
                console.error('오류', xhr.status, xhr.response)
            }
        }
        // console.log("리턴:",isValidId)
        return isValidId            //사용할 수 있으면 true
}
document.querySelector('#id').addEventListener('keyup',idcheck)
/////////////////////////////////////////////////////////////////////

//회원등록 : POST => input 에 입력한 값으로 json 문자열 생성하여 서버에 전달
const save = function () {      //리터럴 형식의 함수 선언: 끌어올리기 안됨. 사용하기 전에 선언
    const id = document.querySelector('#id').value

    //id 중복확인
    let yn =false
    console.log("idcheck",isValid)
    if (!isValid){
        alert('이미 사용중인 아이디 입니다.')
        return
    }else {
        yn = confirm(`아이디 '${id}' 로 회원가입 하시겠습니까?`)
        if (!yn) return         //confirm 에서 취소 누르면 false -> 함수 종료
    }

//1. 입력값 가져오기
    const name = document.querySelector('#name').value
    const password = document.querySelector('#password').value
    const email = document.querySelector('#email').value
    const birth = document.querySelector('#birth').value

    //2. 입력값으로 자바스크립트 객체 생성(자바스크립트 객체는 미리 타입을 정의하지 않고 사용할 수 있다.)
    const jsObj = {
        id: id,
        name: name,
        password: password,
        email: email,
        birth: birth,
        subjects: arrSubject.toString()
    }
    console.log(jsObj)

//3. 자바스크립트 객체를 json 전송을 위해 직렬화 (문자열로 변환)
    const jsStr = JSON.stringify(jsObj)
    const xhr = new XMLHttpRequest()        //비동기 통신 객체 생성
    xhr.open('POST', '/api/bookuser')       //4. 전송 보낼 준비 (url과 method)
//Content-Type 헤더를 JSON으로 설정
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(jsStr)     //5. 요청 전송. POST에서는 body와 함께 보낸다.
    xhr.onload = function () {
        const resultObj = JSON.parse(xhr.response);
        if (xhr.status === 200 || xhr.status === 201) {
            if (resultObj.count == 1) {
                clear()     //정상 등록 후 입력 요소 초기화
                document.querySelector('.card-header').innerHTML = '새로운 회원 \'' + id + '\'가입 되었습니다.'
                document.querySelector('.card-header').style.color = 'orange'
            }
        } else {
            console.error('오류1-', xhr.response)
            console.error('오류2-', xhr.status)
            const values = Object.values(resultObj);    //자바스크립트 객체는 key,value 구성. 그 중에 value 만 가져와서 배열로 만든다.
            console.log('오류메세지 : ', values)
            let resultMsg = ''
            values.forEach(msg =>           //배열에 대해
                resultMsg += msg + "<br>")
            document.querySelector('.card-header').innerHTML = resultMsg
            document.querySelector('.card-header').style.color = 'red'

        }

    }

    setTimeout(clear, 60000)
    arrSubject.splice(0, arrSubject.length)      //배열 비우기. splice 요소 삭제(인덱스 start 부터 end 까지)
}
document.querySelector('#save').addEventListener('click', save)

/////////////////////////////////////////////////////////////////////////////////
//실제 프로젝트 할 때는 패스워드, 이메일 변경 1개 필드 변경할 때 - 모달을 이용해서 입력값 받기
const changeOneField = function (e){
    e.stopPropagation();
    const target = e.target
    if (target.tagName!='BUTTON') return
    const field = target.getAttribute("data-num")
    const id = document.querySelector('#id').value      //where 에 필요한 id
    let value = ''
    if(field=='subjects')       //변경하려는 필드가 '관심분야' 일 때
        value = arrSubject.toString()
    else
        value = document.getElementById(field).value    //field 는 변수명이다.

    console.log("field:",field)
    console.log("value:",value)

    const jsObj = {id:id}       //id 첫번째는 프로퍼티이름. 두번째는 변수명
    jsObj[field] = value                //jsObj 객체에 새로운 프로퍼티 field 와 그 값 추가
    console.log("object 중간 확인 : ", jsObj)

    const jsStr = JSON.stringify(jsObj)
    console.log(jsStr)

    const xhr = new XMLHttpRequest()
    xhr.open('PATCH','/api/bookuser/'+field+'/'+id)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.send(jsStr)      //5. 요청 전송. POST에서는  body와 함께 보냅니다.
    xhr.onload=function(){               //요청에 대한 응답받았을 때  onload 이벤트 핸들러 함수
        const resultObj = JSON.parse(xhr.response);
        if(xhr.status === 200 || xhr.status ===201){
            if(resultObj.count===1) {
                document.querySelector('.card-header').innerHTML = '회원 \'' + id + '\'의 \'' + resultObj.field + '\' 수정되었습니다.'
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
}
document.querySelector('.card-body').addEventListener('click',changeOneField)

/////////////////////////////////////////////////////////////////////////////////

//삭제
const deleteId = function () {
    const id = document.querySelector('#id').value
    const xhr = new XMLHttpRequest();
    xhr.open('delete', '/api/bookuser/' + id)
    xhr.send()
    xhr.onload = function () {

        if (xhr.status === 200 || xhr.status === 201) {
            const bookuser = JSON.parse(xhr.response);
        }else {
            console.error('오류1', xhr.status, xhr.response)
            console.error('오류2', xhr.response)
        }
    } //onload end
}
document.querySelector('#delete').addEventListener('click', deleteId)





let mapContainer = document.getElementById('MAP'); // 지도를 표시할 div 

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
let map; 

let tempLatitude; // 위도 임시 저장
let tempLongitude; // 경도 임시 저장

let curMarker; // 현재 위치의 마커 객체

let kickboard = new Array(); // 킥보드 마커 객체를 저장한 배열

const xhr = new XMLHttpRequest();

// data 요청에 대한 응답시 함수
xhr.onreadystatechange = function() {
    let res = xhr.response;

    if (xhr.readyState === 4 && xhr.status === 200){
        let resJson = JSON.parse(res);
        kickboard.splice(0); // 킥보드 객체 초기화

        for (const temp of resJson){
            kickboard.push(new Marker(temp.latitude, temp.longitude, temp.name));
        }
        console.log()
        console.log(kickboard);
    }
}

// 현재 위치를 tmep위도, 경도 변수에 저장
let seqMap = new Promise(function(resolve, reject){
    navigator.geolocation.getCurrentPosition(function(pos){
        tempLatitude = pos.coords.latitude;
        tempLongitude = pos.coords.longitude;
        resolve("success load curPos");
    });
});

// 현재 위치를 중심으로 카카오 지도 생성
seqMap.then((val) => {
    console.log(val);

    let mapOption = { 
        center: new kakao.maps.LatLng(tempLatitude, tempLongitude), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };
    
    map = new kakao.maps.Map(mapContainer, mapOption);
});

// 현재 위치를 나타내는 객체 생성 및 마커 표시
seqMap.then(function(){
    curMarker = new Marker(tempLatitude, tempLongitude, "curPos");
});

// 현재 위치가 변경될 때 마다 마커의 위치를 업데이트 해준다.
seqMap.then(navigator.geolocation.watchPosition(function (pos){
    console.log("run watchPosition");

    tempLatitude = pos.coords.latitude;
    tempLongitude = pos.coords.longitude;

    curMarker.update(tempLatitude, tempLongitude);
}));

// data를 요청
seqMap.then(function(){
    xhr.open("GET", "http://127.0.0.1:8080/data", true);
    xhr.send();
});

seqMap.catch(() => {
    console.log ("exception");
});

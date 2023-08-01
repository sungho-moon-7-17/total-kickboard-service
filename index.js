let mapContainer = document.getElementById('MAP'); // 지도를 표시할 div 

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
let map; 

let tempLatitude;
let tempLongitude;

let curMarker;

let seqMap = new Promise(function(resolve, reject){
    navigator.geolocation.getCurrentPosition(function(pos){
        tempLatitude = pos.coords.latitude;
        tempLongitude = pos.coords.longitude;
        resolve("success load curPos");
    });
});

seqMap.then((val) => {
    window.alert(val);

    let mapOption = { 
        center: new kakao.maps.LatLng(tempLatitude, tempLongitude), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };
    
    map = new kakao.maps.Map(mapContainer, mapOption);
});
seqMap.then(function(){
    curMarker = new Marker(tempLatitude, tempLongitude, "./curPos.png");
});

seqMap.then(navigator.geolocation.watchPosition(function (pos){
    console.log("run watchPosition");

    tempLatitude = pos.coords.latitude;
    tempLongitude = pos.coords.longitude;

    curMarker.update(tempLatitude, tempLongitude);
}));

seqMap.catch(() => {
    console.log ("exception");
});

let mapContainer = document.getElementById('MAP'); // 지도를 표시할 div 

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
let map; 

let curLatitude;
let curLongitude;

let seqMap = new Promise(function(resolve, reject){
    navigator.geolocation.getCurrentPosition(function(pos){
        curLatitude = pos.coords.latitude;
        curLongitude = pos.coords.longitude;
        resolve("success load curPos");
    });
});

seqMap.then((val) => {
    console.log(val);

    let mapOption = { 
        center: new kakao.maps.LatLng(curLatitude, curLongitude), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

    map = new kakao.maps.Map(mapContainer, mapOption);
});
seqMap.then(navigator.geolocation.watchPosition(function (pos){
    console.log("run watchPosition");

    curLatitude = pos.coords.latitude;
    curLongitude = pos.coords.longitude;

    displayCurMarker();
}));

seqMap.catch(() => {
    console.log ("exception");
});


function displayCurMarker(){

    // 마커가 표시될 위치입니다 
    let markerPosition  = new kakao.maps.LatLng(curLatitude, curLongitude); 

    let imgSrc = './curPos.png',
        imgSize = new kakao.maps.Size(30);

    let markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize);

    // 마커를 생성합니다
    let marker = new kakao.maps.Marker({
        position: markerPosition,
        image : markerImg
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
}
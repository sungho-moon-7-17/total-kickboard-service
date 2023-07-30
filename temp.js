export function displayCurMarker(){

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
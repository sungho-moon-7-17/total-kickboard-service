const iconRoute = "./icon/";

class Marker{
    marker;

    name;
    latitude;
    longitude;

    constructor(latitude, longitude, name){
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;

        let markerPos = new kakao.maps.LatLng(latitude, longitude);

        if (name){ // src 인자에 값이 있으면
            let imgSrc = iconRoute + name + "Icon.png",
                imgSize = new kakao.maps.Size(30);
            let markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize);

            this.marker = new kakao.maps.Marker({
                position : markerPos,
                image : markerImg
            });
        }
        else { // src 인자의 값이 없을 때
            this.marker = new kakao.maps.Marker({
                position : markerPos
            });
        }

        this.marker.setMap(map);
    }

    update(latitude, longitude){
        this.latitude = latitude;
        this.longitude = longitude;

        let latlng = new kakao.maps.LatLng(latitude, longitude);

        this.marker.setPosition(latlng);
        console.log(latitude, longitude);
    }
}
class Marker{
    marker;

    latitude;
    longitude;

    constructor(latitude, longitude, src){
        this.latitude = latitude;
        this.longitude = longitude;

        let markerPos = new kakao.maps.LatLng(latitude, longitude);
        let imgSrc = src,
            imgSize = new kakao.maps.Size(30);

        let markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize);

        if (src){
            this.marker = new kakao.maps.Marker({
                position : markerPos,
                image : markerImg
            });
        }
        else {
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
    }
}
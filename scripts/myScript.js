var xhReq = new XMLHttpRequest();
xhReq.open("GET", 'js/mywaypointarray.json', false);
xhReq.send(null);
var mywaypointarrayjsonObject = JSON.parse(xhReq.responseText);

var locations = [
    ['Auburn', '2436 East University Drive, Suite 2203-04, Auburn, AL 36830', '(334) 246-3910', 32.629283, -85.463560, 1],
    ['Dothan', '3702 Ross Clark Circle, Suite 3 Dothan, AL 36303', '(334) 671-1315'],
    ['Mobile', '3662 Dauphin Street, Suite B, Mobile, AL 36608', '(251) 476-8210']
];

locations = mywaypointarrayjsonObject;

var geocoder;
var map;
var bounds = new google.maps.LatLngBounds();

function initialize() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;


    map = new google.maps.Map(document.getElementById("map_canvas"), {
        center: new google.maps.LatLng(32.629283, -85.463560),
        /* regional center point initial view */
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    geocoder = new google.maps.Geocoder();
    for (i = 0; i < locations.length; i++) {
        geocodeAddress(locations, i);
    }
    directionsDisplay.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsDisplay);
    ctionsDisplay.setMap(map);
}
google.maps.event.addDomListener(window, "load", initialize);

function geocodeAddress(locations, i) {
    var title = locations[i][0];
    var address = locations[i][1];
    var url = locations[i][2];
    geocoder.geocode({
        'address': locations[i][1]
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var marker = new google.maps.Marker({
                icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
                map: map,
                position: results[0].geometry.location,
                title: title,
                animation: google.maps.Animation.DROP,
                address: address,
                url: url
            })
            infoWindow(marker, map, title, address, url);
            bounds.extend(marker.getPosition());
            map.fitBounds(bounds);
        } else {
            alert("geocode of " + address + " failed:" + status);
        }
    });
}

function infoWindow(marker, map, title, address, url) {
    google.maps.event.addListener(marker, 'click', function() {
        var html = "<div><h3>" + title + "</h3><p>" + address + "<br></div><a href='" + url + "'>View location</a></p></div>";
        iw = new google.maps.InfoWindow({
            content: html,
            maxWidth: 350
        });
        iw.open(map, marker);
    });
}

function createMarker(results) {
    var marker = new google.maps.Marker({
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
        map: map,
        position: results[0].geometry.location,
        title: title,
        animation: google.maps.Animation.DROP,
        address: address,
        url: url
    })
    bounds.extend(marker.getPosition());
    map.fitBounds(bounds);
    infoWindow(marker, map, title, address, url);
    return marker;
}
/* Detting Directions */
//https://developers.google.com/maps/documentation/javascript/examples/directions-simple
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: '78 River COurt, Crawfordville FL 32327',
        destination: '3702 Ross Clark Circle, Suite 3 Dothan, AL 36303',
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

var locations = [];
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var markers = [];
var csvWptArr;
var geocoder;
var map;
var bounds = new google.maps.LatLngBounds();

function initialize(){
    map = new google.maps.Map(document.getElementById("map_canvas"),
    {
        center: new google.maps.LatLng(30.836582, -83.978781),
        /* regional center point initial view */
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    geocoder = new google.maps.Geocoder();
    for (i = 0; i < locations.length; i++)
    {
        geocodeAddress(locations, i);
    }
}

function geocodeAddress(locations, i){
    /*
    csv format: "title","address","url","phone","email","purpose","hours","about"
    */

    var title = locations[i][0];
    var address = locations[i][1];
    var url = locations[i][2];
    var phone = locations[i][3];
    var email = locations[i][4];
    var purpose = locations[i][5];
    var hours = locations[i][6];
    var about = locations[i][7];
    geocoder.geocode({
        'address': locations[i][1]
    }, function(results, status){
        if (status == google.maps.GeocoderStatus.OK){
            var marker = new google.maps.Marker({
                icon: 'http://maps.google.com/mapfiles/ms/icons/purple.png',
                map: map,
                position: results[0].geometry.location,
                title: title,
                animation: google.maps.Animation.DROP,
                address: address,
                url: url,
                phone: phone,
                email: email,
                purpose: purpose,
                hours: hours,
                about: about,
                label: labels[i % labels.length]
            });
            infoWindow(marker, map, title, address, url, phone, email, purpose, hours, about);
            bounds.extend(marker.getPosition());
            map.fitBounds(bounds);
        }
        else {
            alert("geocode of " + address + " failed:" + status);
        }
    });
}

function infoWindow(marker, map, title, address, url, phone, email, purpose, hours, about) {
    google.maps.event.addListener(marker, 'click', function()
    {
        var html = "<div><h3>Title: " + title + "</h3><p>address: " + address + "<br></div><a href='" + url + "'>weblink</a></p><p>phone: " + phone + "</p><p>email: " + email + "</p><p>purpose: " + purpose + "</p><p>hours: " + hours + "</p><p>about: " + about + "</p></div>";
        iw = new google.maps.InfoWindow(
        {
            content: html,
            maxWidth: 350
        });
        iw.open(map, marker);
    });
}
/* Getting Directions */
// https://developers.google.com/maps/documentation/javascript/examples/directions-simple
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var selectedMode = document.getElementById('mode').value;

    directionsService.route({
        /*
        origin: document.getElementById('selectpoint1').value,
        destination: document.getElementById('selectpoint2').value,
        */
        origin: document.getElementById('selectpoint1text').value,
        destination: document.getElementById('selectpoint2text').value,
        /*travelMode: 'DRIVING',*/
        travelMode: google.maps.TravelMode[selectedMode]/*,
        drivingOptions: {
            departureTime: new Date(Date.now() + N),  // for the time N milliseconds from now.
            trafficModel: 'optimistic'
        }*/
    }, function(response, status){
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        }
        else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function populateDropdownLists() {
    var select1 = document.getElementById("selectpoint1");
    var select2 = document.getElementById("selectpoint2");

    var options = locations;
    for (var i = 0; i < options.length; i++)
    {
        /*
        var opt = options[i][1];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select1.appendChild(el);
        */
        /*
        <option data-tokens="start" data-subtext="title of start waypoint">start point</option>
        <option data-divider="true"></option>
        */

        //select1.appendChild('<option data-tokens="'+options[i][1]+'" data-subtext="'+options[i][1]+'">'+options[i][1]+'</option>';

        $('#selectpoint1').append('<option data-tokens="start'+i+'" data-subtext="title of start waypoint'+i+'">start point'+i+'</option>');

        //select1.selectpicker('refresh');
    }

    for (var i = 0; i < options.length; i++)
    {
        var opt = options[i][1];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select2.appendChild(el);
    }

    select1.selectpicker('refresh');
}

function chartCourse(){
    google.maps.event.addDomListener(window, "load", initialize);
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('right-panel'));


    // myWeatherLayer(); // this function is not working
    calculateAndDisplayRoute(directionsService, directionsDisplay);

    //transit mode
    document.getElementById('mode').addEventListener('change', function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    });
}

function selectTextWaypoint1(wptOpt){
    document.getElementById("selectpoint1text").value = wptOpt.value;
}
function selectTextWaypoint2(wptOpt){
    document.getElementById("selectpoint2text").value = wptOpt.value;
}

function csv2googlepoints(){
    //use the csv data as waypoints
    locations.splice(0, 1); //remove field labels record from array
    initialize();
    populateDropdownLists(); //argument sub pulled from scripts/myScript.js
}
/*
$(document).ready(function(){
    $("#toggleCourseDir").click(function(){
        $("#right-panel").toggle();
    });
});
*/

function toggleCourseDir(x) {
	if (document.getElementById(x).style.display == 'none') {
		document.getElementById(x).style.display = 'block';
	} else {
		document.getElementById(x).style.display = 'none';
	}
}

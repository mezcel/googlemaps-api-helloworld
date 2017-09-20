var locations = [];
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var markers = [];
var csvWptArr;
var geocoder;
var map;


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
    var bounds = new google.maps.LatLngBounds();

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

    var mytokens;
    var options = locations;
    var myFilterVar = $("#wptfilterform input[type='radio']:checked").val();
    console.log("Filter Check:", myFilterVar);
    switch(myFilterVar) {
        case 'All':
            for (var i = 0; i < options.length; i++){
                mytokens = options[i][0] + " " + options[i][1] + " " + options[i][2] + " " + options[i][3] + " " + options[i][4] + " " + options[i][5] + " " + options[i][6] + " " + options[i][7];
                $('#selectpoint1').append('<option data-tokens="'+mytokens+ " " +options[i][1]+'" data-subtext="'+options[i][0]+'">'+options[i][1]+'</option>');
                $("#selectpoint1").selectpicker("refresh");

                $('#selectpoint2').append('<option data-tokens="'+mytokens+ " " +options[i][1]+'" data-subtext="'+options[i][0]+'">'+options[i][1]+'</option>');
                $("#selectpoint2").selectpicker("refresh");

                console.log(options[i][1]);
            }
            break;
        default:
            for (var i = 0; i < options.length; i++){
                if (options[i][1].indexOf(myFilterVar) != -1) {
                    mytokens = options[i][0] + " " + options[i][1] + " " + options[i][2] + " " + options[i][3] + " " + options[i][4] + " " + options[i][5] + " " + options[i][6] + " " + options[i][7];
                    $('#selectpoint1').append('<option data-tokens="'+mytokens+ " " +options[i][1]+'" data-subtext="'+options[i][0]+'">'+options[i][1]+'</option>');
                    $("#selectpoint1").selectpicker("refresh");

                    $('#selectpoint2').append('<option data-tokens="'+mytokens+ " " +options[i][1]+'" data-subtext="'+options[i][0]+'">'+options[i][1]+'</option>');
                    $("#selectpoint2").selectpicker("refresh");
                }
            }
            break;
    }
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

function toggleCourseDir(x) {
	if (document.getElementById(x).style.display == 'none') {
		document.getElementById(x).style.display = 'block';
	} else {
		document.getElementById(x).style.display = 'none';
	}
}

// UNDER_CONSTRUCTION !!!
$(document).ready(function(){
    // The event listener for the file upload (JSON)
    // i took a different approach compared to my CSV input
    // UNDER_CONSTRUCTION !!!
    var myJSONlocation;

    $('#jsonFileUpload').change( function(event) {
        var tmppath = URL.createObjectURL(event.target.files[0]); //temporary file location for path uploading
        $.getJSON(tmppath, function(data) {
            console.log(data, myJSONarr);//output your data to console
            /*
                Scrapy makes the following json format
                Array [ Object, Object, Object, Object, Object, Object, Object, Object, Object, Object ]
            */
        });

        var options = data; // i need an array format optimized for a for loop
        for (var i = 0; i < options.length; i++){
            // populate my dropdown list
        }

    });
});

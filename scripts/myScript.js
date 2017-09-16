var locations;
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var csvWptArr;
//var mywaypointarrayjsonObject = require('scripts/mywaypointarrayjsonObject.json'); //with path
//locations = mywaypointarrayjsonObject;
var geocoder;
var map;
var bounds = new google.maps.LatLngBounds();

function initialize()
{
    map = new google.maps.Map(document.getElementById("map_canvas"),
    {
        center: new google.maps.LatLng(32.629283, -85.463560),
        /* regional center point initial view */
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    geocoder = new google.maps.Geocoder();
    for (i = 0; i < locations.length; i++)
    {
        geocodeAddress(locations, i);
    }
}

function geocodeAddress(locations, i)
{
    var title = locations[i][0];
    var address = locations[i][1];
    var url = locations[i][2];
    geocoder.geocode(
    {
        'address': locations[i][1]
    }, function(results, status)
    {
        if (status == google.maps.GeocoderStatus.OK)
        {
            var marker = new google.maps.Marker(
            {
                icon: 'http://maps.google.com/mapfiles/ms/icons/purple.png',
                map: map,
                position: results[0].geometry.location,
                title: title,
                animation: google.maps.Animation.DROP,
                address: address,
                url: url,
                label: labels[i % labels.length]
            });
            infoWindow(marker, map, title, address, url);
            bounds.extend(marker.getPosition());
            map.fitBounds(bounds);
        }
        else
        {
            alert("geocode of " + address + " failed:" + status);
        }
    });
}

function infoWindow(marker, map, title, address, url)
{
    google.maps.event.addListener(marker, 'click', function()
    {
        var html = "<div><h3>" + title + "</h3><p>" + address + "<br></div><a href='" + url + "'>View location</a></p></div>";
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
function calculateAndDisplayRoute(directionsService, directionsDisplay)
{
    directionsService.route(
    {
        /*
        origin: document.getElementById('selectpoint1').value,
        destination: document.getElementById('selectpoint2').value,
        */
        origin: document.getElementById('selectpoint1text').value,
        destination: document.getElementById('selectpoint2text').value,
        travelMode: 'DRIVING'
    }, function(response, status)
    {
        if (status === 'OK')
        {
            directionsDisplay.setDirections(response);
        }
        else
        {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function populateDropdownLists()
{
    var select1 = document.getElementById("selectpoint1");
    var select2 = document.getElementById("selectpoint2");

    var options = locations;
    for (var i = 0; i < options.length; i++)
    {
        var opt = options[i][1];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select1.appendChild(el);
    }

    for (var i = 0; i < options.length; i++)
    {
        var opt = options[i][1];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select2.appendChild(el);
    }
    document.getElementById('selectpoint1').addEventListener('change', onChangeHandler);
    document.getElementById('selectpoint2').addEventListener('change', onChangeHandler);
}

function chartCourse()
{
    google.maps.event.addDomListener(window, "load", initialize);
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);

    myWeatherLayer();

    calculateAndDisplayRoute(directionsService, directionsDisplay);
    //actionsDisplay.setMap(map);
}

function selectTextWaypoint1(wptOpt){
    document.getElementById("selectpoint1text").value = wptOpt.value;
}
function selectTextWaypoint2(wptOpt){
    document.getElementById("selectpoint2text").value = wptOpt.value;
}

function csv2googlepoints()
{
    //use the csv data as waypoints
    locations.splice(0, 1); //remove field labels record from array
    initialize();
    populateDropdownLists(); //argument sub pulled from scripts/myScript.js

}

function myWeatherLayer(){
    // I dont think google supports weather anymore
    var weatherLayer = new google.maps.weather.WeatherLayer({
      temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
    });
    weatherLayer.setMap(map);

    var cloudLayer = new google.maps.weather.CloudLayer();
    cloudLayer.setMap(map);
}

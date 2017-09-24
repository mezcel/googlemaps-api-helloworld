var locations = [];
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var markers = [];
var csvWptArr;
var geocoder;
var map;


function initialize(){
    map = new google.maps.Map(document.getElementById("map_canvas"),{
        center: new google.maps.LatLng(30.836582, -83.978781),
        /* regional center point initial view */
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    geocoder = new google.maps.Geocoder();

    for (i = 0; i < locations.length; i++){
        // my free google api Key limit is 20 points
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
    google.maps.event.addListener(marker, 'click', function(){
        //this is really hacky... but it get me moveing fowarward with testing
        var html = "<div><h3>Title: " + title + "</h3><p><b>Street Address:</b> " + address + "</p><p><b>Link: </b><a href='"+url+"' title='"+url+"' class='button' target='_blank'>"+url+"</a></p><p><b>phone:</b> " + phone + "</p><p><b>email:</b> " + email + "</p><p><b>purpose:</b> " + purpose + "</p><p><b>hours:</b> " + hours + "</p><p><b>about:</b> " + about + "</p></div>";
        iw = new google.maps.InfoWindow({
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

// UNDER_CONSTRUCTION (json feature) !!!
$(document).ready(function(){
    // The event listener for the file upload (JSON)
    // i took a different approach compared to my CSV input

    var scrapeErrorCatch = function(data, i){

        /*
            this is for the json, but i want to have it resemble the csv and the [var locations] used in path: scripts/myjquerycsv.js
                Array [ Array[8], Array[8], Array[8], Array[8], Array[8], Array[8], Array[8], Array[8], Array[8], Array[8], Array[8]]
                var title = locations[i][0];
                var address = locations[i][1];
                var url = locations[i][2];
                var phone = locations[i][3];
                var email = locations[i][4];
                var purpose = locations[i][5];
                var hours = locations[i][6];
                var about = locations[i][7];
            json is better than csv, but csv is the weakest link, i want to keep the system csv friendly while in testing phase
            csv format: "title","address","url","phone","email","purpose","hours","about"
        */

        // error catch and clean for non string generated address values

        var tempAdrstr = "";

        for(var n=0; n<3; n+=1) {
            if ( (typeof data[i].officeAddress[n] !== 'string') || (data[i].officeAddress[n].length === 0) ) {
                data[i].officeAddress[n] =  " "; // this is for short address
            }
            tempAdrstr = tempAdrstr.replace( /  +/g, ' ');
            tempAdrstr = tempAdrstr.toString();
            tempAdrstr = tempAdrstr + " " + data[i].officeAddress[n];
        }

        /*
            if(typeof Obj.property == "undefined"){
                // Assign value to the property here
                Obj.property = someValue;
            }
        */

        if (typeof data[i].officeAddress[0] !== 'string'){data[i].officeAddress = [];data[i].officeAddress[0].push(" "); console.log("\tfound scrape issue: officeAddress[0]");}
        if (typeof data[i].officeAddress[1] !== 'string'){data[i].officeAddress = [];data[i].officeAddress[1].push(" "); console.log("\tfound scrape issue: officeAddress[1]");}
        if ((typeof data[i].officeAddress[2] !== 'string')||(typeof data[i].officeAddress[2] === undefined)){data[i].officeAddress = [];data[i].officeAddress[2].push(" "); console.log("\tfound scrape issue: officeAddress[2]");}

        if (typeof data[i].officeCity[0] !== 'string'){data[i].officeCity = [];data[i].officeCity.push("n/a"); console.log("\tfound scrape issue: title/officeCity");}
        if (typeof data[i].officePhone[0] !== 'string'){data[i].officePhone = [];data[i].officePhone.push("n/a");console.log("\tfound scrape issue: officePhone");}
        if (typeof data[i].officeWeb[0] !== 'string'){data[i].officeWeb = [];data[i].officeWeb.push("n/a");console.log("\tfound scrape issue: officeWeb");}
        if (typeof data[i].officeEmail[0] !== 'string'){data[i].officeEmail = [];data[i].officeEmail.push("n/a");console.log("\tfound scrape issue: officeEmail");}

        var tempArr = new Array (
            data[i].officeCity[0].toString(),
            tempAdrstr,
            data[i].officeWeb[0].toString(),
            data[i].officePhone[0].toString(),
            data[i].officeEmail[0].toString(),
            "Scrapy did not search for this field/parameter.", // purpose slot
            "Scrapy did not search for this field/parameter.", // hours slot
            "Scrapy did not search for this field/parameter.", // job list bulliten url or "url"
        );

        return tempArr;
    }

    var expressprosScrapyJSONdropdowns = function(data){

        var mytokens;
        var cleanLocations;
        var myFilterVar = $("#wptfilterform input[type='radio']:checked").val();

        console.log("Filter Check:", myFilterVar);
        console.log("# of WPTs: ", data.length);
        locations =[]; //reset clear locations
        // use this if i want to see the length of the object within array: Object.keys(data[0]).length
        switch(myFilterVar) {
            case 'All':
                for (var i = 0; i < data.length; i++){

                    // limit all my point to 20 wpts
                    if (i <= 20) {
                        cleanLocations = scrapeErrorCatch(data, i);// error catch
                        locations.push(cleanLocations); //push an array into an array for my geocode array var locations
                        mytokens = locations[i][0] + " " + locations[i][1] + " " + locations[i][2] + " " + locations[i][3] + " " +locations[i][4] + " " + locations[i][7];

                        $('#selectpoint1').append('<option data-tokens="'+mytokens+'" data-subtext="'+locations[i][0]+'">'+locations[i][1] +'</option>');
                        $("#selectpoint1").selectpicker("refresh");

                        $('#selectpoint2').append('<option data-tokens="'+mytokens+'" data-subtext="'+locations[i][0]+'">'+locations[i][1] +'</option>');
                        $("#selectpoint2").selectpicker("refresh");

                    } else {
                        return;
                    }
                }

                break;

            default:
                for (var i = 0; i < data.length; i++){
                    if (data[i].streetAddress[2].indexOf(myFilterVar) != -1) {
                        // limit all my point to 20 wpts
                        if (i <= 20) {
                            cleanLocations = scrapeErrorCatch(data, i);// error catch
                            locations.push(cleanLocations); //push an array into an array for my geocode
                            mytokens = locations[i][0] + " " + locations[i][1] + " " + locations[i][2] + " " + locations[i][3] + " " +locations[i][4] + " " + locations[i][7];

                            $('#selectpoint1').append('<option data-tokens="'+mytokens+'" data-subtext="'+locations[i][0]+'">'+locations[i][1] +'</option>');
                            $("#selectpoint1").selectpicker("refresh");

                            $('#selectpoint2').append('<option data-tokens="'+mytokens+'" data-subtext="'+locations[i][0]+'">'+locations[i][1] +'</option>');
                            $("#selectpoint2").selectpicker("refresh");

                        } else {
                            return;
                        }
                    }
                }

                break;
        }
    }

    var makeJSONdatacompatable = function(originalData){
        /*
            i made a better scrapper for a different app
            this app can now read in those files
        */
        var newData = [];

        for(var i=0; i<originalData.length; i+=1){
            if(originalData[i].hasOwnProperty('officeAddress')){
                newData.push(originalData[i]);
            }
        }
        return newData;
    }

    $('#jsonFileUpload').change( function(event) {

        var tmppath = URL.createObjectURL(event.target.files[0]); //temporary file location for path uploading

        $.getJSON(tmppath, function(data) {
            console.log("doing the json");
            if (data && data.length > 0){
                console.log("full json object debug: ", data); //general obj debug
                data = makeJSONdatacompatable(data);
                console.log("partial json object debug:", data);
                expressprosScrapyJSONdropdowns(data);
                alert('Imported - ' + data.length + ' - of 20 possible waypoints successfully!\n\nLong Addresses May Not Work Well, But They Will Be Available In Dropdown.');
                initialize(); //populate map with points
                location.href = '#parallaxnav'; //jumps to where id=#parallaxnav is on the html
            }
            else{
                alert('Issues with the json format or the file itself!');
                return;
            }
        });

    });
});

# googlemaps-api-helloworld (with Scrapy)

## My traveling free-wifi stop map: Used for proximity and landmark orienteering... on the road

### Current Dev Stop Point

* Json Input is not implemented yet
* I am running Scrapy in a virtual environment to generate my .CSV file. ``` If you don't use have Scrapy installed, ignore that feature of this Repo ```
* I have not made the json feature yet, the holdup is related to what i am doing with Scrapy
* The JS script is a bit of an eyesore, but it works fine and it is intelligible if you understand Google API.
* * <b>Note</b>: <i>I would love to know how to "group cluster" using street name address. Google API seems to only like LatLong for that feature. I looked into "Reverse Geocode", but that is not doing the trick at the moment either.</i>

### Proprietary Scripts

* [googlemaps-geometry](https://developers.google.com/maps/)
* [bootstrap-select](https://silviomoreto.github.io/bootstrap-select/)
* [jquery-csv](https://github.com/evanplaice/jquery-csv/)
* [Scrapy](https://scrapy.org/)

### Tools/Reffs Used for Continued Development

* [I need this for lat/lon](http://www.latlong.net/convert-address-to-lat-long.html)
* [Googlemaps api clustering](https://developers.google.com/maps/documentation/javascript/marker-clustering)
* [Googlemaps api directions](https://developers.google.com/maps/documentation/javascript/examples/directions-panel)

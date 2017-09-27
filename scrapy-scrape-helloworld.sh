#!/bin/sh

# delete old json records

rm '/home/mezcel/github/googlemaps-api-helloworld/demo-csv-json-scrape/expresspros_Alabama_Demo.json'
rm '/home/mezcel/github/googlemaps-api-helloworld/demo-csv-json-scrape/expresspros_Florida_Demo.json'
rm '/home/mezcel/github/googlemaps-api-helloworld/demo-csv-json-scrape/expresspros_Georgia_Demo.json'
rm '/home/mezcel/github/googlemaps-api-helloworld/demo-csv-json-scrape/stackoverflow_Alabama_Demo.json'
rm '/home/mezcel/github/googlemaps-api-helloworld/demo-csv-json-scrape/stackoverflow_Florida_Demo.json'
rm '/home/mezcel/github/googlemaps-api-helloworld/demo-csv-json-scrape/stackoverflow_Georgia_Demo.json'
rm '/home/mezcel/github/googlemaps-api-helloworld/demo-csv-json-scrape/targetedjobfairs_Fairs_Demo.json'

# launch my virtual environment which has scrapy installed along with my project

cd '/home/mezcel/github/googlemaps-api-helloworld/scrapy_virtualenv_helloworld'
source bin/activate

# launch crawler 1

ls
cd expresspros
scrapy crawl expresspros -a domain='https://workforce.expresspros.com/locations/state/Alabama' -o ../../expresspros_Alabama_Demo.json -t json
scrapy crawl expresspros -a domain='https://workforce.expresspros.com/locations/state/Florida' -o ../../expresspros_Florida_Demo.json -t json
scrapy crawl expresspros -a domain='https://workforce.expresspros.com/locations/state/Georgia' -o ../../expresspros_Georgia_Demo.json -t json

# launch crawler 2

ls
cd ..
ls
cd stackoverflow
scrapy crawl stackoverflow -a domain='https://stackoverflow.com/jobs?sort=p&l=Alabama' -o ../../stackoverflow_Alabama_Demo.json -t json
scrapy crawl stackoverflow -a domain='https://stackoverflow.com/jobs?sort=p&l=Florida' -o ../../stackoverflow_Florida_Demo.json -t json
scrapy crawl stackoverflow -a domain='https://stackoverflow.com/jobs?sort=p&l=Georgia' -o ../../stackoverflow_Georgia_Demo.json -t json

# launch crawler 3

ls
cd ..
ls
cd targetedjobfairs
scrapy crawl targetedjobfairs -o ../../targetedjobfairs_Fairs_Demo.json -t json

ls

# view folder dir containing the latest json scrapes

xdg-open ../..

/usr/bin/firefox -new-window 'file:///home/mezcel/github/googlemaps-api-helloworld/index.html'

# Note that to make this file executable, you must set the eXecutable bit, and for a shell script, the Readable bit must also be set:
# $ chmod a+rx scrapy-scrape-viewer.sh

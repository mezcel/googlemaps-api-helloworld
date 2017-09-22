# Scrape Stackover Jobs with Scrapy

I found this girl/woman after I started using/learning Scrapy. I wish I had her site as a startup guide at the jump. [scrape-stack-overflow-jobs](http://kimberlythegeek.com/scrape-stack-overflow-jobs/)

[Official Scrapy Guide for this Tutorial](https://doc.scrapy.org/en/1.3/intro/tutorial.html)

### Linux Terminal History:

* go to my desired directory

> ```cd '/home/mezcel/github/googlemaps-api-helloworld/scrapy_virtualenv_helloworld'```

* activate my virtual environment

> ```source bin/activate```

* create my new crawler

> ```scrapy startproject stackoverflow```

* make and program ```scrapy_virtualenv_helloworld/stackoverflow/stackoverflow/spiders/stackoverflow_spider.py```
    include ``` FEED_EXPORT_ENCODING = 'utf-8' ``` in ```scrapy_virtualenv_helloworld/stackoverflow/stackoverflow/settings.py``` to aviod errors when using ```strip()```

* run spiders

> ```scrapy crawl stackoverflow -o stackoverflow.json```

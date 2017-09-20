import scrapy

class ExpressprosSpider(scrapy.Spider):
    name = "expresspros"
    allowed_domain = ["https://www.expresspros.com/"]
    start_urls = ["https://workforce.expresspros.com/locations/state/Alabama"]

    # clones the webpage into an html

    def parse(self, response):
        filename = response.url.split("/")[-2] + '.html'
        with open(filename, 'wb') as f:
            f.write(response.body)

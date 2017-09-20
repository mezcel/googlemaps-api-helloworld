import scrapy
from expresspros.items import ExpressprosItem

class ExpressprosSpider(scrapy.Spider):
    name = "expresspros"
    allowed_domain = ["https://www.expresspros.com/"]
    start_urls = ["https://workforce.expresspros.com/locations/state/Alabama"]
    #allowed_domain = ["http://www.greatplantpicks.org"]
    #start_urls = ["http://www.greatplantpicks.org/plantlists/by_plant_type/conifer"]

    # clones the webpage into an html

    #def parse(self, response):
        #clone https://workforce.expresspros.com/locations/state
        #filename = response.url.split("/")[-2] + '.html'

        #clone https://workforce.expresspros.com/locations/state/Alabama
        #filename = response.url.split("/")[-1] + '.html'
        #with open(filename, 'wb') as f:
        #    f.write(response.body)

    # extract selected information into a json file
    #Xpath guide: https://www.w3schools.com/xml/xpath_syntax.asp
    #<div id="contents"><div id="content" class="view">
    def parse(self, response):
         for sel in response.xpath('//div[@class="row location-item"][@style="padding-bottom: 15px;"]'):
            item = ExpressprosItem()
            item['title'] = sel.xpath('h4/text()').extract()
            item['streetAddress'] = sel.xpath('div/div/div[1]/text()').extract()
            item['streetAddress'] = item['streetAddress'] + sel.xpath('div/div/div[2]/text()').extract()
            item['streetAddress'] = item['streetAddress'] + sel.xpath('div/div/div[3]/text()').extract()
            item['phone'] = sel.xpath('div[1]/div[2]/a/@href').extract()
            item['email'] = sel.xpath('div[2]/div[1]/a/@href').extract()
            item['url'] = sel.xpath('div[2]/div[2]/a/@href').extract()


            #
            #
            #item['statezip'] = sel.xpath('div/div/div[2]/text()').extract()
            #item['apartment'] = sel.xpath('div/div/div[1]/text()').extract()



            yield item

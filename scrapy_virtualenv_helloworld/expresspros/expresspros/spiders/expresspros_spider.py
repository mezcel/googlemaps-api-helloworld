import scrapy
from expresspros.items import ExpressprosItem

class ExpressprosSpider(scrapy.Spider):
    name = "expresspros"
    allowed_domain = ["https://www.expresspros.com/"]
    start_urls = ["https://workforce.expresspros.com/locations/state/Alabama"]

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
            item['jobsurl'] = sel.xpath('div[2]/div[3]/a/@href').extract()

            yield item

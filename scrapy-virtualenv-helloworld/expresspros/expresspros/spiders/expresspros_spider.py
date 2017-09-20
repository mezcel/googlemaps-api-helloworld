import scrapy
#from conifers.items import ConifersItem

class ExpressprosSpider(scrapy.Spider):
    name = "expresspros"
    allowed_domain = ["http://www.greatplantpicks.org"]
    start_urls = ["http://www.greatplantpicks.org/plantlists/by_plant_type/conifer"]

    # clones the webpage into an html

     def parse(self, response):
        filename = response.url.split("/")[-2] + '.html'
        with open(filename, 'wb') as f:
            f.write(response.body)

    # extract selected information into a json file
    # def parse(self, response):
    #    for sel in response.xpath('//tbody/tr'):
    #        item = ConifersItem()
    #        item['name'] = sel.xpath('td[@class="common-name"]/a/text()').extract()
    #        item['genus'] = sel.xpath('td[@class="plantname"]/a/span[@class="genus"]/text()').extract()
    #        item['species'] = sel.xpath('td[@class="plantname"]/a/span[@class="species"]/text()').extract()
    #        yield item

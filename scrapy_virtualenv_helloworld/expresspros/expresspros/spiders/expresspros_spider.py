import scrapy
from expresspros.items import ExpressprosItem

class ExpressprosSpider(scrapy.Spider):
    name = "expresspros"
    # allowed_domain = ["https://www.expresspros.com/"]
    # start_urls = ["https://workforce.expresspros.com/locations/state/Alabama"]

    def __init__(self, domain='', *args,**kwargs):
        '''
            Spider arguments are passed while running the crawl command using the -a option.
            You would use *args when you're not sure how many arguments might be passed to your function
            Similarly, **kwargs allows you to handle named arguments that you have not defined in advance

            For example:
            scrapy crawl myspider -a category='mycategory' -a domain='example.com'
            scrapy crawl expresspros -a domain='https://workforce.expresspros.com/locations/state/Alabama' -o myjsontest.json

            # https://stackoverflow.com/questions/15611605/how-to-pass-a-user-defined-argument-in-scrapy-spider
            # https://doc.scrapy.org/en/latest/topics/spiders.html#spider-arguments
        '''
        super(ExpressprosSpider, self).__init__(*args, **kwargs)
        self.start_urls = [domain]


    def parse(self, response):
        '''
            using the items var, defined in scrapy_virtualenv_helloworld/expresspros/expresspros/items.py,
            i will create a record with the desired fields

            typing -o myjsontest.json or -o myjsontest.json -t json will output results to file
            typing -o mycsvtest.json or -o mycsvtest.csv -t csv will output results to file

        '''
        for sel in response.xpath('//div[@class="row location-item"][@style="padding-bottom: 15px;"]'):
            item = ExpressprosItem()
            item['officeCity'] = sel.xpath('h4/text()').extract()

            item['officeAddress'] = sel.xpath('div/div/div[1]/text()').extract()
            item['officeAddress'] = item['officeAddress'] + sel.xpath('div/div/div[2]/text()').extract()
            item['officeAddress'] = item['officeAddress'] + sel.xpath('div/div/div[3]/text()').extract()

            item['officePhone'] = sel.xpath('div[1]/div[2]/a/@href').extract()

            item['officeEmail'] = sel.xpath('div[2]/div[1]/a/@href').extract()
            #item['officeWeb'] = sel.xpath('div[2]/div[2]/a/@href').extract()
            item['officeWeb'] = sel.xpath('div[2]/div[3]/a/@href').extract()

            yield item

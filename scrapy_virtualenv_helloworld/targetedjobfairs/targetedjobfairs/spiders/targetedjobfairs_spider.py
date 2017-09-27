import scrapy

class TargetedJobFairsSpider(scrapy.Spider):
    name = 'targetedjobfairs'
    allowed_domain = ["http://www.targetedjobfairs.com/"]
    start_urls = [ 'http://www.targetedjobfairs.com/' ]
    def parse(self, response):
        for result in response.css('tbody tr'):
            tmpUrl = result.xpath('td[4]/a/@href').extract_first()
            tmpUrl = response.urljoin(tmpUrl)
            yield response.follow(tmpUrl, self.parse_fair)

    # scrape the page the link led me to
    def parse_fair(self, response):
        # //*[@id="main"]/div/div/main/div/div/div[2]
        #for sel in response.css('div.pricing-table-wrap'):
        for sel in response.xpath('//*[@id="main"]/div/div/main/div/div/div[2]'):
            # strip and concat my address array
            tempAddrArr = [i.strip() for i in sel.xpath('div[1]/div/ul/li[5]/text()').extract()]
            tempAddrArr = ", ".join(tempAddrArr)
            yield {
                'title': sel.xpath('div[1]/div/ul/li[1]/div/text()').extract_first(), #//*[@id="main"]/div/div/main/div/div/div[2]/div[1]/div/ul/li[1]/div
                'date': sel.xpath('div[1]/div/ul/li[2]/text()').extract_first(), #//*[@id="main"]/div/div/main/div/div/div[2]/div[1]/div/ul/li[2]
                'company': sel.xpath('div[1]/div/ul/li[4]/text()').extract_first(), #//*[@id="main"]/div/div/main/div/div/div[2]/div[1]/div/ul/li[4]
                'address': tempAddrArr,
                'participants': sel.xpath('div[2]/div/ul/li/text()').extract(),
                'url': response.request.url,
            }

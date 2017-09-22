import scrapy

# inspired by http://kimberlythegeek.com/scrape-stack-overflow-jobs/
# [Scrapy Tutorial](https://doc.scrapy.org/en/1.3/intro/tutorial.html)
class StackOverflowSpider(scrapy.Spider):
    name = 'stackoverflow'
    start_urls = [
        'https://stackoverflow.com/jobs?sort=p&l=Florida'
    ]
    # https://stackoverflow.com/jobs?sort=p&l=Florida&d=20&u=Miles&c=usd&mxs=MidLevel&j=permanent&j=contract&j=internship&b=HighResponse

    '''
        Copy Outer html from the inspect feature to see the class attr
        <a class="post-tag job-link no-tag-menu" href="/jobs/developer-jobs-using-java">java</a>
    '''

    def parse(self, response):
        for result in response.css('.-job-summary'):
            yield {
                'job': result.css('a.job-link::text').extract_first().strip(),
                'title': result.css('a.job-link::attr(title)').extract_first(),
                'link': result.css('a.job-link::attr(href)').extract_first(),

                'company': result.css('div.-name::text').extract_first().strip(),
                'location': result.css('div.-location::text').extract_first().replace('- \r\n', '').strip(),
                'posted': result.css('p.-posted-date.g-col::text').extract_first().strip(),
                'skills': result.css('p > a.post-tag.job-link.no-tag-menu::text').extract()
            }
        # follow pagination links
        '''
        next_page = response.css('.pagination .test-pagination-next::attr(href)').extract_first()
        if next_page is not None:
            next_page = response.urljoin(next_page)
            yield scrapy.Request(next_page, callback=self.parse)
        '''

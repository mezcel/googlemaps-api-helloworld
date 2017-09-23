import scrapy

# inspired by http://kimberlythegeek.com/scrape-stack-overflow-jobs/
# [Scrapy Tutorial](https://doc.scrapy.org/en/1.3/intro/tutorial.html)
class StackOverflowSpider(scrapy.Spider):
    name = 'stackoverflow'
    allowed_domain = ["https://stackoverflow.com/"]
    start_urls = [
        'https://stackoverflow.com/jobs?sort=p&l=Florida',
        'https://stackoverflow.com/jobs?sort=p&l=Georgia'
    ]
    # https://stackoverflow.com/jobs?sort=p&l=Florida
    # &ms=Junior&mxs=MidLevel
    # https://stackoverflow.com/jobs?sort=p&l=Florida&d=20&u=Miles&c=usd&mxs=MidLevel&j=permanent&j=contract&j=internship&b=HighResponse

    '''
        Copy Outer html from the inspect feature to see the class attr
        Example: <a class="post-tag job-link no-tag-menu" href="/jobs/developer-jobs-using-java">java</a>
    '''
    def parse(self, response):
        for result in response.css('div.main div.-job-summary'):
            yield {
                'job': result.css('a.job-link::text').extract_first(),
                'title': result.css('a.job-link::attr(title)').extract_first(),
                'url': result.css('a.job-link::attr(href)').extract_first(),
                'company': result.css('div.-name::text').extract_first().strip(),
                'location': result.css('div.-location::text').extract_first().replace('- \r\n', '').strip(),
                'posted': result.css('p.-posted-date.g-col::text').extract_first().strip(),
                'skills': result.css('p > a.post-tag.job-link.no-tag-menu::text').extract()
            }

        '''
            Sep 2017 the pagination links
            i fealt it relevant to scrap just those 3 following links
        '''
        next_page = response.css('div.pagination > a.job-link::attr(href)').extract()
        page_i_want = 'https://stackoverflow.com/jobs?sort=p&l=Florida&pg=2'
        mycounter = 1
        if next_page[mycounter + 1]:
            mycounter = mycounter + 1
            next_page = response.urljoin(next_page[mycounter])
            yield scrapy.Request(next_page, self.parse)

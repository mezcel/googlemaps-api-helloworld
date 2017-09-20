# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class ExpressprosItem(scrapy.Item):
    # define the fields for your item here like:
    title = scrapy.Field()
    streetAddress = scrapy.Field()
    phone = scrapy.Field()
    url = scrapy.Field()
    email = scrapy.Field()
    jobsurl = scrapy.Field()
    
    pass

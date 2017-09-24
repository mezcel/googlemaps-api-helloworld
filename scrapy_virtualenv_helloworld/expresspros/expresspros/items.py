# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class ExpressprosItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    officeCity = scrapy.Field()
    officeAddress = scrapy.Field()
    officePhone = scrapy.Field()
    officeWeb = scrapy.Field()
    officeEmail = scrapy.Field()
    joboffersWeb = scrapy.Field()

    pass

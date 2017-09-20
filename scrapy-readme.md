# scrapy-readme

###### Official Instruction Guide:

* [Scrapy](https://scrapy.org/)
* [install](https://doc.scrapy.org/en/latest/intro/install.html)
* [virtualenv](https://doc.scrapy.org/en/latest/intro/install.html#intro-using-virtualenv)

----

###### My Cheatsheet Guide:

#### Linux Terminal (install and setup):

Lynux typically already has python, but its worth checking/confirming if you have pip

> ``` user@computername ~ $ ls /usr/bin | grep pip ```

> pip will be used to install a virtual environment, named virtualenv

 install virtualenv
> ```user@computername ~ $ sudo pip install virtualenv```

> ```user@computername ~ $ pip install --upgrade pip```

 install Scrapy dependencies

> ``` user@computername ~ $ sudo apt-get install python-dev python-pip libxml2-dev libxslt1-dev zlib1g-dev libffi-dev libssl-dev ```

install Scrapy in custom dedicated folder

Note: ```myscrappydev``` is a name i chose

> ``` user@computername ~ $ mkdir myscrapydev```

> ``` user@computername ~ $ virtualenv myscrapydev```

> ``` user@computername ~ $ cd myscrapydev```

> ``` user@computername ~/myscrapydev $ source bin/activate```

> ``` (myscrapydev) mezcel@mezcel-linux64mint ~/myscrapydev $ pip install scrapy```

> ``` (myscrapydev)  user@computername ~/myscrapydev $ scrapy```

#### Linux Terminal (create spider and run):

Create new repo in the virtual environment

``` (myscrapydev)  user@computername ~/myscrapydev $ scrapy startproject [my_crawler_name] ``` In this git my project is expresspros

Open directory in a text editor, I like to use Atom

``` (myscrapydev)  user@computername ~/myscrapydev $ scrapy atom ```

Create file ``` [my_crawler_name]/[myspider_name].py ``` similar to what i have in git. In this git, it is ``` expresspros/spiders/expresspros_spider.py```

Edit file ``` expresspros/items.py ``` similar to what i have in git

Run my crawler

``` (myscrapydev)  user@computername ~/myscrapydev $ cd [where_ever_i_stored_it] ```

```(myscrapydev)  user@computername ~/myscrapydev/[where_ever_i_stored_it] $ scrapy crawl expresspros -o file.csv -t csv```

or

```(myscrapydev)  user@computername ~/myscrapydev/[where_ever_i_stored_it] $ scrapy crawl expresspros -o file.json -t json```

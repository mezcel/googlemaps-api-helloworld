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

``` (myscrapydev)  user@computername ~/myscrapydev $ scrapy startproject conifers ```

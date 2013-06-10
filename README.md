easyquick
==============

A quick and easy web server stub.

Installation
------------------

	npm install easyquick -g
	
Run
------------------

	cd /path/to/my/sources
	easyquick

Starting parameters
------------------

	p - a port different from 80
	www - a static assets path different from current directory
	s - set a service method script, e.g. --s=servicedemo
	u - a service url prefix different from 'service' (http://localhost/service/demo)

To get an example for services copy servicedemo.js to your runtime working directory.

Coming up
------------------

- integration of data handling
- supporting templates

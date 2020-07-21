# Palpitator

[![GitHub version](https://badge.fury.io/gh/SleepingInsomniac%2Fpalpitator.svg)](https://badge.fury.io/gh/SleepingInsomniac%2Fpalpitator)

## Cloud based music player

* Ruby >= 2.2
* OSX / Linux

<img src="http://sleepinginsomniac.github.io/palpitator/images/palpitator.png" alt="Palpitator" width="300">

## Running in development

### To build the song library

* Make sure [taglib](https://github.com/robinst/taglib-ruby) is installed on your machine
  * Ubuntu: `sudo apt-get install libtag1-dev`
  * Fedora/RHEL: `sudo yum install taglib-devel`
  * Brew: `brew install taglib`
  * MacPorts: `sudo port install taglib`
* Set the audio root in config/config.yml
* Start delayed job: `rake jobs:work`
* Run the rails console `rails c`
* In the console run `app.patch '/library/update'`

### To start the server run

* Install Gems: `bundle install`
* Create and migrate the database: `rake:db migrate`
* Install js dependencies: `npm install`
* Build the front end: `gulp build` (You may need to install gulp globally first `npm i gulp -g`)
* Start the local server `rails s`
* visit the specified url in your browser

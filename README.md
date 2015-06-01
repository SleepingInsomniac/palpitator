Pulpitator
====

Just a browser based music player

* Ruby version 2.2.2

####Setup:
```bash
git clone git@github.com:SleepingInsomniac/pulpitator.git
bundle install
rake db:create
rake db:migrate
```
* Edit the audio_root in config/config.yml
* Start the server with `rails s`
* Update the music library with `curl -X PATCH localhost:3000/library/update`

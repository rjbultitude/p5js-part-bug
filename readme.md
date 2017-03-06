#P5 JS Part Bug

##Introduction 
Whilst working on a project using [P5](https://p5js.org/) and [P5 Sound](https://p5js.org/reference/#/libraries/p5.sound) I encountered some problems when using Parts to playback sequences of notes. This repo is a stripped back version of that application so that contributors to P5 can replicate the problem. 

##Detail
The app uses a Common JS pattern and [Browserify](http://browserify.org/) to manage various modules. [Postal](https://github.com/postaljs) is used to communicate between modules using the PubSub pattern. 

When 'play' is clicked the entry module (_form_) calls the _audio_ module, creates an instance of *P5* and *P5 Part* and then plays the melody. So far so good. However, the problem occurs on each subsequent play - the Part plays very, very slowly. Sometimes it plays so slowly that it seems not to be playing at all.

I believe the source of the issue is something to do with the *Metro* class that the Part class uses, however this is just a hunch. 

##Setup
To get started run `npm install` and then `gulp`.
As the app loads an MP3 file you'll need to run it on a local server.

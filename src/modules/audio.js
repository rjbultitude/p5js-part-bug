'use strict';
//var P5 = require('../libs/P5');
//require('../libs/P5.sound');
var P5 = require('P5');
require('P5/lib/addons/P5.sound');
var postal = require('postal');
var channel = postal.channel();

module.exports = function() {
  var audioSupported = true;
  var isPlaying = false;
  //precipitation / drops
  var dropSound;
  var precipArpPart = null;
  var newPhrase = null;
  var myP5 = null;

  function killCurrentSounds() {
    precipArpPart.stop();
    isPlaying = false;
    channel.publish('allStopped', 'allStopped');
  }

  function makeDropSound(time, playbackRate) {
    dropSound.rate(playbackRate);
    dropSound.play(time, playbackRate);
  }

  function theSketch(sketch) {

    sketch.preload = function() {
      dropSound = sketch.loadSound('/audio/drop.mp3');
    };

    sketch.setup = function setup() {
      var myCanvas = sketch.createCanvas(10, 10);
      myCanvas.parent('container');

      sketch.frameRate(50);
      //precipArpPart.addPhrase('precipDrops', makeDropSound, [1,1,2]);
      precipArpPart.addPhrase(newPhrase);
      precipArpPart.setBPM(80);
      precipArpPart.loop();
      console.log('precipArpPart', precipArpPart);
      isPlaying = true;
      channel.publish('playing', audioSupported);
    };

  }

	// main app init
	function init() {
        myP5 = new P5(theSketch);
        newPhrase = new P5.Phrase('precipDrops', makeDropSound, [1,1,2]);
        precipArpPart = new P5.Part();
	}

  init();

  channel.subscribe('stop', function() {
    killCurrentSounds();
  });
};

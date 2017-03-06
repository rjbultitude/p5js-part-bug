'use strict';

var postal = require('postal');
var channel = postal.channel();
var audioVisual = require('./audio');

module.exports = function() {
	//Vars
	var userLocBtnEl = document.getElementById('use-location-btn');
	var isPlaying = false;

  function updateApp() {
	channel.publish('userUpdate', 'test');
  }

  function setStartState() {
    channel.publish('stop', 'stopped');
  }

  function setStopState() {
    isPlaying = true;
    userLocBtnEl.innerHTML = 'Stop orchestra';
  }

  function userLocationSubmit(e) {
    e.preventDefault();
    if (isPlaying) {
      setStartState();
    } else {
      updateApp();
    }
  }

  userLocBtnEl.addEventListener('click', userLocationSubmit, false);

  channel.subscribe('playing', function(audioSupported){
    if (audioSupported === false) {
      console.error('No Audio API :[');
    }
    setStopState();
  });

  channel.subscribe('allStopped', function() {
    isPlaying = false;
    userLocBtnEl.innerHTML = 'Play';
  });

  channel.subscribe('userUpdate', function(mainData) {
    audioVisual(mainData);
  });
};

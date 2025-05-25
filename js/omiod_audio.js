// WebAudio
// main
// "use strict";

function omiodAudio(){
	var sSources = [];
	var _ready = false;
	
	this.actx;
	this.bufferLoader;

	this.makeSound = function (i,pitch){
		if ( _ready ) {
			var source = this.actx.createBufferSource();
			source.buffer = sSources[i];
			source.connect(this.actx.destination);
			source.playbackRate.value = pitch;
			source.start(0);
		}
	};
	
	this.soundsReady = function (bufferList) {
		for ( var i = 0 ; i < bufferList.length ; i ++ ) {
			sSources[i] = bufferList[i];
		}
		_ready = true;
	}				
	
}

// WebAudio
// buffer loader
function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          console.error('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    console.error('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}

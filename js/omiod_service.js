// active tab
// "use strict";

var hidden, visibilityChange;
var isHidden = false;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
  hidden = "mozHidden";
  visibilityChange = "mozvisibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

function handleVisibilityChange() {
  if (document[hidden]) {
	//console.log("hidden");
	isHidden = true;
    document.getElementById('audioloop').pause();
  } else {
	//console.log("showed");
	isHidden = false;
	if (gameglobals.gamestatus==1) {
		document.getElementById('audioloop').play();
	}
  }
}

// Handle page visibility change   
document.addEventListener(visibilityChange, handleVisibilityChange, false);

function html(id,txt) {
	var o = document.getElementById(id);
	o.innerHTML = txt;
}

// events / dom

function bind(id,callback){
	var o = document.getElementById(id);
	o.addEventListener( 'click', callback, false );
}

function show(id) {
	var o = document.getElementById(id);
	o.style.display='block';
}

function hide(id) {
	var o = document.getElementById(id);
	o.style.display='none';
}

// ThreeJS Objects size

function calculateDimensions(_object) {

	var absoluteMinX = 0, absoluteMaxX = 0, absoluteMinY = 0, absoluteMaxY = 0, absoluteMinZ = 0, absoluteMaxZ = 0;

	for (var i = 0; i < _object.children.length; i++) {
		_object.children[i].geometry.computeBoundingBox();
		absoluteMinX = Math.min(absoluteMinX,_object.children[i].geometry.boundingBox.min.x + _object.children[i].position.x);
		absoluteMaxX = Math.max(absoluteMaxX,_object.children[i].geometry.boundingBox.max.x + _object.children[i].position.x);
		absoluteMinY = Math.min(absoluteMinY,_object.children[i].geometry.boundingBox.min.y + _object.children[i].position.y);
		absoluteMaxY = Math.max(absoluteMaxY,_object.children[i].geometry.boundingBox.max.y + _object.children[i].position.y);
		absoluteMinZ = Math.min(absoluteMinZ,_object.children[i].geometry.boundingBox.min.z + _object.children[i].position.z);
		absoluteMaxZ = Math.max(absoluteMaxZ,_object.children[i].geometry.boundingBox.max.z + _object.children[i].position.z);
	}

	_object.depth = (absoluteMaxX - absoluteMinX) * _object.scale.x;
	_object.height = (absoluteMaxY - absoluteMinY) * _object.scale.y;
	_object.width = (absoluteMaxZ - absoluteMinZ) * _object.scale.z;

	if (_object.originalDepth === undefined) _object.originalDepth = _object.depth;
	if (_object.originalHeight === undefined) _object.originalHeight = _object.height;
	if (_object.originalWidth === undefined) _object.originalWidth = _object.width;

	return [_object.depth,_object.height,_object.width];

}	
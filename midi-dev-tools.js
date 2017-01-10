var midi, data;
var elementMouseIsOver = document.childNodes[0];

var fontSizeManipulater = {
  increment: function() {
    updateFontSize(1);
  },
  decrement: function() {
    updateFontSize(-1);
  }
}

var fontWeightManipulater = {
  increment: function() {
    updateFontWeight(100);
  },
  decrement: function() {
    updateFontWeight(-100);
  }
}

var manipulation = fontSizeManipulater;

if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess({
      sysex: false
  }).then(onMIDISuccess, onMIDIFailure);
} else {
  alert("No MIDI support in your browser.");
}

function onMIDISuccess(midiAccess) {
  midi = midiAccess;

  var inputs = midi.inputs.values();
  for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
      input.value.onmidimessage = onMIDIMessage;
  }
}

function onMIDIFailure(error) {
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}

function onMIDIMessage(message) {
  data = message.data;
  console.log(data)
  if( data[0] == "144" && data[1] == "1" ) {
    manipulation = fontSizeManipulater;
  }
  if( data[0] == "144" && data[1] == "2" ) {
    manipulation = fontWeightManipulater;
  }
  if( data[0] == "176" && data[1] == "57" ) {
    var value = data[2] * 2;
    updateColor('red', value);
  }
  if( data[0] == "176" && data[1] == "59" ) {
    var value = data[2] * 2;
    updateColor('green', value);
  }
  if( data[0] == "176" && data[1] == "63" ) {
    var value = data[2] * 2;
    updateColor('blue', value);
  }

  if( data[0] == "176" && data[1] == "60" ) {
    var value = data[2] * 2;
    updateBackgroundColor('red', value);
  }
  if( data[0] == "176" && data[1] == "64" ) {
    var value = data[2] * 2;
    updateBackgroundColor('green', value);
  }
  if( data[0] == "176" && data[1] == "61" ) {
    var value = data[2] * 2;
    updateBackgroundColor('blue', value);
  }

  if( data[0] == "176" && data[1] == "48" ) {
    if( data[2] == "1" ) {
      manipulation.increment(data);
    } else {
      manipulation.decrement(data);
    }
  }
}

document.onmousemove = function(e) {
  var x = event.clientX, y = event.clientY
  elementMouseIsOver = document.elementFromPoint(x, y);
}

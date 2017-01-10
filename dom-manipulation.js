function getFontSizeInPx() {
  var fontSize = window.getComputedStyle(elementMouseIsOver).fontSize
  return parseInt( fontSize.replace('px', '') );
}

function setFontSizeInPx(fontSize) {
  elementMouseIsOver.style.fontSize = fontSize + "px"
}

function updateFontSize(amount) {
  setFontSizeInPx( getFontSizeInPx() + amount )
}

function getWidthInPx() {
  var width = window.getComputedStyle(elementMouseIsOver).width
  return parseInt( width.replace('px', '') );
}

function setWidthInPx(width) {
  elementMouseIsOver.style.width = width + "px"
}

function updateWidth(amount) {
  setWidthInPx( getWidthInPx() + amount )
}

function getHeightInPx() {
  var height = window.getComputedStyle(elementMouseIsOver).height
  return parseInt( height.replace('px', '') );
}

function setHeightInPx(height) {
  elementMouseIsOver.style.height = height + "px"
}

function updateHeight(amount) {
  setHeightInPx( getHeightInPx() + amount )
}


function updateFontWeight(amount) {
  var fontWeight = parseInt( elementMouseIsOver.style.fontWeight )
  if( fontWeight.toString() == NaN.toString() || fontWeight == "" ) {
    fontWeight = 400; //normal
  }
  elementMouseIsOver.style.fontWeight = fontWeight + amount;
}

function updateColor(rgbKey, value) {
  var currentColor = elementMouseIsOver.style.color || "rgb(0,0,0)"
  var map = rgbMap(currentColor, rgbKey, value);
  var newColor = "rgb(" + map['red'] + "," + map['green'] + "," + map['blue'] + ")"

  elementMouseIsOver.style.color = newColor;
}

function updateBackgroundColor(rgbKey, value) {
  var currentColor = elementMouseIsOver.style.background || "rgb(255,255,255)"
  var map = rgbMap(currentColor, rgbKey, value);
  var newColor = "rgb(" + map['red'] + "," + map['green'] + "," + map['blue'] + ")"

  elementMouseIsOver.style.background = newColor;
}

function rgbArray(textValue) {
  // "rgb(0,0,0)"
  var noPrefix = textValue.substring("rgb(".length, textValue.length);
  var noPostfix = noPrefix.substring(0, noPrefix.length - 1)

  return eval("[" + noPostfix + "]");
}

function rgbMap(textValue, updateKey, updateValue) {
  // "rgb(0,0,0)"
  var noPrefix = textValue.substring("rgb(".length, textValue.length);
  var noPostfix = noPrefix.substring(0, noPrefix.length - 1)
  var array = eval("[" + noPostfix + "]");
  var result = {'red': array[0], 'green': array[1], 'blue': array[2] }
  result[updateKey] = updateValue
  return result
}

/* resistor.js */

/*
  electronic resistors have colored bands where each color represents a numerical number
  Electrical engineers can read the colors and
  determine the resistance value in Ohms

  see this resistor calculator for help
   http://bit.ly/2NjS274
*/

function getColorValue(color) {
  const colorCodes = {
    black: 0,
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 5,
    blue: 6,
    violet: 7,
    grey: 8,
    white: 9,
  };
  return colorCodes[color];
}

/**
 * Returns the number of the multiplier
 * @param {string} color - the color of the multiplier band
 * @returns {number} - the multiplier number
 */
function getMultiplierValue(color) {
  const multiplierCodes = {
    black: 1,
    brown: 10,
    red: 100,
    orange: 1000,
    yellow: 10000,
    green: 100000,
    blue: 1000000,
    violet: 10000000,
    grey: 100000000,
    white: 1000000000,
    gold: 0.1,
    silver: 0.01,
  };
  return multiplierCodes[color];
}

/**
 * Returns the value of the first 3 bands of the resistor colors
 * @param {object} bands - an object with 2 keys
 * @param {string} bands.color1 - the first color
 * @param {string} bands.color2 - the second color
 * @param {string} bands.multiplier - the multiplier color
 * @returns {number} - representing the value of the first 3 bands of the resistor
 */
function getThreeBandValue(bands) {
  const tens = getColorValue(bands.color1);
  const ones = getColorValue(bands.color2);
  const multiplier = getMultiplierValue(bands.multiplier);
  let value = (tens * 10 + ones) * multiplier;
  if (value < 1) {
    value = +value.toFixed(2);
  } else if (value < 10) {
    value = +value.toFixed(1);
  }
  return value;
}

/**
 * Returns a string representation of the value with metric notation
 * @param {number} val - number representing the value of the resistor
 * @returns {string} - a string representation of the numeric value with metric notation
 */
function formatNumber(val) {
  const re = new RegExp('.0$');
  if (val >= 1000000000) {
    return `${(val / 1000000000).toFixed(1).replace(re, '')}G`;
  }
  if (val >= 1000000) {
    return `${(val / 1000000).toFixed(1).replace(re, '')}M`;
  }
  if (val >= 1000) {
    return `${(val / 1000).toFixed(1).replace(re, '')}k`;
  }
  if (val < 1) {
    return `${val.toFixed(2).replace(re, '')}`;
  }
  return val.toString();
}

/**
 * Returns the tolerance of the resistor according to its color value
 * @param {string} color - the color of the tolerance band
 * @returns {string} - the tolerance value in percent using the ± symbol
 */
function getTolerance(color) {
  const toleranceCodes = {
    brown: '±1%',
    red: '±2%',
    green: '±0.5%',
    blue: '±0.25%',
    violet: '±0.1%',
    grey: '±0.05%',
    gold: '±5%',
    silver: '±10%',
  };
  return toleranceCodes[color];
}

/**
 * Returns a string representation of the resistor value and tolerance
 * @param {object} bands - the object with the 4 bands
 * @param {string} bands.color1 - the first color
 * @param {string} bands.color2 - the second color
 * @param {string} bands.multiplier - the multiplier color
 * @param {string} bands.tolerance - the tolerance color
 * @returns {string} - a string representation of the resistor value and tolerance
 */
function getResistorOhms(bands) {
  const val = getThreeBandValue(bands);
  const format = formatNumber(val);
  const tolerance = getTolerance(bands.tolerance);
  return `Resistor value: ${format} Ohms ${tolerance}`;
}

export { getResistorOhms };

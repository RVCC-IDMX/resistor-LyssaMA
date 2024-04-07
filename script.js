// Mapping of colors to digits for 4-band and 5-band resistors
const COLOR_TO_DIGIT = {
    "black": 0, "brown": 1, "red": 2, "orange": 3, "yellow": 4,
    "green": 5, "blue": 6, "violet": 7, "gray": 8, "white": 9
};

// Mapping of multipliers for 4-band and 5-band resistors
const MULTIPLIERS = {
    "black": 1, "brown": 10, "red": 100, "orange": 1000, "yellow": 10000,
    "green": 100000, "blue": 1000000, "violet": 10000000, "gray": 100000000, "white": 1000000000,
    "gold": 0.1, "silver": 0.01
};

// Tolerance codes to percentage
const TOLERANCE_TO_PERCENT = {
    "brown": 1, "red": 2, "green": 0.5, "blue": 0.25, "violet": 0.1, "gray": 0.05, "gold": 5, "silver": 10
};

// Preferred resistor values from E12 series
const PREFERRED_VALUES = [
    10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82,
];

function calculateResistor() {
    const resistance = parseFloat(document.getElementById("resistance").value);
    const tolerance = parseFloat(document.getElementById("tolerance").value);

    try {
        validateResistorInputs(resistance, tolerance);
        const bands = calculateResistorBands(resistance, tolerance);
        const isPreferred = checkPreferredValue(resistance);

        const resultElement = document.getElementById("result");
        resultElement.innerHTML = `
            <p>Resistor Color Bands:</p>
            <p>1st Band: ${bands[0]}</p>
            <p>2nd Band: ${bands[1]}</p>
            <p>3rd Band: ${bands[2]}</p>
            <p>4th Band: ${bands[3]}</p>
            ${isPreferred ? '<p style="color: green;">This resistor value is a preferred value.</p>' : ''}
        `;
    } catch (error) {
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function validateResistorInputs(resistance, tolerance) {
    if (isNaN(resistance) || resistance <= 0) {
        throw new Error("Resistance must be a positive number.");
    }

    if (isNaN(tolerance) || tolerance < 0 || tolerance > 100) {
        throw new Error("Tolerance must be a number between 0 and 100.");
    }
}

function calculateResistorBands(resistance, tolerance) {
    const firstDigit = parseInt(resistance.toString()[0]);
    const secondDigit = parseInt(resistance.toString()[1]);
    const multiplier = 10 ** (resistance.toString().length - 2);

    let firstBandColor = Object.keys(COLOR_TO_DIGIT).find(key => COLOR_TO_DIGIT[key] === firstDigit);
    let secondBandColor = Object.keys(COLOR_TO_DIGIT).find(key => COLOR_TO_DIGIT[key] === secondDigit);
    let multiplierBandColor = Object.keys(MULTIPLIERS).find(key => MULTIPLIERS[key] === multiplier);
    let toleranceBandColor = Object.keys(TOLERANCE_TO_PERCENT).find(key => TOLERANCE_TO_PERCENT[key] === tolerance);

    return [firstBandColor, secondBandColor, multiplierBandColor, toleranceBandColor];
}

function checkPreferredValue(resistance) {
    // Check if the given resistance is a preferred value
    return PREFERRED_VALUES.includes(Math.round(resistance));
}

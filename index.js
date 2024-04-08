import { getResistorOhms } from "./resistor.js";

// DOM elements
const color0Select = document.getElementById('color0');
const color1Select = document.getElementById('color1');
const color2Select = document.getElementById('color2');
const color3Select = document.getElementById('color3');
const b0 = document.getElementById('b0');
const b1 = document.getElementById('b1');
const b2 = document.getElementById('b2');
const b3 = document.getElementById('b3');

const bands = {
    color1: "red",
    color2: "green",
    multiplier: "violet",
    tolerance: "gold",
} 
const answer = document.querySelector(".answer")

console.log(getResistorOhms(bands))

const multiplierSelect = document.getElementById('multiplier');
const toleranceSelect = document.getElementById('tolerance');
const calculateBtn = document.getElementById('calculate');
const resultContainer = document.getElementById('result');


color0Select.addEventListener('click', (e) => {
    console.log(e)
    const color = e.target.innerHTML
    console.log(color)
    b0.classList.remove(bands.color1)
    b0.classList.add(color)
    
    bands.color1 = color
    const value = getResistorOhms(bands)
    answer.innerHTML = value
})

color1Select.addEventListener('click', (e) => {
    console.log(e)
    const color = e.target.innerHTML
    console.log(color)
    b1.classList.remove(bands.color2)
    b1.classList.add(color)
    bands.color2 = color
    const value = getResistorOhms(bands)
    answer.innerHTML = value
})

color2Select.addEventListener('click', (e) => {
    console.log(e)
    const color = e.target.innerHTML
    console.log(color)
    b2.classList.remove(bands.multiplier)
    b2.classList.add(color)
    bands.multiplier = color
    const value = getResistorOhms(bands)
    answer.innerHTML = value
})

color3Select.addEventListener('click', (e) => {
    console.log(e)
    const color = e.target.innerHTML
    console.log(color)
    b3.classList.remove(bands.tolerance)
    b3.classList.add(color)
    bands.tolerance = color
    const value = getResistorOhms(bands)
    answer.innerHTML = value
})

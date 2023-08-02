import './styles/global.scss';
import './styles/hero.scss';
import './styles/calculator.scss';

const TRANSITION_DURATION = 160;

const RANGES = [
  {values: [16], text: "starvation", color: "#FC4848"},
  {values: [16.99, 17], text: "emaciation", color: "#FC9F48"},
  {values: [17, 18.49], text: "underweight", color: "#E4CA41"},
  {values: [18.5, 24.99], text: "correct value", color: "#33CA1B"},
  {values: [25, 29.99], text: "overweight", color: "#CA1BB8"},
  {values: [30, 34.99], text: "I degree of obesity", color: "#8B139E"},
  {values: [35, 39.99], text: "II degree of obesity", color: "#691461"},
  {values: [40], text: "extreme obesity", color: "#320A29"}
]

// Elements
const form = document.querySelector('form.calc-container');

const calcBox = document.querySelector('.calc-box');
const valuesBox = document.querySelector('.values-box');
const resultBox = document.querySelector('.result-box');

const btn = document.querySelector('form .btn');
const inputHeight = document.getElementById('height')
const inputWeight = document.getElementById('weight')
const inputGender = document.getElementsByName('gender');

const resultNumberEl = document.querySelector('.result-number');
const rangeEl = document.querySelector('.range-text');


const setResult = number => {

  let currentRange;
  resultNumberEl.textContent = number;

  if (number >= RANGES[RANGES.length - 1].values[0]) currentRange = RANGES[RANGES.length - 1];
  else if (number <= RANGES[0].values[0]) currentRange = RANGES[0];
  else currentRange = RANGES.find(range => (range.values.length === 2 && range.values[0] <= number && range.values[1] >= number));

  rangeEl.textContent = currentRange.text;
  rangeEl.style.setProperty('--range-circle-color', currentRange.color);

}

const toResultState = () => {

  calcBox.style.transform = 'scale(.8)';
  valuesBox.style.transform = 'scale(.8)';

  calcBox.style.opacity = '0';
  valuesBox.style.opacity = '0';

  setTimeout(() => {
    window.location.replace('#result');
    btn.textContent = "Go back";
    form.classList.add('calc-container-result')

    setTimeout(() => {
      resultBox.style.transform = 'scale(1)';
      resultBox.style.opacity = '1';
    },1);
  }, TRANSITION_DURATION)
}

const toDefaultState = () => {

  resultBox.style.transform = 'scale(.8)';
  resultBox.style.opacity = '0'

  setTimeout(() => {
    btn.textContent = "Calculate";
    form.classList.remove('calc-container-result')

    setTimeout(() => {
      calcBox.style.transform = 'scale(1)';
      valuesBox.style.transform = 'scale(1)';

      calcBox.style.opacity = '1';
      valuesBox.style.opacity = '1';
    },1);
  }, TRANSITION_DURATION)

}

const handleForm = () => {
  let fieldEmpty = [];
  let wrongValue = [];

  const heightVal = parseFloat(inputHeight.value);
  const weightVal = parseFloat(inputWeight.value);
  let genderVal;

  for (let i = 0; i < inputGender.length; i++) {
    if (inputGender[i].checked) genderVal = inputGender[i].value;
    console.log(genderVal);
  }

  if (inputHeight.value === '') fieldEmpty.push('HEIGHT');
  if (inputWeight.value === '') fieldEmpty.push('WEIGHT');

  if (isNaN(heightVal) && !(inputHeight.value === '')) wrongValue.push('HEIGHT');
  if (isNaN(weightVal) && !(inputWeight.value === '')) wrongValue.push('WEIGHT');

  if (wrongValue.length === 0 && fieldEmpty.length === 0) {
    const bmi = (weightVal / Math.pow(heightVal/100, 2)).toFixed(2);
    setResult(bmi);
    toResultState();
  }
}


form.addEventListener('submit', e => {
  e.preventDefault();

  if (window.location.hash !== '#result') handleForm();

  else {
    window.location.replace('#calculator');
    toDefaultState();
  }
  
})

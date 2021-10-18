import fetchCountries from './fetchCountries.js';
import countryList from '../templates/countryList.hbs';
import countryTemplateCard from '../templates/countryTemplateCard.hbs';
import { alert, error, notice, defaultModules } from '@pnotify/core';
import * as PNotifyDesktop from '@pnotify/desktop';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
const debounce = require('lodash.debounce');

const refs = {
  input: document.querySelector('input'),
  render: document.querySelector('.render'),
};

const { input, render } = refs;

input.addEventListener(
  'input',
  debounce(event => {
    if (event.target.value.length > 0) {
      fetchCountries(event.target.value).then(renderCountry).catch(fetchError);
    }
  }, 1000),
);

function renderCountry(country) {
  if (country.length >= 2 && country.length <= 10) {
    const markupList = countryList(country);
    render.innerHTML = markupList;
    const refsCountryList = document.querySelector('.country-list');
    refsCountryList.addEventListener('click', targetClick);
  } else if (country.length === 1) {
    const markupCard = countryTemplateCard(country);
    render.innerHTML = markupCard;
  } else if (country.length > 10) {
    const importantMessage = notice({
      title: 'Too many matches found.',
      text: 'Please enter a mare specific query!!!',
    });
  }
}

function targetClick(event) {
  if (event.target.nodeName !== 'LI') {
    return;
  }
  input.value = event.target.textContent;
  fetchCountries(input.value).then(renderCountry);
}

function fetchError(myError) {
  const errorMessage = error({
    title: 'Error',
    text: `${myError}`,
  });
}

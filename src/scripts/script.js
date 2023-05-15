import API from "./fetchCountries.js";
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';




const refs = {
    form: document.getElementById('search-box'),
    countryWrapper: document.querySelector(".country-info"),
    countryList: document.querySelector(".country-list")

};

refs.form.addEventListener('input', debounce(onInput, 500));

function onInput(event) {
    event.preventDefault();
    const form = event.target;
    const value = form.value.trim();

    if (value === "") {
        return upDateMarkupWrapper("")
    }

    API.fetchCountries(value)
        .then(result => {
            upDateMarkupWrapper('')
            upDateMarkupList('')
            return result
        })
        .then(result => {
            
            if (result.length > 10) {
                Notiflix.Notify.info(
                    'Too many matches found. Please enter a more specific name.')
                upDateMarkupWrapper("<h2>Too many matches found. Please enter a more specific name.</h2>")
                
            } else if (result.length > 1 && result.length < 10) {
                upDateMarkupList(result.reduce((markup, country) =>
                    markup + createMarkupList(country), ""))
            } else if (result.length === 1) {
                upDateMarkupWrapper(result.reduce((markup, country) =>
                    markup + createMarkupWrapper(country), ""))
            }
        })
        .catch(onError)
}

function upDateMarkupWrapper(markup) {
    refs.countryWrapper.innerHTML = markup;
}
function upDateMarkupList(markup) {
    refs.countryList.innerHTML = markup;
}

function createMarkupList({ name, flags }) {
    return `<li class=country-flags><img src=${flags.svg} width="50px">  ${name.official}</li>`
}

function createMarkupWrapper({name, flags, languages, population, capital}) {
     return `
    <img src=${flags.svg} width="50px">
    <h2>  ${name.official}</h2>
    <p class="data-title">Capital: <spanclass="data-country">${capital}</span></p> 
    <p class="data-title">Population: <span class="data-country">${population}</span></p>
    <p class="data-title">Languages: <span class="data-country">${Object.values(languages).join(', ')}</span></p>`

}

function onError(err) {
    Notiflix.Notify.failure('Oops, there is no country with that name');

}

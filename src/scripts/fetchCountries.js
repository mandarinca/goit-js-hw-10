import '../css/styles.css';

const DEBOUNCE_DELAY = 300;


// https://restcountries.com/v3.1/all?q=name{name}


let URL = "https://restcountries.com/v3.1/"

function fetchCountries(query) {
   return fetch(`${URL}name/${query}`).then((resp)=> resp.json());
}


export default { fetchCountries };
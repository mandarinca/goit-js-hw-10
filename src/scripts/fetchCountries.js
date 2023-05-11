import '../css/styles.css';

const DEBOUNCE_DELAY = 300;


// https://restcountries.com/v3.1/all?q=name{name}


let URL = "https://restcountries.com/v3.1/"
//let countryName = 'name';

function fetchCountries(query) {
   return fetch(`${URL}name/${query}`).then((resp)=> resp.json());
   //return fetch(`${URL}?name=${countryName}&q=${query}`).then((resp)=> resp.json());
}

// fetchCountries('Argentina').then(result=> console.log(result));
export { fetchCountries };
import Weather from './weather.js';
import info from '../data/data.js';

const container = document.getElementById('container')
const btnSearch = document.getElementById('btnSearch')
const searchValue = document.getElementById('search')
const containerWeather = document.createElement('div')
const titleState = document.createElement('h3')
const dataGeo = [];

btnSearch.addEventListener('click', e => {
  getCoordinate();
})

const getCoordinate = async () => {
  await getLatitudeLongitude();
}

const getLatitudeLongitude = () => {
  getDataWeather(searchValue.value, info.data.APIKey);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (dataGeo !== null) {
        resolve('Berhasil mendapatkan data geograpich');
        getWeather();
      } else {
        reject('Gagal mendapatkan data geograpich');
      }
    }, 500);
  });
}


const getDataWeather = (searchValue, key) => {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=1&appid=${key}`)
    .then(response => response.json())
    .then(res => {
      res.map(e => {
        dataGeo.push(e);
      });
    });
};

const getWeather = () => {
  const [result] = dataGeo;
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${result.lat}&lon=${result.lon}&appid=${info.data.APIKey}`)
    .then(response => response.json())
    .then(result => info.data.result.push(result));
  setContainerWeather();
};

const setContainerWeather = () => {
  // titleState.innerHTML = info.data.result.main;
  info.data.result.map(response => {
    console.log(response);
  });
};
import Weather from './weather.js';
import info from '../data/data.js';

const continer = document.getElementById('container')
const btnSearch = document.getElementById('btnSearch')
const searchValue = document.getElementById('search');
const dataGeo = [];

document.addEventListener('DOMContentLoaded', e => {

})


btnSearch.addEventListener('click', e => {
 getCoordinate();
})

const getCoordinate = async () => {
 const result = await getLatitudeLongitude();
 console.log(result);
}

const getLatitudeLongitude = () => {
 getDataWeather(searchValue.value, info.data.APIKey);
 return new Promise((resolve, reject) => {
  setTimeout(() => {
   if (dataGeo !== null) {
    resolve('Berhasil mendapatkan data geograpich');
   } else {
    reject('Gagal mendapatkan data geograpich');
   }
  }, 1500);
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
import info from '../data/data.js';

class Weather {
 constructor(data) {
  this.data = data;
 }

 getCoordinate = () => {
  // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.data.lat}&lon=${this.data.lon}&appid=${info.data.APIKey}`)
  //  .then(response => response.json())
  //  .then(result => console.log(result));
  
 }
}

export default Weather;
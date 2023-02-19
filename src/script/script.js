import Weather from './weather.js';
import info from '../data/data.js';

const container = document.getElementById('container')
const btnSearch = document.getElementById('btnSearch')
const containerWeather = document.getElementsByClassName('container-weather')[0]

const imageQualifier = './src/img/berawan.png';

const dataGeo = [];

btnSearch.addEventListener('click', () => {
  containerWeather.innerHTML = "";
  const searchValue = document.getElementById('search')
  getCoordinate(searchValue.value)
})

const getCoordinate = async (search) => {
  try {
    await getLatitudeLongitude(search)
  } catch (e) {
    console.log(e)
  }
}

const getLatitudeLongitude = () => {
  getDataWeather(search.value, info.data.APIKey)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (dataGeo !== null) {
        getWeather(dataGeo);
        resolve('Berhasil mendapatkan data geograpich');
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
    setContainerWeather();
};

const getWeather = (result) => {
  const [data] = result;
  console.log(data)
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${info.data.APIKey}`)
    .then(response => response.json())
    .then(result => info.data.result.push(result));
};

const setContainerWeather = () => {
  info.data.result.map(response => {
    createContainer(response)
  });
};

const createContainer = (response) => {
  // const cardBody = document.createElement('div')
  // cardBody.classList.add('card-body')
  // const titleState = document.createElement('h5')
  // titleState.innerText = `${response.name}`
  // titleState.classList.add('card-title')
  // const temperature = document.createElement('h6')
  // temperature.innerText = `${Math.ceil(response.main.temp - 273)}℃`
  // temperature.className = 'card-subtitle mb-2 text-muted'
  // const description = document.createElement('p')
  // response.weather.map(res => {
  //   description.innerText = `${res.description}`
  // })
  // description.classList.add('card-text')
  // const cardThumbnail = document.createElement('div')
  // cardThumbnail.classList.add('card-thumbnail')
  // const imageThumbnail = document.createElement('img')
  // imageThumbnail.setAttribute('src', `${imageQualifier}`)
  // const status = document.createElement('div')
  // status.classList.add('status')
  // const textStatus = document.createElement('h4')
  // textStatus.innerText = "Berawan"

  // cardBody.append(titleState, temperature, description)
  // status.appendChild(textStatus)
  // cardThumbnail.append(imageThumbnail, status)
  // containerWeather.append(cardBody, cardThumbnail)
  // container.append(containerWeather)

  containerWeather.innerHTML = `
    <div class ="card bg-dark">
      <div class = "card-body">
      <h5 class = "card-title"> ${response.name} </h5> 
      <h6 class = "card-subtitle mb-2 text-muted"> ${response.main.temp}℃ </h6> 
      <p class = "card-text"> Sepertinya Akah Hujan </p>  
        <div class = "card-thumbnail">
          <img src = "./src/img/berawan.png" alt = "" >
        <div class = "status">
      <h4> Berawan </h4> 
      </div> 
      </div>
  `

}
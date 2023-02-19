import data from '../data/data.js'
const container = document.getElementById('container')
const cardContainer = document.getElementsByClassName('card-container')[0]
const searchValue = document.getElementById('search')
const btn = document.getElementById('submit')

btn.addEventListener('click', () => {
  data.data.result.length = 0
  cardContainer.innerHTML = ""
  getWeather(searchValue.value)

  setTimeout(() => {
    const getDetail = document.getElementById('getDetail')
    getDetail.addEventListener('click', e => {
      cardContainer.style.display = 'initial'
    })
  }, 1000)

})

const getWeather = async (address) => {
  await fetchData(address)
}

const fetchData = (address) => {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${address}&limit=${data.data.limit}&appid=${data.data.APIKey}`)
    .then(response => response.json())
    .then(result => {
      const [res] = result
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${res.lat}&lon=${res.lon}&appid=${data.data.APIKey}`)
        .then(response => response.json())
        .then(result => {
          data.data.result.push(result)
          printOutContainer(result)
        })
    });
}

const printOutContainer = (result) => {
  cardContainer.innerHTML = `
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${result.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${Math.ceil(result.main.temp - 273)}℃</h6>
            <p class="card-text">${result.weather.map(e => e.description)}</p>
            <button class="btn btn-info" id="getDetail">Lihat Detail</button>
          </div>
        </div>
      `
}
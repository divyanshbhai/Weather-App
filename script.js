let lat;
let long;

let data;
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

getLocation()

function showPosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  console.log(lat, long);
  getWeather()
}

async function getWeather() {
  const url = `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=${lat}&lon=${long}&units=metric&lang=en`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'd0b253ad4fmsh4ec813780e5570ap1f4b93jsn97c27b486b55',
      'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    data = result;

    fetchData()
  } catch (error) {
    console.error(error);
  }
}


function fetchData() {
  console.log(data)

  let city = document.querySelector('#city');
  city.innerText = data.city_name;

  let mainWindSpeed = document.querySelector('#main-wind-spd');
  mainWindSpeed.innerText = data.data[0].wind_spd;

  let mainDate = document.querySelector('#main-date');
  mainDate.innerText = new Date(data.data[0].timestamp_local).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(',', '');

  let mainIcon = document.querySelector('#main-icon');
  mainIcon.src = `https://cdn.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png`;

  let mainTemp = document.querySelector('#main-temp');
  mainTemp.innerText = data.data[0].temp;

  let dicription = document.querySelector('.discription');
  dicription.innerText = data.data[0].weather.description;

}



function fetchForcast() {
  let forcast = document.querySelector('.forcast');
  forcast.innerHTML = '';

  for (let i = 1; i < data.data.length; i++) {
    let card = document.createElement('div');
    card.classList.add('card');

    let time = document.createElement('div');
    time.innerHTML = new Date(data.data[i].timestamp_local).toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true })
    card.appendChild(time);

    let date = document.createElement('div');
    date.classList.add('forcast-date');
    date.innerText = new Date(data.data[i].timestamp_local).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(',', '');
    card.appendChild(date);

    let icon = document.createElement('div');
    icon.classList.add('forcast-icon');

    let img = document.createElement('img');
    img.src = `https://cdn.weatherbit.io/static/img/icons/${data.data[i].weather.icon}.png`;

    icon.appendChild(img);
    card.appendChild(icon);

    let temp = document.createElement('div');
    temp.classList.add('forcast-temp');
    temp.innerText = `${data.data[i].temp}°C`;
    card.appendChild(temp);

    let windSPD = document.createElement('div');
    windSPD.classList.add('forcast-wind-spd');
    windSPD.innerHTML = `<i class="fa-solid fa-wind"></i>${data.data[i].wind_spd} m/s`;
    card.appendChild(windSPD);


    forcast.appendChild(card);
  }
}
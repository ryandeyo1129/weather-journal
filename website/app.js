/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=f12c63dc510035ad2cbf1b8c2da4a9e2&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// GET request
const getWeather = async (url, zip, key) => {
  const response = await fetch(`${url}${zip}${key}`)
  try {
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('error', err);
  }
}

// POST request
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (err) {
    console.log('error', err);
  }
}

// update UI
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.feelings;
  } catch (err) {
    console.log('error', err);
  }
}

// Add event listener and chain promises
document.getElementById('generate').addEventListener('click', (e) => {
  const newZip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  
  getWeather(baseUrl, newZip, apiKey)
    .then((data) => {
      data.date = newDate;
      data.feelings = feelings;
      postData('/add', data);
    })
    .then(() => {
      updateUI();
    });
})
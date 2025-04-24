let searchInput = document.getElementById("searchInput");
let showData = document.getElementById("showData");

//  to get location
window.addEventListener("load", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        getWeatherData(`${lat},${lon}`);
      },
      function (error) {
        console.log("falied to find location", error.message);

        getWeatherData("Cairo");
      }
    );
  } else {
    console.log("browser dont't support find location");
    getWeatherData("Cairo");
  }
});

// to get city from search input
searchInput.addEventListener("input", function () {
  getWeatherData(searchInput.value);
});

async function getWeatherData(city) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=70f0806ea4f24db4a10184647252404&q=${city}&days=3`
  );

  if (response.ok) {
    let result = await response.json();
    console.log(result);
    console.log(result);

    display(result);
  }
}

// display function to show data
function display(data) {
  let cartona = "";
  let forecastDays = data.forecast.forecastday;
  let cityName = data.location.name;

  for (let i = 0; i < forecastDays.length; i++) {
    let dayData = forecastDays[i];
    let date = dayData.date;
    // to change date of day to name
    let day = new Date(date).toLocaleDateString("en-US", { weekday: "long" });

    cartona += `
        <div class="col">
          <div class="card">
            <div class="card-head d-flex justify-content-between p-2">
              <div class="day">${day}</div>
              <div class="date">${date}</div>
            </div>
            <div class="card-body p-3">
              <div class="location fs-5">${cityName}</div>
              <div class="degree text-white fw-bolder">
                ${dayData.day.avgtemp_c}
                <sup>o</sup>
                C
              </div>
              <div class="card-icon">
                <img src="https:${dayData.day.condition.icon}" width="90" alt="" />
              </div>
              <div class="custom">${dayData.day.condition.text}</div>
            </div>
          </div>
        </div>
      `;
  }

  showData.innerHTML = cartona;
}

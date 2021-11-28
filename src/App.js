import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Converter from './pages/currency/Converter';

const OPEN_WEATHER_KEY = '26154898296b951e04fac8b07c6f2387';

function App() {

  const [center, setCenter] = useState({
    lat: '',
    lng: '',
  });

  const [response, setResponse] = useState({});
  const [forecastResponse, setForecastResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        axios(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${OPEN_WEATHER_KEY}&units=metric&cnt=3`)
        .then(response => {
          console.log(response);
          setResponse(response.data);
          })
      },
      error => {
        console.log(error)
      }
    )
  }, [])

  const handleClick = () => {
    setForecastResponse(null)
    setIsLoading(true)
    axios(`https://api.openweathermap.org/data/2.5/forecast?lat=${center.lat}&lon=${center.lng}&appid=${OPEN_WEATHER_KEY}&units=metric&cnt=3`)
        .then(response => {
          console.log(response.data);
          setForecastResponse(response.data);
          setIsLoading(false);
      })
  }


  return (
    <>
    <div className="App">
      {
        center?.lat && response?.weather && (
          <>
          {
            <div className="Weathercontent">
              <div className="first-div">
                  <span style={{color:'orange', fontSize:'22px'}}>
                    {`${new Date().getHours()} : ${new Date().getMinutes()} ${new Date().getHours() >= 12 ? 'pm' : 'am'}, ${months[new Date().getMonth()]} ${new Date().getDate()}`}
                  </span>
                  <h1>{response.name} ,{response.sys.country}</h1>
              </div>
              <div className="Imgcontent">
                <img alt='openweathermap' src={`http://openweathermap.org/img/w/${response?.weather[0]?.icon}.png`} width="100px" height="100px" />
                <h1>{response.main.temp}°C</h1>
              </div>
              <button className="btnn" onClick={handleClick}>Next 3 days Forecast</button>
              <div className="bottom-div">
                {
                  isLoading && <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
                }
                {
                  !isLoading && forecastResponse?.list && forecastResponse.list.length > 0 &&
                  forecastResponse.list.map((forecast, index) => {
                    const d = new Date();
                    return (
                    <div className="bottom-div-one">
                      <span style={{ width: '100px'}}>{`${daysInWeek[d.getDay()+index+1]}, ${months[d.getMonth()]} ${d.getDate()+index+1}`}</span>
                      <div className="bottom-div-two">
                        <img alt='openweathermap' src={`http://openweathermap.org/img/w/${forecast?.weather[0]?.icon}.png`} width="60px" height="50px" />
                        <h5>{forecast.main.temp_min}/{forecast.main.temp_max}°C</h5>
                      </div>
                      <h5 style={{ width: '200px'}}>{forecast.weather[0].description}</h5>
                    </div>
                  )
                })
                }
              </div>
            </div>
          }

          <div className="Mapcontent">
            <h3>Google Map</h3>
            <iframe 
            width="600" height="450" loading="lazy" allowFullScreen 
            src={`https://www.google.com/maps/embed/v1/place?q=${center.lat}%2C${center.lng}&key=AIzaSyAvS4HGfZkRlQ_iLb9fYt1y3DCnZNJq_cw`}>
            </iframe>
          </div>
        </>
        )
      }
    </div>
    <div className="exchange-content">
    <Converter />
    </div>
  </>
  );
}

export default App;


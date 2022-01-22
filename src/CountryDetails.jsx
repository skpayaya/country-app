import { useEffect, useState } from "react";
import axios from "axios";

const flagStyle = {
    width: "180px",
};
function CountryDetails({ country }) {
    const [weather, setWeather] = useState({
        temperature: "",
        weather_icon: "",
        wind_speed: "",
    });
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${process.env.REACT_APP_API_KEY}`;
    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                console.log(response.data);
                setWeather({
                    temperature: response.data.main.temp - 273.15,
                    weather_icon: response.data.weather[0].icon,
                    wind_speed: response.data.wind.speed,
                });
            })
            .catch((error) => {
                console.log("fail");
            });
    }, [url]);
    return (
        <>
            <h1>{country.name.commmon}</h1>
            <p>capital {country.capital[0]}</p>
            <p>population {country.population}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map((lang) => (
                    <li key={lang}>{lang}</li>
                ))}
            </ul>
            <img src={country.flags.svg} alt="flag" style={flagStyle}></img>
            <h2>Weather in {country.capital[0]}</h2>
            <p>
                <b>temperature:</b> {weather.temperature} Celcius
            </p>
            <h2>Weather in {country.capital[0]}</h2>
            <img
                src={`http://openweathermap.org/img/wn/${weather.weather_icon}@2x.png`}
            ></img>
            <p>
                <b>Wind:</b> {weather.wind_speed} mph
            </p>
        </>
    );
}

export default CountryDetails;

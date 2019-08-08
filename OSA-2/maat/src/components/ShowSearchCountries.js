import React from "react";
import Country from "./Country";
import { Link, Route } from "react-router-dom";

const ShowSearchCountries = ({ countries, search, showWeather }) => {
  let searchWord = search.toLowerCase();
  let filteredCountryArr = countries.filter(country =>
    country.name.toLowerCase().includes(searchWord)
  );

  if (search) {
    if (filteredCountryArr.length > 10) {
      return <p>"Too many matches, specify another filter"</p>;
    } else if (filteredCountryArr.length > 1) {
      return filteredCountryArr.map(country => (
        <div key={country.name}>
          {country.name}
          <Link
            to={{
              pathname: `/${country.name}`,
              state: country,
              stateTwo: showWeather(country.name)
            }}
          >
            <button>show</button>
          </Link>
          <Route path={`/:countryname`} render={Country} />
        </div>
      ));
    } else if ((filteredCountryArr.length = 1)) {
      let country = filteredCountryArr[0];
      let weather = showWeather(country.name);
      return (
        <div>
          <h2>{country.name}</h2>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <h3>languages</h3>
          <ul>
            {country.languages.map(language => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
          <div style={{ width: "100px" }}>
            <img src={country.flag} alt="flag" style={{ width: "100%" }} />
          </div>
          <div>
            <h3>Weather in {weather.city}</h3>
            <p>
              <strong>temperature:</strong> {weather.temp} Celsius
            </p>
            <img src={weather.icon} alt="weather-icon" />
            <p>
              <strong>wind:</strong> {weather.wind}kph direction{" "}
              {weather.direction}
            </p>
          </div>
        </div>
      );
    }
  } else return null;
};

export default ShowSearchCountries;

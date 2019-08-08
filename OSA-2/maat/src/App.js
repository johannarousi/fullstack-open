import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Country from "./components/Country";
import Home from "./components/Home";
import Error from "./components/Error";
import "./App.css";

import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("Helsinki");
  const [url, setUrl] = useState(
    `http://api.apixu.com/v1/current.json?key=90c12c8a68534b13a23101720190807&q=Helsinki`
  );
  const [weather, setWeather] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      // console.log(response.data);
      let countriesFromApi = response.data.map(country => country);
      setCountries(countriesFromApi);
    });
  }, []);

  useEffect(() => {
    axios.get(url).then(response => {
      console.log("response", response);
      console.log("data", response.data);
      let weatherData = {
        city: response.data.location.name,
        temp: response.data.current.temp_c,
        wind: response.data.current.wind_kph,
        direction: response.data.current.wind_dir,
        icon: response.data.current.condition.icon
      };
      // console.log(weatherData);
      setWeather(weatherData);
    });
  }, [url]);

  console.log(weather);
  const showWeather = city => {
    setCity(city);
    setUrl(
      `http://api.apixu.com/v1/current.json?key=90c12c8a68534b13a23101720190807&q=${city}`
    );
    return weather;
  };
  const onChange = e => {
    let value = e.target.value;
    setSearch(value);
  };

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <Home
                {...props}
                onChange={onChange}
                search={search}
                countries={countries}
                showWeather={showWeather}
              />
            )}
          />
          <Route path="/:countryname" render={Country} exact />
          <Route component={Error} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import ShowSearchCountries from "./ShowSearchCountries";

export default function Home({ onChange, search, countries, showWeather }) {
  return (
    <div>
      find countries
      <input onChange={onChange} value={search} />
      <ShowSearchCountries
        search={search}
        countries={countries}
        showWeather={showWeather}
      />
    </div>
  );
}

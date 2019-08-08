import React from "react";

function Country({ location, match }) {
  console.log(location);
  return (
    <div>
      {/* <p>Country is {match.params.countryname}</p> */}
      <h2>{location.state.name}</h2>
      <p>capital {location.state.capital}</p>
      <p>population {location.state.population}</p>
      <h3>languages</h3>
      <ul>
        {location.state.languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <div style={{ width: "100px" }}>
        <img src={location.state.flag} alt="flag" style={{ width: "100%" }} />
      </div>
    </div>
  );
}
export default Country;

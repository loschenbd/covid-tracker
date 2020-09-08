import React, {useState, useEffect} from 'react';
import {
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core";

import './App.css';


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('global')

  useEffect(() => {
  //  async -> send a request to a server, wait for it, do something with data

    const getCountriesData = async () => {
      await fetch ("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country, // Unites States
              value: country.countryInfo.iso2 // USA
            }));

            setCountries(countries)
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="App">

      {/* Header & Selector */}

      <div className="app_header">
        <h1>COVID-19 Tracker</h1>
        <FormControl className={"app_dropdown"}>
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            {/* Loop through countries and show a dropdown of options*/}
            <MenuItem value="global">Global</MenuItem>
            {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))};
          </Select>
         </FormControl>
        </div>

      <div className="app_stats">
        {/* InfoBox Cases*/}
        {/* InfoBox Recoveries*/}
        {/* InfoBox */}

      </div>



      {/* Table */}
      {/* Graph */}

      {/* Map  */}
    </div>
  );
}

export default App;

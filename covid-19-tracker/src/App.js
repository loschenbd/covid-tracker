import React, {useState, useEffect} from 'react';
import {
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core";

import './App.css';


function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
  //  async -> send a request to a server, wait for it, do something with data

    const getCountryData = async () => {
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
    getCountryData();
  }, []);
  return (
    <div className="App">

      {/* Header */}

      <div className="app_header">
        <h1>COVID-19 Tracker</h1>
        <FormControl className={"app_dropdown"}>
          <Select variant="outlined"
                value=""
                >
            {/* Loop through countries and show a dropdown of options*/}
            {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))};
          </Select>
         </FormControl>
        </div>

      {/* Title + Selector */}

      {/* InfoBox */}
      {/* InfoBox */}
      {/* InfoBox */}

      {/* Table */}
      {/* Graph */}

      {/* Map  */}
    </div>
  );
}

export default App;

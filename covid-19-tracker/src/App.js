import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";

import {sortData} from "./components/util"
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table"
import LineGraph from "./components/LineGraph"
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("global");
  const [countryInfo, setCountryInfo] = useState({});
  const[tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.90746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
          setCountryInfo(data);
        })
  }, []);

  useEffect(() => {
    //  async -> send a request to a server, wait for it, do something with data

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // United States
            value: country.countryInfo.iso2, // USA
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "global"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
      })
  };

  return (
    <div className="app">
      {/* Header & Selector */}
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              {/* Loop through countries and show a dropdown of options*/}
              <MenuItem value="global">Global</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
              ;
            </Select>
          </FormControl>
        </div>
        <div className="app_stats">
          <InfoBox title={"Coronavirus Cases"} cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title={"Recovered"} cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title={"Deaths"} cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
        <Map
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <Card className="app_right">
        <CardContent>
          {/* Table */}

          <h3>Live Cases By Country</h3>
          <Table countries={tableData}/>
          <h3>Global New Cases</h3>
        </CardContent>
        <LineGraph/>
      </Card>
    </div>
  );
}

export default App;

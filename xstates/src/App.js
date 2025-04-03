import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get("https://crio-location-selector.onrender.com/countries");
        //console.log(res);
        setCountries(res.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;

    const fetchStates = async () => {
      try {
        const res = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);

        setStates(res.data);
        setCities([]);
        setSelectedState("");
        setSelectedCity("");
      } catch (err) {
        console.error("Error fetching states:", err);
      }
    };

    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedCountry || !selectedState) return;

    const fetchCities = async () => {
      try {
        const res = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);

        setCities(res.data);
        setSelectedCity("");
      } catch (err) {
        console.error("Error fetching states:", err);
      }
    };

    fetchCities();
  }, [selectedCountry, selectedState]);

  const renderedCountries = countries.map((country) => {
    return <option key={country} value={country}>{country}</option>;
  });

  const renderedStates = states.map((state) => {
    return <option key={state} value={state}>{state}</option>;
  });

  const renderedCities = cities.map((city) => {
    return <option key={city} value={city}>{city}</option>;
  });

  const statement = selectedCity ? (<h2>You selected <span style={{ fontWeight: "bold" }}>{selectedCity}, </span> <span style={{ fontWeight: 200 }}>{selectedState}, {selectedCountry}</span></h2>) : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h1>Select Location</h1>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
          <option value="" disabled>
            Select a Country
          </option>
          {renderedCountries}
        </select>

        <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} disabled={!selectedCountry}>
          <option value="" disabled>
            Select a State
          </option>
          {renderedStates}
        </select>

        <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState}>
          <option value="" disabled>
            Select a city
          </option>
          {renderedCities}
        </select>
      </div>
      {statement}
    </div>
  );


}

export default App;

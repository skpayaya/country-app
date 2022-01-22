import { useEffect, useState } from "react";
import axios from "axios";
import CountryDetails from "./CountryDetails";

function App() {
    const [countries, setCountries] = useState([]);
    const [query, setQuery] = useState("");
    let url;
    const [fullText, setFullText] = useState(false);
    useEffect(() => {
        if (query !== "") {
            url = fullText
                ? `https://restcountries.com/v3.1/name/${query}?fullText=true`
                : `https://restcountries.com/v3.1/name/${query}`;
            axios
                .get(url)
                .then((response) => {
                    setCountries(response.data);
                    setFullText(false);
                })
                .catch((error) => {
                    console.log("fail");
                });
        }
    }, [query]);

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };
    const handleShow = (country) => {
        setFullText(true);
        setQuery(country.name.official);
    };

    return (
        <div>
            find countries <input value={query} onChange={handleQueryChange} />
            {countries.length > 10 && (
                <p>Too many matches, specify another filter</p>
            )}
            {countries.length <= 10 &&
                countries.length > 1 &&
                countries.map((country) => {
                    return (
                        <>
                            <p key={country.name}>{country.name.official}</p>
                            <button onClick={() => handleShow(country)}>
                                show
                            </button>
                        </>
                    );
                })}
            {countries.length === 1 &&
                countries.map((country) => {
                    return (
                        <CountryDetails
                            key={country.name.official}
                            country={country}
                        ></CountryDetails>
                    );
                })}
        </div>
    );
}

export default App;

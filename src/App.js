import React, { useEffect, useState } from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

//Component
import Chart from "./components/Chart";
import Form from "./components/Form";

function App() {
  const [options, setOptions] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://api.nbp.pl/api/exchangerates/tables/A/?format=json")
      .then((res) => res.json())
      .then((data) => {
        let arr = [];
        data[0].rates.forEach((e) => {
          let currency =
            e.currency.charAt(0).toUpperCase() + e.currency.slice(1);
          arr.push({
            key: e.code,
            value: e.code,
            text: `${e.code} - ${currency}`,
            exchange: e.mid,
          });
          setOptions(arr);
          setLoaded(true);
        });
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <Container text textAlign="center" style={{ margin: 0 }}>
        <div className="header">
          <h1>Kalkulator Walutowy</h1>
          {error ? (
            <h3 style={{ color: "red" }}>
              Wystąpił problem, spróbuj ponownie później.
            </h3>
          ) : (
            ""
          )}
        </div>
        <Form
          error={error}
          options={options}
          isLoaded={isLoaded}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
        />
        <Chart selectedCurrency={selectedCurrency} />
      </Container>
    </div>
  );
}

export default App;

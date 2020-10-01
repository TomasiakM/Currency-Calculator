import React, { useState } from "react";
import { Button, Select, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

//Component
import Inputs from "./Inputs";

function Form({ options, isLoaded, selectedCurrency, setSelectedCurrency }) {
  const [inputValue, setInputValue] = useState(false);
  const [inputExchange, setInputExchange] = useState("");
  const [selectedExchange, setSelectedExchange] = useState(false);
  const [calculatingPLN, setCalculatingPLN] = useState(true);

  function btnClick(e) {
    e.preventDefault();
    if (selectedExchange) {
      if (calculatingPLN) {
        let exchange = inputValue / selectedExchange;
        if (!isNaN(exchange) && exchange !== 0) {
          setInputExchange(Math.round(exchange * 100) / 100);
        }
      } else {
        let exchange = inputValue * selectedExchange;
        if (!isNaN(exchange) && exchange !== 0) {
          setInputExchange(Math.round(exchange * 100) / 100);
        }
      }
    }
  }

  function changeValueToCalc() {
    setInputValue("");
    setInputExchange("");
    setCalculatingPLN(!calculatingPLN);
  }

  return (
    <div className="calc-section">
      <form onSubmit={btnClick}>
        <div className="section">
          <Select
            onChange={(e, data) => {
              setSelectedCurrency(data.value);
              for (let i = 0; i < options.length; i++) {
                if (data.value === options[i].value) {
                  setSelectedExchange(
                    Math.round(options[i].exchange * 10000) / 10000
                  );
                }
              }
            }}
            placeholder="Wybierz walutę"
            selection
            options={options}
            loading={isLoaded ? false : true}
            disabled={isLoaded ? false : true}
          />
        </div>
        <Inputs
          inputValue={inputValue}
          setInputValue={setInputValue}
          inputExchange={inputExchange}
          selectedCurrency={selectedCurrency}
          calculatingPLN={calculatingPLN}
        />

        <div className="section">
          <Button
            content="Przelicz"
            primary
            icon="exchange"
            onClick={btnClick}
          />
          <Button icon secondary onClick={changeValueToCalc}>
            <Icon name="arrows alternate vertical" />
          </Button>
          {selectedCurrency ? (
            calculatingPLN ? (
              <p className="rate">
                Aktualny kurs:{" "}
                {Math.round((1 / selectedExchange) * 1000) / 1000}
              </p>
            ) : (
              <p className="rate">Aktualny kurs: {selectedExchange}</p>
            )
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
}

export default Form;

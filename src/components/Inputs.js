import React from "react";
import { Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function Inputs({
  inputValue,
  setInputValue,
  inputExchange,
  selectedCurrency,
  calculatingPLN,
}) {
  return calculatingPLN ? (
    <>
      <div className="section">
        <Input
          type="number"
          label="PLN"
          labelPosition="right"
          placeholder="Wpisz wartość"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </div>
      <div className="section">
        <Input
          label={selectedCurrency ? { content: selectedCurrency } : false}
          labelPosition="right"
          value={inputExchange}
          disabled
        />
      </div>
    </>
  ) : (
    <>
      <div className="section">
        <Input
          type="number"
          value={inputValue}
          placeholder="Wpisz wartość"
          labelPosition="right"
          label={selectedCurrency ? { content: selectedCurrency } : false}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </div>
      <div className="section">
        <Input
          disabled
          value={inputExchange}
          label="PLN"
          labelPosition="right"
        />
      </div>
    </>
  );
}

export default Inputs;

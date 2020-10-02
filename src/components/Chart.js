import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Loader } from "semantic-ui-react";

function Chart({ selectedCurrency }) {
  const [chartDate, setChartDate] = useState([]);
  const [chartExchange, setChartExchange] = useState([]);
  const [isLoadedChars, setLoadedChars] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (selectedCurrency) {
      setLoadedChars(false);
      setError(false);
      fetch(
        `https://api.nbp.pl/api/exchangerates/rates/A/${selectedCurrency}/last/30/?format=json`
      )
        .then((res) => res.json())
        .then((data) => {
          let arrDate = [];
          let arrExchange = [];

          data.rates.forEach((e) => {
            let date = e.effectiveDate;
            date = date.slice(5, 10);
            arrDate.push(date);
            arrExchange.push(Math.round(e.mid * 10000) / 10000);
          });
          setChartDate(arrDate);
          setChartExchange(arrExchange);
          setLoadedChars(true);
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        });
    }
  }, [selectedCurrency]);

  const lineState = {
    labels: chartDate,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: "#2185d0",
        borderColor: "#2185d0",
        borderWidth: 2,
        data: chartExchange,
        pointBorderWidth: 2,
      },
    ],
  };

  return (
    <>
      {selectedCurrency ? (
        isLoadedChars ? (
          error ? (
            <p style={{ color: "red" }}>
              Wystąpił problem z pobraniem historii waluty, spróbuj ponownie
              później.
            </p>
          ) : (
            <Line
              data={lineState}
              options={{
                title: {
                  responsive: true,
                  display: true,
                  text: `Historia kursu waluty ${selectedCurrency}`,
                  fontSize: 18,
                  fontColor: "black",
                },
                legend: {
                  display: false,
                },
              }}
            />
          )
        ) : (
          <Loader active inline="centered" style={{ marginTop: "20%" }} />
        )
      ) : (
        ""
      )}
    </>
  );
}

export default Chart;

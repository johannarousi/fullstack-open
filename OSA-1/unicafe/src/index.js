import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Button = props => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = props => {
  return (
    <tr>
      <td>{props.text}</td>

      <td>{props.value}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleGood} />
      <Button text="neutral" handleClick={handleNeutral} />
      <Button text="bad" handleClick={handleBad} />
      <h1>statistics</h1>
      {good + neutral + bad === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <Statistics text="good" value={good} />
            <Statistics text="neutral" value={neutral} />
            <Statistics text="bad" value={bad} />
            <Statistics text="all" value={good + neutral + bad} />
            <Statistics
              text="average"
              value={(good * 1 + bad * -1) / (good + bad + neutral)}
            />
            <Statistics
              text="positive"
              value={(good / (good + bad + neutral)) * 100}
            />
          </tbody>
        </table>
      )}
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));

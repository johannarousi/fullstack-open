import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { jsxClosingElement } from "@babel/types";

const App = props => {
  // let randomIndex = Math.floor(Math.random() * (props.anecdotes.length - 1));
  const [selected, setSelected] = useState(0);
  const [index, setIndex] = useState(0);
  const [votes, setVotes] = useState([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ]);

  const handleClick = () => {
    let randomIndex = Math.floor(Math.random() * props.anecdotes.length);
    let newIndex = randomIndex;
    setIndex(newIndex);
    setSelected(newIndex);
    console.log("index", index);
    console.log("newindex", newIndex);
  };

  const handleVote = () => {
    let copyVotes = [...votes];
    copyVotes[index] += 1;
    setVotes(copyVotes);
    console.log(index);
    console.log(votes);
  };

  const anecdoteWithMostVote = () => {
    let howManyIsMostVotes = Math.max(...[...votes]);
    let indexOfAnecdote = votes.indexOf(howManyIsMostVotes);

    return anecdotes[indexOfAnecdote];
  };
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[index]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <br />
      <h1>Anecdote with most votes</h1>
      <p> {anecdoteWithMostVote()}</p>
      <p>has {Math.max(...[...votes])} votes</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Before software can be reusable it first has to be usable.",
  "Real programmers can write assembly code in any language.",
  "Documentation is the castor oil of programming. Managers think it is good for programmers and programmers hate it!.",
  "Programming can be fun, so can cryptography; however they should not be combined.",
  "Design and programming are human activities; forget that and all is lost.",
  "Before software can be reusable it first has to be usable.",
  "Premature optimization is the root of all evil in programming.",
  "Inside every large program, there is a small program trying to get out.",
  "Why do we never have time to do it right, but always have time to do it over?."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));

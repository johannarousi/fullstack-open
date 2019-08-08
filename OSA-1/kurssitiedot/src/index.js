import React from "react";
import ReactDOM from "react-dom";

const Header = props => <h1>{props.course}</h1>;

const Part = props => (
  <p>
    {props.name} {props.exercises}
  </p>
);

const Content = props => {
  const parts = props.parts.map(part => (
    <Part key={part.name} name={part.name} exercises={part.exercises} />
  ));
  return <div>{parts}</div>;
};

const Total = props => {
  let numberOfExercises = props.parts
    .map(part => part.exercises)
    .reduce((total, curr) => total + curr);
  return <p>Number of exercises {numberOfExercises}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

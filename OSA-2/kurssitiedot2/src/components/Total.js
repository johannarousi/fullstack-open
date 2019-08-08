import React from "react";

const Total = ({ parts }) => {
  const exercisesTotal = parts
    .map(part => part.exercises)
    .reduce((total, num) => total + num);
  return (
    <>
      <p>
        <strong>Number of exercises {exercisesTotal}</strong>
      </p>
    </>
  );
};
export default Total;

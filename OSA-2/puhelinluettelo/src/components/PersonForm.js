import React from "react";

const PersonForm = ({
  onSubmit,
  onChange,
  value,
  onNumberChange,
  numberValue
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <div>
          name: <input onChange={onChange} value={value} />
        </div>
        <div>
          number: <input onChange={onNumberChange} value={numberValue} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default PersonForm;

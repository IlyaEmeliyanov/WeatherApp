import React from "react";

const MainForm = ({onChange, onSubmit}) => {
  return (
    <form action="/" onSubmit={onSubmit}>
      <input
        placeholder="Enter your city..."
        className="form__input"
        type="text"
        id="location"
        onChange={onChange}
      />
    </form>
  );
};

export default MainForm;

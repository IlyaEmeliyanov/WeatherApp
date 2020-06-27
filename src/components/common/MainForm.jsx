import React, { useState } from "react";
import Dropdown from '../Dropdown'

const MainForm = ({onChange, onSubmit, location, addToFavorites, favorites, onClick}) => {

  return (
    <form action="/" onSubmit={onSubmit}>
      <input
        placeholder="Enter your city..."
        className="form__input"
        type="text"
        id="location"
        value={location}
        onChange={onChange}
      />
      <Dropdown
            location={location}
            addToFavorites={addToFavorites}
            favorites={favorites}
            onClick={onClick}
          />
    </form>
  );
};

export default MainForm;

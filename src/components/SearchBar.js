import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="form-control mb-4"
      placeholder="Поиск по имени..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
